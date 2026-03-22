"use client";

import { useEffect, useState } from "react";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { iplSchedule, teamTextColors } from "@/data/schedule";
import { teamLogoUrls } from "@/data/teams";

function parseMatchDate(dateStr: string, timeStr: string): Date {
  // "28 Mar 2026" + "7:30 PM" → Date
  const [day, mon, year] = dateStr.split(" ");
  const months: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const [rawTime, period] = timeStr.split(" ");
  let [h, m] = rawTime.split(":").map(Number);
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return new Date(Number(year), months[mon], Number(day), h, m, 0);
}

function getNextMatch() {
  const now = new Date();
  return iplSchedule.find((m) => parseMatchDate(m.date, m.time) > now) ?? iplSchedule[0];
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

function Pad({ n }: { n: number }) {
  return <>{String(n).padStart(2, "0")}</>;
}

export function MatchCountdown() {
  const match = getNextMatch();
  const target = parseMatchDate(match.date, match.time);

  const [time, setTime] = useState<TimeLeft>(() => calcTimeLeft(target));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTime(calcTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!mounted) return null;

  const isLive = time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card">
      {/* glow */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />

      <div className="relative z-10 p-5 sm:p-6">
        {/* header */}
        <div className="mb-4 flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Next Match — #{match.matchNumber}
          </span>
          {isLive && (
            <span className="ml-auto flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] font-bold text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              LIVE
            </span>
          )}
        </div>

        {/* teams */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <TeamBadge shortName={match.team1} />
          <span className="text-lg font-black text-white/40">VS</span>
          <TeamBadge shortName={match.team2} right />
        </div>

        {/* countdown blocks */}
        {!isLive ? (
          <div className="grid grid-cols-4 gap-2">
            {([
              { value: time.days, label: "Days" },
              { value: time.hours, label: "Hrs" },
              { value: time.minutes, label: "Min" },
              { value: time.seconds, label: "Sec" },
            ] as { value: number; label: string }[]).map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-xl border border-white/10 bg-white/5 py-3"
              >
                <span className="text-2xl font-black tabular-nums text-white sm:text-3xl">
                  <Pad n={value} />
                </span>
                <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-green-500/30 bg-green-500/10 py-3 text-center">
            <span className="text-sm font-bold text-green-400">Match is ON! 🏏</span>
          </div>
        )}

        {/* meta */}
        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">{match.venue}</span>
          <span className="ml-auto shrink-0 whitespace-nowrap">{match.date} · {match.time}</span>
        </div>
      </div>
    </div>
  );
}

function TeamBadge({ shortName, right }: { shortName: string; right?: boolean }) {
  const colorClass = teamTextColors[shortName] ?? "text-white";
  const logo = teamLogoUrls[shortName];
  return (
    <div className={`flex items-center gap-2 ${right ? "flex-row-reverse" : ""}`}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
        {logo ? (
          <Image src={logo} alt={shortName} width={36} height={36} className="h-9 w-9 object-contain" unoptimized />
        ) : (
          <span className={`text-xs font-black ${colorClass}`}>{shortName}</span>
        )}
      </div>
      <span className={`text-sm font-bold ${colorClass}`}>{shortName}</span>
    </div>
  );
}
