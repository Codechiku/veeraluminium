// Real visual verification: drive actual Chrome, scroll, screenshot.
// Usage: node scripts/shoot.mjs [url] [tag] [stepPx] [maxShots]
import puppeteer from "puppeteer-core";
import { mkdirSync } from "fs";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const url = process.argv[2] || "http://localhost:3000/";
const tag = process.argv[3] || "home";
const stepPx = Number(process.argv[4] || 700);
const maxShots = Number(process.argv[5] || 16);
const outDir = "C:/Users/admin/Documents/das/.shots";
mkdirSync(outDir, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (...a) => process.stdout.write(a.join(" ") + "\n");

try {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await sleep(1500);

  const height = await page.evaluate(() => document.body.scrollHeight);
  const steps = Math.min(maxShots, Math.ceil(height / stepPx));
  log(`URL=${url} height=${height} step=${stepPx} steps=${steps}`);

  for (let i = 0; i < steps; i++) {
    const y = i * stepPx;
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await sleep(800);
    const file = `${outDir}/${tag}-${String(i).padStart(2, "0")}.png`;
    try {
      await page.screenshot({ path: file, timeout: 15000 });
      log("shot", file);
    } catch (e) {
      log("SHOT-ERR", i, String(e).slice(0, 100));
    }
  }
  await browser.close();
  log("DONE");
} catch (e) {
  log("FATAL", String(e).slice(0, 300));
  process.exit(1);
}
