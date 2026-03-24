export type ThemeKey = "orange" | "violet" | "cyan" | "rose" | "green" | "gold" | "indigo" | "teal";

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
    primary: "#a78bfa",
    primaryFg: "#0a0a12",
    bg: "#0a0a12",
    card: "#13111f",
    secondary: "#1e1b2e",
    border: "#2d2a45",
  },
  cyan: {
    key: "cyan",
    name: "Cyan",
    primary: "#22d3ee",
    primaryFg: "#080d10",
    bg: "#080d10",
    card: "#0d1820",
    secondary: "#112028",
    border: "#18303d",
  },
  rose: {
    key: "rose",
    name: "Rose",
    primary: "#fb7185",
    primaryFg: "#ffffff",
    bg: "#0f0709",
    card: "#1a0d10",
    secondary: "#241218",
    border: "#3a1c22",
  },
  green: {
    key: "green",
    name: "Green",
    primary: "#4ade80",
    primaryFg: "#080c09",
    bg: "#080c09",
    card: "#0e1810",
    secondary: "#132015",
    border: "#1c3320",
  },
  gold: {
    key: "gold",
    name: "Gold",
    primary: "#fbbf24",
    primaryFg: "#0b0a05",
    bg: "#0b0a05",
    card: "#181500",
    secondary: "#241f00",
    border: "#3a3200",
  },
  indigo: {
    key: "indigo",
    name: "Indigo",
    primary: "#818cf8",
    primaryFg: "#0a0a0f",
    bg: "#0a0a0f",
    card: "#141421",
    secondary: "#1a1735",
    border: "#2e2a5e",
  },
  teal: {
    key: "teal",
    name: "Teal",
    primary: "#2dd4bf",
    primaryFg: "#080d0b",
    bg: "#080d0b",
    card: "#0f1a17",
    secondary: "#142827",
    border: "#1e3d36",
  },
};

export const THEME_ORDER: ThemeKey[] = ["orange", "indigo", "cyan", "teal", "rose", "green", "violet", "gold"];
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
