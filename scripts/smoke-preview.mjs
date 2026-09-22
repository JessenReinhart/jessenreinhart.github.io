import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

async function testDesktop(browser) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on("pageerror", (error) => errors.push(`DESKTOP PAGE ERROR: ${error.stack || error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`DESKTOP CONSOLE ERROR: ${message.text()}`);
  });

  const response = await page.goto("http://127.0.0.1:4173", { waitUntil: "networkidle" });
  const rootText = await page.locator("#root").innerText().catch(() => "");

  assert(response?.ok(), `Desktop preview returned HTTP ${response?.status()}`);
  assert(rootText.trim().length > 0, "Desktop React root rendered no visible text");

  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < pageHeight; y += 700) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await page.waitForTimeout(90);
  }

  await mkdir("artifacts", { recursive: true });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(300);
  await page.screenshot({ path: "artifacts/preview.png", fullPage: true });
  await page.close();
}

async function testMobile(browser) {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  page.on("pageerror", (error) => errors.push(`MOBILE PAGE ERROR: ${error.stack || error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`MOBILE CONSOLE ERROR: ${message.text()}`);
  });

  const response = await page.goto("http://127.0.0.1:4173", { waitUntil: "networkidle" });
  assert(response?.ok(), `Mobile preview returned HTTP ${response?.status()}`);

  const viewportMetrics = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    headerTop: document.querySelector("header")?.getBoundingClientRect().top ?? NaN,
    headerPosition: getComputedStyle(document.querySelector("header")).position,
  }));

  console.log("MOBILE viewport:", JSON.stringify(viewportMetrics));
  assert(
    viewportMetrics.scrollWidth <= viewportMetrics.innerWidth + 1,
    `Mobile page has horizontal overflow: ${viewportMetrics.scrollWidth}px > ${viewportMetrics.innerWidth}px`,
  );
  assert(viewportMetrics.headerPosition === "fixed", "Mobile header is not fixed");

  const menuToggle = page.getByRole("button", { name: "Toggle menu" });
  await menuToggle.click();
  const menuText = await page.locator("header").innerText();
  assert(menuText.includes("PROJECTS"), "Mobile menu did not open with navigation items");

  const navTargets = [
    ["PROJECTS", "projects"],
    ["GITHUB", "github"],
    ["EXPERIENCE", "experience"],
    ["ABOUT", "about"],
    ["CONTACT", "contact"],
  ];

  for (const [label, id] of navTargets) {
    if (id !== "projects") {
      await menuToggle.click();
      await page.waitForTimeout(50);
    }

    await page.locator("header").getByRole("button", { name: label }).click();

    await page.waitForFunction(
      (targetId) => {
        const target = document.getElementById(targetId);
        const rect = target?.getBoundingClientRect();
        return !!rect && rect.top >= 65 && rect.top <= 125;
      },
      id,
      { timeout: 3000, polling: 50 },
    );

    const targetMetrics = await page.evaluate((targetId) => {
      const target = document.getElementById(targetId);
      const rect = target?.getBoundingClientRect();
      return {
        top: rect?.top ?? NaN,
        height: rect?.height ?? NaN,
        targetId,
      };
    }, id);

    console.log("MOBILE nav", id, JSON.stringify(targetMetrics));
    assert(
      Number.isFinite(targetMetrics.top) && targetMetrics.top >= 65 && targetMetrics.top <= 125,
      `Mobile nav ${id} landed at unexpected top: ${targetMetrics.top}`,
    );
  }

  await page.evaluate(() => document.getElementById("projects")?.scrollIntoView({ block: "start", behavior: "instant" }));
  await page.waitForTimeout(250);

  const projectMetrics = await page.evaluate(() => {
    const cards = [...document.querySelectorAll(".scroll-stack-card")];
    const project = document.getElementById("projects");
    return {
      cardCount: cards.length,
      projectRect: project?.getBoundingClientRect().toJSON(),
      headerZ: Number.parseInt(getComputedStyle(document.querySelector("header")).zIndex, 10) || 0,
      cardZ: cards.length ? Number.parseInt(getComputedStyle(cards[0]).zIndex, 10) || 0 : 0,
      cards: cards.map((card) => {
        const rect = card.getBoundingClientRect();
        return {
          width: rect.width,
          height: rect.height,
          left: rect.left,
          right: rect.right,
          transform: getComputedStyle(card).transform,
        };
      }),
      hasSelectedCopy: document.body.innerText.includes("SELECTED"),
      descriptions: document.querySelectorAll(".scroll-stack-card__description").length,
      links: document.querySelectorAll(".scroll-stack-card__links").length,
    };
  });

  console.log("MOBILE project UI:", JSON.stringify(projectMetrics));
  assert(projectMetrics.cardCount >= 5, `Expected at least 5 mobile project cards, got ${projectMetrics.cardCount}`);
  assert(projectMetrics.descriptions === projectMetrics.cardCount, `Every mobile project card should contain a description: ${projectMetrics.descriptions}/${projectMetrics.cardCount}`);
  assert(projectMetrics.links === projectMetrics.cardCount, `Every mobile project card should contain links: ${projectMetrics.links}/${projectMetrics.cardCount}`);
  assert(projectMetrics.cardZ < projectMetrics.headerZ, `ScrollStack card z-index ${projectMetrics.cardZ} must stay below fixed header z-index ${projectMetrics.headerZ}`);
  assert(!projectMetrics.hasSelectedCopy, "Mobile project UI still exposes selected-state copy");
  for (const [index, card] of projectMetrics.cards.entries()) {
    assert(card.width <= 390 && card.left >= -1 && card.right <= 391, `Card ${index + 1} exceeds mobile viewport`);
    assert(card.height >= 550, `Card ${index + 1} is unexpectedly short: ${card.height}`);
  }

  const sampleScrollY = await page.evaluate(() => {
    const project = document.getElementById("projects");
    return window.scrollY + (project?.getBoundingClientRect().top ?? 0) + 1800;
  });
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), sampleScrollY);
  await page.waitForTimeout(300);

  const firstTransforms = await page.evaluate(() =>
    [...document.querySelectorAll(".scroll-stack-card")].map((card) => getComputedStyle(card).transform),
  );
  await page.waitForTimeout(250);
  const secondTransforms = await page.evaluate(() =>
    [...document.querySelectorAll(".scroll-stack-card")].map((card) => getComputedStyle(card).transform),
  );

  console.log("MOBILE transform stability:", JSON.stringify({ firstTransforms, secondTransforms }));
  assert(
    firstTransforms.some((transform) => !transform.startsWith("matrix(1, 0, 0, 1")),
    "ScrollStack transform probe did not reach an actively transformed card",
  );
  assert(
    JSON.stringify(firstTransforms) === JSON.stringify(secondTransforms),
    "ScrollStack transforms kept changing while the page stayed at the same scroll position",
  );

  await page.screenshot({ path: "artifacts/mobile-preview.png", fullPage: true });
  await page.close();
}

const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

try {
  await mkdir("artifacts", { recursive: true });
  await testDesktop(browser);
  await testMobile(browser);

  if (errors.length) {
    console.error("Runtime smoke test failed:\n" + errors.join("\n\n"));
    process.exitCode = 1;
  } else {
    console.log("Runtime smoke test passed: desktop + mobile navigation + mobile ScrollStack UI.");
  }
} finally {
  await browser.close();
}
