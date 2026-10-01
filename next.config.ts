import type { NextConfig } from "next";
const staticExport = process.env.STATIC_EXPORT === "1";
const config: NextConfig = {
  output: staticExport ? "export" : undefined,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  trailingSlash: staticExport,
  images: { qualities: [75, 80, 85], unoptimized: staticExport },
};
export default config;
