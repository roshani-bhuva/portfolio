export const THEME_STORAGE_KEY = "portfolio-theme";

/** @param {'light' | 'dark'} mode */
export function applyTheme(mode) {
  const root = document.documentElement;
  if (mode === "light") root.classList.remove("dark");
  else root.classList.add("dark");
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    /* ignore */
  }
}
