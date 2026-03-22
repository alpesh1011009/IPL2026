"use client";

import { useLanguage } from "@/context/language-context";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                <path d="M15 5.2 Q11.5 2 8.5 3 Q4 4.5 4 10 Q4 15.5 8.5 17 Q11.5 18 15 14.8"
                      stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
                <circle cx="15.5" cy="10" r="2.8" fill="currentColor"/>
                <path d="M14.2 8 Q12.8 10 14.2 12" stroke="rgba(0,0,0,0.28)" strokeWidth="0.65" fill="none" strokeLinecap="round"/>
                <path d="M16.8 8 Q18.2 10 16.8 12" stroke="rgba(0,0,0,0.18)" strokeWidth="0.65" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-sm font-semibold">
              cricpost<span className="text-primary">.in</span>
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 sm:items-end">
            <p className="text-xs text-muted-foreground">{t("footerDisclaimer")}</p>
            <a
              href="/terms"
              className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
            >
              {t("termsAndConditions")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
