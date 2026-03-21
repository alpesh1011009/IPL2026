import type { Metadata } from "next";
import { iplSchedule, teamFullNames, teamTextColors, teamColors } from "@/data/schedule";
import { ScheduleTable } from "@/components/schedule/schedule-table";
import { ScheduleDownload } from "@/components/schedule/schedule-download";
import { CalendarDays } from "lucide-react";

export const metadata: Metadata = {
  title: "IPL 2026 Full Schedule & Timetable | IPLPro",
  description: "Complete IPL 2026 match schedule with dates, times, venues. Create posters for any match and download the full schedule.",
};

export default function SchedulePage() {
  const totalMatches = iplSchedule.length;
  const venues = new Set(iplSchedule.map((m) => m.venue)).size;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      {/* Page header */}
      <div className="mb-10 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
          <CalendarDays className="h-3.5 w-3.5" />
          Phase 1 Schedule
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          TATA IPL 2026{" "}
          <span className="bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
            Match Schedule
          </span>
        </h1>
        <p className="mt-3 text-muted-foreground sm:text-lg">
          {totalMatches} matches (Phase 1) &bull; {venues} venues &bull; Click any match to create a poster
        </p>

        {/* Stats */}
        <div className="mt-6 inline-flex items-center gap-6 rounded-xl border border-white/10 bg-white/5 px-6 py-3">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{totalMatches}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Matches</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <p className="text-2xl font-bold text-white">10</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Teams</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">{venues}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Venues</p>
          </div>
        </div>

        {/* Download button */}
        <div className="mt-6">
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
