"use client";

import { useLanguage } from "@/context/language-context";

export function OwnPosterPageHero() {
  const { t } = useLanguage();
  return (
    <div className="mb-8 text-center">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
        {t("fanSupportBadge")}
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        {t("fanSupportTitle")}{" "}
        <span className="text-primary">{t("fanSupportHighlight")}</span>{" "}
        {t("fanSupportTitle2")}
      </h1>
      <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
        {t("fanSupportDesc")}
      </p>
    </div>
  );
}
