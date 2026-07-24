import Prerenderer from "@prerenderer/prerenderer";
import PuppeteerRenderer from "@prerenderer/renderer-puppeteer";

const ROUTES = ["/"];

const prerenderer = new Prerenderer({
  staticDir: "dist",
  // The site is deployed under a subpath on GitHub Pages; relative asset
  // paths (base: "./") resolve against whatever origin serves dist, so the
  // prerendered output stays portable.
  renderer: new PuppeteerRenderer({
    launchOptions: {
      // Headless Chrome needs --no-sandbox in CI (root container) and on some
      // Windows setups. Harmless locally.
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
    },
    // Let lazy chunks, fonts and the GitHub fetch settle before snapshotting.
    renderAfterTime: 2500,
    timeoutPerRender: 30000,
    maxConcurrentRoutes: 1,
  }),
});

try {
  await prerenderer.initialize();
  const rendered = await prerenderer.renderRoutes(ROUTES);
  await prerenderer.destroy();

  for (const route of rendered) {
    // prerenderer returns the full document HTML with #root populated.
    // Write it back so the page ships with crawler-visible content.
    const file = route.route === "/" ? "dist/index.html" : `dist${route.route}/index.html`;
    const fs = await import("node:fs/promises");
    await fs.mkdir("dist", { recursive: true });
    await fs.writeFile(file, route.html, "utf-8");
    const bytes = Buffer.byteLength(route.html, "utf-8");
    console.log(`[prerender] ${route.route} -> ${file} (${bytes} bytes)`);
  }
  console.log("[prerender] done");
} catch (err) {
  console.error("[prerender] failed:", err);
  process.exit(1);
}
