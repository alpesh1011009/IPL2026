"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { themes, DEFAULT_THEME, applyTheme, type ThemeKey } from "@/lib/themes";

interface ThemeContextValue {
  theme: ThemeKey;
  setTheme: (key: ThemeKey) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeKey>(DEFAULT_THEME);

  useEffect(() => {
    const saved = localStorage.getItem("cricpro-theme") as ThemeKey | null;
    const key = saved && themes[saved] ? saved : DEFAULT_THEME;
    setThemeState(key);
    applyTheme(key);
  }, []);

  function setTheme(key: ThemeKey) {
    setThemeState(key);
    localStorage.setItem("cricpro-theme", key);
    applyTheme(key);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
