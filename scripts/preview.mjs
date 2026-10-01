import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
await mkdir("artifacts/previews", { recursive: true });
const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage();
for (const [name, width, height] of [
  ["desktop", 1440, 1000],
  ["mobile", 390, 844],
]) {
  await page.setViewportSize({ width, height });
  await page.goto("http://localhost:3000");
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `artifacts/previews/${name}.png` });
}
await page.emulateMedia({ reducedMotion: "reduce" });
await page.setViewportSize({ width: 1440, height: 1000 });
await page.reload();
await page.screenshot({ path: "artifacts/previews/full.png", fullPage: true });
for (const [name, selector] of [
  ["services", ".services"],
  ["about", ".about"],
  ["cta", ".final-cta"],
]) {
  await page
    .locator(selector)
    .screenshot({ path: `artifacts/previews/${name}.png` });
}
await page.getByRole('button', { name: 'Ativar modo escuro' }).click();
await page.evaluate(() => window.scrollTo(0, 0));
await page.screenshot({ path: 'artifacts/previews/desktop-dark.png' });
await page.locator('.services').screenshot({ path: 'artifacts/previews/services-dark.png' });
await page.setViewportSize({ width: 390, height: 844 });
await page.evaluate(() => window.scrollTo(0, 0));
await page.screenshot({ path: 'artifacts/previews/mobile-dark.png' });
await browser.close();
