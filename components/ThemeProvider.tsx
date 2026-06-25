"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "dark" | "light";

type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Dark is the default. The inline script in layout.tsx sets the class before
  // paint, so we read back from the DOM to stay in sync (no flash).
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const initial = document.documentElement.classList.contains("light")
      ? "light"
      : "dark";
    setTheme(initial);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      const root = document.documentElement;
      // Briefly suppress transitions so the swap is crisp, not smeared.
      root.classList.add("no-transition");
      root.classList.toggle("light", next === "light");
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* ignore storage errors (private mode, etc.) */
      }
      window.setTimeout(() => root.classList.remove("no-transition"), 60);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
