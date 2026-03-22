export type ThemeKey = "orange" | "violet" | "cyan" | "rose" | "green" | "gold";

export interface Theme {
  key: ThemeKey;
  name: string;
  primary: string;
  primaryFg: string;
  bg: string;
  card: string;
  secondary: string;
  border: string;
}

export const themes: Record<ThemeKey, Theme> = {
  orange: {
    key: "orange",
    name: "Orange",
    primary: "#f97316",
    primaryFg: "#09090b",
    bg: "#09090b",
    card: "#18181b",
    secondary: "#27272a",
    border: "#3f3f46",
  },
  violet: {
    key: "violet",
    name: "Violet",
    primary: "#8b5cf6",
    primaryFg: "#ffffff",
    bg: "#0a0a12",
    card: "#13111f",
    secondary: "#1e1b2e",
    border: "#2d2a45",
  },
  cyan: {
    key: "cyan",
    name: "Cyan",
    primary: "#06b6d4",
    primaryFg: "#09090b",
    bg: "#080d10",
    card: "#0d1820",
    secondary: "#112028",
    border: "#18303d",
  },
  rose: {
    key: "rose",
    name: "Rose",
    primary: "#f43f5e",
    primaryFg: "#ffffff",
    bg: "#0f0709",
    card: "#1a0d10",
    secondary: "#241218",
    border: "#3a1c22",
  },
  green: {
    key: "green",
    name: "Green",
    primary: "#22c55e",
    primaryFg: "#09090b",
    bg: "#080c09",
    card: "#0e1810",
    secondary: "#132015",
    border: "#1c3320",
  },
  gold: {
    key: "gold",
    name: "Gold",
    primary: "#eab308",
    primaryFg: "#09090b",
    bg: "#0b0a05",
    card: "#181500",
    secondary: "#241f00",
    border: "#3a3200",
  },
};

export const THEME_ORDER: ThemeKey[] = ["orange", "violet", "cyan", "rose", "green", "gold"];
export const DEFAULT_THEME: ThemeKey = "orange";

export function applyTheme(key: ThemeKey) {
  const t = themes[key];
  const r = document.documentElement.style;
  r.setProperty("--color-primary", t.primary);
  r.setProperty("--color-primary-foreground", t.primaryFg);
  r.setProperty("--color-background", t.bg);
  r.setProperty("--color-card", t.card);
  r.setProperty("--color-secondary", t.secondary);
  r.setProperty("--color-muted", t.secondary);
  r.setProperty("--color-border", t.border);
  r.setProperty("--color-accent", t.primary);
  r.setProperty("--color-ring", t.primary);
  document.documentElement.style.setProperty("background-color", t.bg);
}
