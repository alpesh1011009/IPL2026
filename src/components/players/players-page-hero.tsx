"use client";

import { CreditCard } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { iplTeams } from "@/data/teams";

export function PlayersPageHero() {
  const { t } = useLanguage();
  const totalPlayers = iplTeams.reduce((sum, t) => sum + t.players.length, 0);

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div>
        <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <CreditCard className="h-3 w-3" />
          {t("downloadableCards")}
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t("playerCardsTitle")}{" "}
          <span className="bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
            {t("playerCardsHighlight")}
          </span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {(t("playersSubtitle") as (p: number, tm: number) => string)(totalPlayers, iplTeams.length)}
        </p>
      </div>
      <div className="inline-flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-2">
        <div className="text-center">
          <p className="text-lg font-bold text-primary">{totalPlayers}</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("playersLabel")}</p>
        </div>
        <div className="h-6 w-px bg-white/10" />
        <div className="text-center">
          <p className="text-lg font-bold text-white">{iplTeams.length}</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("teamsLabel")}</p>
        </div>
        <div className="h-6 w-px bg-white/10" />
        <div className="text-center">
          <p className="text-lg font-bold text-yellow-400">PNG</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("pngFormat")}</p>
        </div>
      </div>
    </div>
  );
}
