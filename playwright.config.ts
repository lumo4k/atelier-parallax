import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
    browserName: "chromium",
    launchOptions: {
      channel: process.platform === "win32" ? "msedge" : undefined,
    },
  },
  workers: 1,
  reporter: "list",
});
