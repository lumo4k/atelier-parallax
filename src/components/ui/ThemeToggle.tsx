"use client";
import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";
import { themeStorageKey, type ColorMode } from "@/config/theme";
import { siteConfig } from "@/config/site";

function subscribe(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== themeStorageKey && event.key !== null) return;
    document.documentElement.dataset.theme =
      event.newValue === "dark" ? "dark" : "light";
    listener();
  };
  window.addEventListener("color-mode-change", listener);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener("color-mode-change", listener);
    window.removeEventListener("storage", onStorage);
  };
}
const getSnapshot = (): ColorMode =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";
const getServerSnapshot = (): ColorMode => "light";

export function ThemeToggle() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={
        mode === "light"
          ? siteConfig.labels.darkMode
          : siteConfig.labels.lightMode
      }
      aria-pressed={mode === "dark"}
      onClick={() => {
        const next = getSnapshot() === "light" ? "dark" : "light";
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem(themeStorageKey, next);
        } catch {
          /* O controle permanece funcional com armazenamento bloqueado. */
        }
        window.dispatchEvent(new Event("color-mode-change"));
      }}
    >
      <Moon
        className="theme-icon-dark"
        size={18}
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <Sun
        className="theme-icon-light"
        size={18}
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </button>
  );
}
