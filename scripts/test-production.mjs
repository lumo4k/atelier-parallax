import { spawnSync } from "node:child_process";
const result = spawnSync(
  process.execPath,
  ["node_modules/@playwright/test/cli.js", "test"],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      PLAYWRIGHT_BASE_URL:
        process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3002",
    },
  },
);
process.exitCode = result.status ?? 1;
