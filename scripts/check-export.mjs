import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, sep } from "node:path";
import { chromium } from "@playwright/test";
const root = resolve("out");
const prefix = process.argv[2] ?? "/parallax-template";
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
};
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    if (!pathname.startsWith(`${prefix}/`)) {
      response.writeHead(404).end();
      return;
    }
    const path = resolve(
      root,
      `.${pathname.slice(prefix.length)}${pathname.endsWith("/") ? "index.html" : ""}`,
    );
    if (!path.startsWith(root + sep)) {
      response.writeHead(403).end();
      return;
    }
    const file = await readFile(path);
    const extension = path.slice(path.lastIndexOf("."));
    response
      .writeHead(200, {
        "Content-Type": types[extension] ?? "application/octet-stream",
      })
      .end(file);
  } catch {
    response.writeHead(404).end();
  }
});
await new Promise((done) => server.listen(3005, "127.0.0.1", done));
let browser;
try {
  browser = await chromium.launch({
    channel: process.platform === "win32" ? "msedge" : undefined,
  });
  const page = await browser.newPage();
  const failures = [];
  page.on("pageerror", (error) => failures.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400)
      failures.push(`${response.status()} ${response.url()}`);
  });
  await page.goto(`http://127.0.0.1:3005${prefix}/`, {
    waitUntil: "networkidle",
  });
  if (
    !(await page
      .locator(".hero-image img")
      .evaluate((image) => image.naturalWidth > 0))
  )
    failures.push("Imagem principal não carregou");
  await page.getByRole("button", { name: "Ativar modo escuro" }).click();
  if ((await page.locator("html").getAttribute("data-theme")) !== "dark")
    failures.push("Troca de tema falhou");
  if (failures.length) throw new Error(failures.join("\n"));
  console.log(
    "Export validado em subdiretório: assets, JavaScript, imagem e tema sem erros.",
  );
} finally {
  await browser?.close();
  await new Promise((done) => server.close(done));
}
