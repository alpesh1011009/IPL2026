import type { Metadata } from "next";
import { iplSchedule, teamFullNames, teamTextColors, teamColors } from "@/data/schedule";
import { ScheduleTable } from "@/components/schedule/schedule-table";
import { ScheduleDownload } from "@/components/schedule/schedule-download";
import { CalendarDays } from "lucide-react";

export const metadata: Metadata = {
  title: "Cricket 2026 Full Schedule | CricPro",
  description: "Complete cricket match schedule with dates, times, venues. Create posters for any match and download the full schedule.",
};

export default function SchedulePage() {
  const totalMatches = iplSchedule.length;
  const venues = new Set(iplSchedule.map((m) => m.venue)).size;

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:py-6">
      {/* Page header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <CalendarDays className="h-3 w-3" />
            Phase 1 Schedule
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Cricket 2026{" "}
            <span className="bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
              Match Schedule
            </span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {totalMatches} matches (Phase 1) &bull; {venues} venues &bull; Click any match to create a poster
          </p>
        </div>

        {/* Stats + Download */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-2">
            <div className="text-center">
              <p className="text-lg font-bold text-primary">{totalMatches}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Matches</p>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div className="text-center">
              <p className="text-lg font-bold text-white">10</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Teams</p>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div className="text-center">
              <p className="text-lg font-bold text-yellow-400">{venues}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Venues</p>
            </div>
          </div>
          <ScheduleDownload matches={iplSchedule} />
        </div>
      </div>

      <ScheduleTable
        matches={iplSchedule}
        teamFullNames={teamFullNames}
        teamTextColors={teamTextColors}
        teamColors={teamColors}
      />

      {/* Phase 2 notice */}
      <div className="mt-8 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-center">
        <p className="text-sm font-medium text-yellow-400">
          Phase 2 schedule (Matches 21-84) coming soon
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          BCCI is expected to release the remaining schedule shortly. We&apos;ll update automatically.
        </p>
      </div>
    </div>
  );
}
