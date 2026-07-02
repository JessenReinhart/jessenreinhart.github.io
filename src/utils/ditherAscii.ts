/**
 * Mouse-reactive ASCII texture canvas — Bayer dithered.
 *
 * Patterns from Codeptor/dithered:
 * - Bayer 4×4 ordered dither for character selection
 * - Sinusoidal wave displacement near cursor
 * - Vignette darkening at edges
 * - Continuous time-based idle animation
 *
 * Characters ordered dark→bright: @ # 8 % & * + = ~ : , .
 */

const CHARS = "@#8%&*+=~:,. ";
const CELL_W = 16;
const CELL_H = 28;
const FONT_SIZE = 24;
const MAX_FPS = 30;

// Bayer 4×4 matrix, normalized to [0, 1]
const BAYER_4X4 = (() => {
  const raw = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  const scale = 1 / 16;
  return raw.map((v) => v * scale);
})();

const VIGNETTE_STRENGTH = 0.6;
const INFLUENCE_RADIUS_FACTOR = 0.25;

function getCharForBrightness(b: number): string {
  if (CHARS.length === 0) return " ";
  const clamped = Math.max(0, Math.min(1, b));
  const index = Math.floor(clamped * (CHARS.length - 1));
  return CHARS[index];
}

function getVignetteFactor(
  x: number,
  y: number,
  cols: number,
  rows: number,
  strength: number
): number {
  const nx = (x / (cols - 1)) * 2 - 1;
  const ny = (y / (rows - 1)) * 2 - 1;
  const dist = Math.sqrt(nx * nx + ny * ny) / Math.SQRT2;
  return 1 - dist * strength;
}

function mulberry32(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface AsciiGrid {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  cols: number;
  rows: number;
  brightnessGrid: Float32Array;
  charGrid: string[];
  rafId: number;
  mouseX: number;
  mouseY: number;
  lastFrameTime: number;
  frameCount: number;
}

/** Initialize canvas with Bayer-dithered brightness grid. Starts animation loop. */
export function initAsciiCanvas(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  seed: number = 42
): AsciiGrid {
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const cols = Math.ceil(width / CELL_W);
  const rows = Math.ceil(height / CELL_H);
  const rand = mulberry32(seed);

  // Generate procedural brightness grid with Bayer dithering
  const brightnessGrid = new Float32Array(rows * cols);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const idx = y * cols + x;
      const base = rand();
      const threshold =
        (BAYER_4X4[(y % 4) * 4 + (x % 4)] - 0.5) * 0.8;
      brightnessGrid[idx] = Math.max(0, Math.min(1, base + threshold));
    }
  }
  // Initialize character grid from brightness
  const charGrid: string[] = new Array(rows * cols);
  for (let i = 0; i < charGrid.length; i++) {
    charGrid[i] = getCharForBrightness(brightnessGrid[i]!);
  }

  const now = performance.now();
  const state: AsciiGrid = {
    canvas,
    ctx,
    cols,
    rows,
    brightnessGrid,
    charGrid,
    rafId: 0,
    mouseX: -9999,
    mouseY: -9999,
    lastFrameTime: now,
    frameCount: 0,
  };

  // Start continuous animation loop with FPS cap
  const frameInterval = 1000 / MAX_FPS;
  const loop = (now: number) => {
    state.rafId = requestAnimationFrame(loop);
    if (now - state.lastFrameTime < frameInterval) return;
    state.lastFrameTime = now;
    drawFrame(state);
  };
  state.rafId = requestAnimationFrame(loop);

  return state;
}

/** Render one frame — hover lightens, away darkens, characters switch periodically. */
function drawFrame(state: AsciiGrid): void {
  const { ctx, cols, rows, mouseX, mouseY, canvas, charGrid } = state;

  state.frameCount++;

  // Every 3 frames, randomly swap ~15% of characters
  if (state.frameCount % 3 === 0) {
    const swapCount = Math.floor(charGrid.length * 0.15);
    for (let i = 0; i < swapCount; i++) {
      const idx = Math.floor(Math.random() * charGrid.length);
      const rand = Math.random();
      const charIdx = Math.floor(rand * (CHARS.length - 1));
      charGrid[idx] = CHARS[CHARS.length - 1 - charIdx];
    }
  }

  ctx.fillStyle = "#050505";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${FONT_SIZE}px monospace`;
  ctx.textBaseline = "top";

  const mouseActive = mouseX > 0 || mouseY > 0;
  const mxPx = mouseX * cols * CELL_W;
  const myPx = mouseY * rows * CELL_H;
  const influenceRadius =
    Math.max(cols, rows) * CELL_W * INFLUENCE_RADIUS_FACTOR;

  const ALPHA_DARK = 0.08;
  const ALPHA_BRIGHT = 0.55;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const idx = y * cols + x;
      const ch = charGrid[idx]!;
      const px = x * CELL_W;
      const py = y * CELL_H;

      let alpha = ALPHA_DARK;
      if (mouseActive) {
        const dx = px - mxPx;
        const dy = py - myPx;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / influenceRadius);
        alpha = ALPHA_DARK + proximity * (ALPHA_BRIGHT - ALPHA_DARK);
      }

      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fillText(ch, px, py);
    }
  }
}

/** Update mouse position relative to canvas element. */
export function onAsciiMouseMove(state: AsciiGrid, e: MouseEvent): void {
  const rect = state.canvas.getBoundingClientRect();
  state.mouseX = (e.clientX - rect.left) / rect.width;
  state.mouseY = (e.clientY - rect.top) / rect.height;
}

/** Stop animation loop and clean up. */
export function destroyAsciiCanvas(state: AsciiGrid): void {
  if (state.rafId) cancelAnimationFrame(state.rafId);
}
