import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const basePath = (
  process.argv[2] ??
  process.env.NEXT_PUBLIC_BASE_PATH ??
  ""
).replace(/\/$/, "");
if (basePath && (!basePath.startsWith("/") || basePath.includes(".."))) {
  throw new Error(
    "Informe o caminho do repositório, como /parallax-template, ou deixe vazio para domínio próprio.",
  );
}
const result = spawnSync(
  process.execPath,
  ["node_modules/next/dist/bin/next", "build"],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      STATIC_EXPORT: "1",
      NEXT_PUBLIC_BASE_PATH: basePath,
    },
  },
);
if (result.status === 0) writeFileSync("out/.nojekyll", "");
process.exitCode = result.status ?? 1;
