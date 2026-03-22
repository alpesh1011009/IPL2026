"use client";

import { Trophy } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { iplTeams } from "@/data/teams";

export function TeamsPageHero() {
  const { t } = useLanguage();
  const totalPlayers = iplTeams.reduce((sum, team) => sum + team.players.length, 0);
  const totalTitles = iplTeams.reduce((sum, team) => sum + team.titles, 0);

  return (
    <div className="mb-10 text-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
        <Trophy className="h-3.5 w-3.5" />
        {t("cricket2026Badge")}
      </div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {t("allTeamsTitle")}{" "}
        <span className="bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
          {t("allTeamsHighlight")}
        </span>
      </h1>
      <p className="mt-3 text-muted-foreground sm:text-lg">
        {(t("teamsSubtitle") as (tm: number, pl: number) => string)(iplTeams.length, totalPlayers)}
      </p>
      <div className="mt-6 inline-flex items-center gap-6 rounded-xl border border-white/10 bg-white/5 px-6 py-3">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{iplTeams.length}</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("teamsLabel")}</p>
        </div>
        <div className="h-8 w-px bg-white/10" />
        <div className="text-center">
          <p className="text-2xl font-bold text-white">{totalPlayers}</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("playersLabel")}</p>
        </div>
        <div className="h-8 w-px bg-white/10" />
        <div className="text-center">
          <p className="text-2xl font-bold text-yellow-400">{totalTitles}</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("totalTitles")}</p>
        </div>
      </div>
    </div>
  );
}

export function TeamsRoleLegend() {
  const { t } = useLanguage();
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-4 rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-xs text-muted-foreground">
      <span className="font-semibold text-white">{t("roleLegend")}</span>
      <span className="flex items-center gap-1">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" /> {t("batsman")}
      </span>
      <span className="flex items-center gap-1">
        <span className="inline-block h-2 w-2 rounded-full bg-red-400" /> {t("bowler")}
      </span>
      <span className="flex items-center gap-1">
        <span className="inline-block h-2 w-2 rounded-full bg-blue-400" /> {t("allRounder")}
      </span>
      <span className="flex items-center gap-1">
        <span className="inline-block h-2 w-2 rounded-full bg-amber-400" /> {t("wicketKeeper")}
      </span>
    </div>
  );
}
