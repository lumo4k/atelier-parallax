export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(
  /\/$/,
  "",
);
export function publicAsset(path: string) {
  return path.startsWith("/") && !path.startsWith("//")
    ? `${basePath}${path}`
    : path;
}
