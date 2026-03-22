"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { type Lang, getT } from "@/lib/translations";

const LANG_KEY = "cricpost-lang";
const VALID_LANGS: Lang[] = ["en", "hi", "gu"];

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: ReturnType<typeof getT>;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY) as Lang | null;
    if (saved && VALID_LANGS.includes(saved)) setLangState(saved);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem(LANG_KEY, l);
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: getT(lang) }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
