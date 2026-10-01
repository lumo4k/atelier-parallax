import type { CSSProperties } from "react";
export const theme = {
  primary: "#444c37",
  secondary: "#242820",
  accent: "#b9bf9e",
  background: "#f4f2eb",
  surface: "#e9e7de",
  text: "#292d25",
  muted: "#66695e",
  inverse: "#f4f2eb",
  buttonSurface: "#f4f2eb",
  buttonText: "#444c37",
  radiusSm: "2px",
  radiusMd: "4px",
  radiusLg: "8px",
  spacingSection: "clamp(5rem, 10vw, 10rem)",
};
export const darkTheme: Partial<typeof theme> = {
  background: "#191c17",
  surface: "#252a22",
  text: "#efeee7",
  muted: "#b4b8ab",
  accent: "#c0c7a7",
};
export const themeStorageKey = "atelier-color-mode";
export type ColorMode = "light" | "dark";
export const themeVariables = Object.fromEntries(
  Object.entries(theme).map(([key, value]) => [
    key.startsWith("radius")
      ? `--radius-${key.slice(6).toLowerCase()}`
      : key === "spacingSection"
        ? "--spacing-section"
        : `--color-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`,
    value,
  ]),
) as CSSProperties;
const declarations = (tokens: Record<string, string>) =>
  Object.entries(tokens)
    .map(
      ([key, value]) =>
        `${key.startsWith("radius") ? `--radius-${key.slice(6).toLowerCase()}` : key === "spacingSection" ? "--spacing-section" : `--color-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`}:${value}`,
    )
    .join(";");
export const themeStyles = `:root{color-scheme:light;${declarations(theme)}}:root[data-theme="dark"]{color-scheme:dark;${declarations(darkTheme)}}`;
export const themeInitScript = `try{document.documentElement.dataset.theme=localStorage.getItem(${JSON.stringify(themeStorageKey)})==='dark'?'dark':'light'}catch{document.documentElement.dataset.theme='light'}`;
