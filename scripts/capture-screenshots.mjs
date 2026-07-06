import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Mapping: project key → { url, file }
// Key dipake di commit message: `[shot:tripcore]`
// Tambahin project baru disini pas nambah project di website.
const PROJECTS = {
  tripcore: { url: "https://tripcore-beta.vercel.app", file: "tripcore-live.jpg" },
  invoicr:  { url: "https://invoicr-eight.vercel.app",  file: "invoicr-live.jpg" },
  wedding:  { url: "https://wedding-invitation-tau-two.vercel.app", file: "wedding-live.jpg" },
  soulsync: { url: "https://soulsync-gamma.vercel.app", file: "soulsync-live.jpg" },
};

async function capture(url) {
  // Dynamic import — pengguna lokal tanpa playwright ga kena error
  const { chromium } = await import("playwright");
  const browser = await chromium.launch({ channel: "chrome" });
  try {
    const page = await browser.newPage({
      viewport: { width: 1280, height: 800 },
    });
    await page.goto(url, { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(5000);
    return await page.screenshot({ type: "jpeg", quality: 85 });
  } finally {
    await browser.close();
  }
}

async function main() {
  const outDir = resolve(__dirname, "..", "public", "screenshots");
  mkdirSync(outDir, { recursive: true });

  // --file & --url → single project (from workflow_dispatch or CLI)
  const fileArg = process.argv.find((a) => a.startsWith("--file="));
  const urlArg  = process.argv.find((a) => a.startsWith("--url="));

  if (fileArg && urlArg) {
    const file = fileArg.split("=")[1];
    const url  = urlArg.split("=")[1];
    const outPath = resolve(outDir, file);
    console.log(`Capturing ${url} → ${file} ...`);
    const buf = await capture(url);
    writeFileSync(outPath, buf);
    console.log(`  saved ${buf.length} bytes`);
    return;
  }

  // --key=xxx → single project by key (from push trigger)
  const keyArg = process.argv.find((a) => a.startsWith("--key="));
  if (keyArg) {
    const key = keyArg.split("=")[1];
    const proj = PROJECTS[key];
    if (!proj) {
      console.log(`Unknown project key "${key}". Available: ${Object.keys(PROJECTS).join(", ")}`);
      process.exit(1);
    }
    const outPath = resolve(outDir, proj.file);
    console.log(`Capturing ${proj.url} (${key}) → ${proj.file} ...`);
    const buf = await capture(proj.url);
    writeFileSync(outPath, buf);
    console.log(`  saved ${buf.length} bytes`);
    return;
  }

  // No args → capture all (fallback)
  for (const [key, { url, file }] of Object.entries(PROJECTS)) {
    const outPath = resolve(outDir, file);
    console.log(`Capturing ${url} (${key}) ...`);
    try {
      const buf = await capture(url);
      writeFileSync(outPath, buf);
      console.log(`  -> saved ${buf.length} bytes to ${file}`);
    } catch (err) {
      console.error(`  [WARN] failed ${key}: ${err.message}`);
    }
  }
}

main().catch((err) => {
  console.error("[WARN] screenshot capture failed:", err.message);
  process.exitCode = 1;
});
