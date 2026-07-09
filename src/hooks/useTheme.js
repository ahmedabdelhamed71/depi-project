import { useCallback, useEffect, useState } from "react";

const THEME_KEY = "theme";

/**
 * Centralized theme state.
 *
 * - Initial theme is applied before first paint by the inline script in
 *   index.html (localStorage first, system preference as fallback).
 * - Toggling flips the `dark` class on <html>; all colors are remapped by
 *   the CSS layer in index.css, so no other component re-renders.
 * - The choice is persisted only when the user explicitly toggles; until
 *   then the app keeps following the OS theme, live.
 */
export default function useTheme() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Follow OS theme changes while the user hasn't picked one themselves.
  useEffect(() => {
    if (localStorage.getItem(THEME_KEY)) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => setTheme(e.matches ? "dark" : "light");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, next);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
