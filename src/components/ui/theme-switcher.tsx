"use client";

import { useState } from "react";
import { Palette } from "lucide-react";
import { useTheme } from "@/context/theme-context";
import { themes, THEME_ORDER } from "@/lib/themes";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        title="Change theme"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-all hover:bg-white/10 hover:text-foreground"
      >
        <Palette className="h-4 w-4" />
      </button>

      {open && (
        <>
          {/* backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          <div className="absolute right-0 top-full z-50 mt-2 rounded-xl border border-white/10 bg-[#111113] p-3 shadow-2xl shadow-black/70">
            <p className="mb-2.5 px-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Theme
            </p>
            <div className="flex gap-2">
              {THEME_ORDER.map((key) => (
                <button
                  key={key}
                  onClick={() => { setTheme(key); setOpen(false); }}
                  title={themes[key].name}
                  className="relative flex h-7 w-7 items-center justify-center rounded-full transition-transform hover:scale-110"
                  style={{ background: themes[key].primary }}
                >
                  {theme === key && (
                    <span className="absolute inset-0 rounded-full ring-2 ring-white ring-offset-2 ring-offset-[#111113]" />
                  )}
                </button>
              ))}
            </div>
            <div className="mt-2 border-t border-white/5 pt-2">
              <p className="text-center text-[10px] text-muted-foreground">
                {themes[theme].name}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
