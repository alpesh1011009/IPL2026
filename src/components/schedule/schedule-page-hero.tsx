"use client";

import { CalendarDays } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { ScheduleDownload } from "@/components/schedule/schedule-download";
import { iplSchedule } from "@/data/schedule";

export function SchedulePageHero() {
  const { t } = useLanguage();
  const totalMatches = iplSchedule.length;
  const venues = new Set(iplSchedule.map((m) => m.venue)).size;

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <CalendarDays className="h-3 w-3" />
            {t("phase1Schedule")}
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {t("cricket2026MatchSchedule")}{" "}
            <span className="bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
              {t("matchSchedule")}
            </span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {(t("scheduleSubtitle") as (m: number, v: number) => string)(totalMatches, venues)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-2">
            <div className="text-center">
              <p className="text-lg font-bold text-primary">{totalMatches}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("matchesLabel")}</p>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div className="text-center">
              <p className="text-lg font-bold text-white">10</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("teamsLabel")}</p>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div className="text-center">
              <p className="text-lg font-bold text-yellow-400">{venues}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("venuesLabel")}</p>
            </div>
          </div>
          <ScheduleDownload matches={iplSchedule} />
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-center schedule-phase2-notice">
        <p className="text-sm font-medium text-yellow-400">{t("phase2ComingSoon")}</p>
        <p className="mt-1 text-xs text-muted-foreground">{t("phase2Desc")}</p>
      </div>
    </>
  );
}
