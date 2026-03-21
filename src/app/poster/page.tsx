"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { iplSchedule } from "@/data/schedule";
import { BusinessPoster } from "@/components/poster/business-poster";
import { Download, ImageIcon } from "lucide-react";

function PosterContent() {
  const searchParams = useSearchParams();
  const matchNum = searchParams.get("match");
  const match = matchNum
    ? iplSchedule.find((m) => m.matchNumber === parseInt(matchNum))
    : null;

  if (!match) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Create Match{" "}
            <span className="bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
              Poster
            </span>
          </h1>
          <p className="mt-3 text-muted-foreground">
            Select a match from the schedule to create your poster
          </p>
        </div>

        {/* Match selector grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {iplSchedule.slice(0, 12).map((m) => (
            <a
              key={m.matchNumber}
              href={`/poster?match=${m.matchNumber}`}
              className="group flex items-center gap-4 rounded-xl border border-white/10 bg-card p-4 transition-all hover:border-primary/50 hover:bg-white/[0.04]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                #{m.matchNumber}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white">
                  {m.team1} vs {m.team2}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">
                  {m.date} &bull; {m.venue}
                </p>
              </div>
              <ImageIcon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
            </a>
          ))}
        </div>

        <div className="mt-6 text-center">
          <a
            href="/schedule"
            className="text-sm font-medium text-primary hover:underline"
          >
            View full schedule ({iplSchedule.length} matches) &rarr;
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="mb-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
          <Download className="h-3.5 w-3.5" />
          Match #{match.matchNumber}
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {match.team1} vs {match.team2}{" "}
          <span className="text-muted-foreground font-normal text-lg">
            &mdash; {match.date}
          </span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Add your business details and download a branded match poster
        </p>
      </div>

      <BusinessPoster match={match} />

      {/* Other matches */}
      <div className="mt-12 border-t border-white/10 pt-8">
        <h2 className="mb-4 text-lg font-bold">Create More Posters</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {iplSchedule
            .filter((m) => m.matchNumber !== match.matchNumber)
            .slice(0, 8)
            .map((m) => (
              <a
                key={m.matchNumber}
                href={`/poster?match=${m.matchNumber}`}
                className="group rounded-lg border border-white/10 bg-card p-3 transition-all hover:border-primary/50"
              >
                <p className="text-xs font-bold text-white">
                  {m.team1} vs {m.team2}
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  #{m.matchNumber} &bull; {m.date}
                </p>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}

export default function PosterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <PosterContent />
    </Suspense>
  );
}
