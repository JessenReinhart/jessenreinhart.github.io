import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const errors = [];
const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on("pageerror", (error) => errors.push(`PAGE ERROR: ${error.stack || error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`CONSOLE ERROR: ${message.text()}`);
  });

  const response = await page.goto("http://127.0.0.1:4173", { waitUntil: "networkidle" });
  await mkdir("artifacts", { recursive: true });
  await page.screenshot({ path: "artifacts/preview.png", fullPage: true });

  const rootText = await page.locator("#root").innerText().catch(() => "");
  const bodyText = await page.locator("body").innerText().catch(() => "");

  console.log(`HTTP status: ${response?.status()}`);
  console.log(`Root text length: ${rootText.length}`);
  console.log(`Body text preview: ${bodyText.slice(0, 300)}`);

  if (!response?.ok()) errors.push(`Preview returned HTTP ${response?.status()}`);
  if (!rootText.trim()) errors.push("React root rendered no visible text");

  if (errors.length) {
    console.error("Runtime smoke test failed:\n" + errors.join("\n\n"));
    process.exitCode = 1;
  }
} finally {
  await browser.close();
}
