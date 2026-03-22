"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TrendingUp, CheckCircle2 } from "lucide-react";
import { iplSchedule, teamTextColors, teamFullNames } from "@/data/schedule";
import { teamLogoUrls } from "@/data/teams";

// Seeded "house" vote counts so results never look empty on first visit
const SEED: Record<string, { t1: number; t2: number }> = {
  "1":  { t1: 312, t2: 287 }, "2":  { t1: 198, t2: 223 }, "3":  { t1: 176, t2: 241 },
  "4":  { t1: 205, t2: 189 }, "5":  { t1: 167, t2: 210 }, "6":  { t1: 230, t2: 195 },
  "7":  { t1: 188, t2: 154 }, "8":  { t1: 143, t2: 176 }, "9":  { t1: 260, t2: 222 },
  "10": { t1: 134, t2: 168 }, "11": { t1: 298, t2: 271 }, "12": { t1: 185, t2: 207 },
};

const VOTE_KEY = (n: number) => `cricpost_pred_vote_${n}`;
const COUNT_KEY = (n: number) => `cricpost_pred_counts_${n}`;

interface Counts { t1: number; t2: number }

function getSeededCounts(matchNumber: number): Counts {
  return SEED[String(matchNumber)] ?? { t1: 100, t2: 100 };
}

function loadVote(n: number): "t1" | "t2" | null {
  try { return (localStorage.getItem(VOTE_KEY(n)) as "t1" | "t2" | null); } catch { return null; }
}

function loadCounts(n: number): Counts {
  try {
    const raw = localStorage.getItem(COUNT_KEY(n));
    return raw ? JSON.parse(raw) : getSeededCounts(n);
  } catch { return getSeededCounts(n); }
}

function saveCounts(n: number, counts: Counts) {
  try { localStorage.setItem(COUNT_KEY(n), JSON.stringify(counts)); } catch {}
}

function saveVote(n: number, vote: "t1" | "t2") {
  try { localStorage.setItem(VOTE_KEY(n), vote); } catch {}
}

function pct(a: number, b: number) {
  const total = a + b;
  return total === 0 ? 50 : Math.round((a / total) * 100);
}

function parseMatchDate(dateStr: string, timeStr: string): Date {
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

function getUpcomingMatches(count = 3) {
  const now = new Date();
  const upcoming = iplSchedule.filter((m) => parseMatchDate(m.date, m.time) > now);
  return upcoming.length > 0 ? upcoming.slice(0, count) : iplSchedule.slice(0, count);
}

interface PollCardProps {
  matchNumber: number;
  team1: string;
  team2: string;
  date: string;
}

function PollCard({ matchNumber, team1, team2, date }: PollCardProps) {
  const [vote, setVote] = useState<"t1" | "t2" | null>(null);
  const [counts, setCounts] = useState<Counts>(() => getSeededCounts(matchNumber));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setVote(loadVote(matchNumber));
    setCounts(loadCounts(matchNumber));
  }, [matchNumber]);

  function handleVote(side: "t1" | "t2") {
    if (vote) return; // already voted
    const updated = { ...counts, [side]: counts[side] + 1 };
    setCounts(updated);
    setVote(side);
    saveCounts(matchNumber, updated);
    saveVote(matchNumber, side);
  }

  const t1Pct = pct(counts.t1, counts.t2);
  const t2Pct = 100 - t1Pct;
  const total = counts.t1 + counts.t2;
  const hasVoted = vote !== null;

  if (!mounted) {
    // Skeleton to prevent layout shift
    return (
      <div className="rounded-xl border border-white/[0.08] bg-card p-4 animate-pulse">
        <div className="h-4 w-24 rounded bg-white/10 mb-3" />
        <div className="h-8 w-full rounded bg-white/10" />
      </div>
    );
  }

  const t1color = teamTextColors[team1] ?? "text-white";
  const t2color = teamTextColors[team2] ?? "text-white";
  const logo1 = teamLogoUrls[team1];
  const logo2 = teamLogoUrls[team2];

  return (
    <div className="rounded-xl border border-white/[0.08] bg-card p-4 flex flex-col gap-3">
      {/* Match label */}
      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
        <span>Match #{matchNumber}</span>
        <span>{date}</span>
      </div>

      {/* Teams row */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => handleVote("t1")}
          disabled={hasVoted}
          className={`flex flex-1 flex-col items-center gap-1.5 rounded-xl border py-3 transition-all
            ${hasVoted
              ? vote === "t1"
                ? "border-primary/50 bg-primary/10"
                : "border-white/5 bg-white/[0.02] opacity-60"
              : "border-white/10 bg-white/5 hover:border-primary/40 hover:bg-primary/5 cursor-pointer"
            }`}
        >
          {logo1 ? (
            <Image src={logo1} alt={team1} width={32} height={32} className="h-8 w-8 object-contain saturate-125 brightness-110 drop-shadow-md logo-clip" unoptimized />
          ) : (
            <span className={`text-xs font-black ${t1color}`}>{team1}</span>
          )}
          <span className={`text-xs font-bold ${t1color}`}>{team1}</span>
          {hasVoted && vote === "t1" && (
            <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
          )}
        </button>

        <span className="text-xs font-black text-white/30">VS</span>

        <button
          onClick={() => handleVote("t2")}
          disabled={hasVoted}
          className={`flex flex-1 flex-col items-center gap-1.5 rounded-xl border py-3 transition-all
            ${hasVoted
              ? vote === "t2"
                ? "border-primary/50 bg-primary/10"
                : "border-white/5 bg-white/[0.02] opacity-60"
              : "border-white/10 bg-white/5 hover:border-primary/40 hover:bg-primary/5 cursor-pointer"
            }`}
        >
          {logo2 ? (
            <Image src={logo2} alt={team2} width={32} height={32} className="h-8 w-8 object-contain saturate-125 brightness-110 drop-shadow-md logo-clip" unoptimized />
          ) : (
            <span className={`text-xs font-black ${t2color}`}>{team2}</span>
          )}
          <span className={`text-xs font-bold ${t2color}`}>{team2}</span>
          {hasVoted && vote === "t2" && (
            <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
          )}
        </button>
      </div>

      {/* Progress bar — shown only after voting */}
      {hasVoted && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-semibold">
            <span className={t1color}>{t1Pct}%</span>
            <span className="text-muted-foreground">{total.toLocaleString()} votes</span>
            <span className={t2color}>{t2Pct}%</span>
          </div>
          <div className="flex h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-l-full bg-primary transition-all duration-700"
              style={{ width: `${t1Pct}%` }}
            />
            <div
              className="h-full flex-1 rounded-r-full bg-white/20 transition-all duration-700"
            />
          </div>
          <div className="flex justify-between text-[9px] text-muted-foreground">
            <span>{teamFullNames[team1] ?? team1}</span>
            <span>{teamFullNames[team2] ?? team2}</span>
          </div>
        </div>
      )}

      {!hasVoted && (
        <p className="text-center text-[10px] text-muted-foreground">Tap a team to predict the winner</p>
      )}
    </div>
  );
}

export function MatchPrediction() {
  const matches = getUpcomingMatches(3);

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-primary" />
        <h2 className="text-lg font-bold text-white">
          Match <span className="text-primary">Predictions</span>
        </h2>
        <span className="ml-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary">
          Fan Poll
        </span>
      </div>
      <p className="mb-4 text-xs text-muted-foreground">
        Pick who you think will win — see what other fans predict.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {matches.map((m) => (
          <PollCard
            key={m.matchNumber}
            matchNumber={m.matchNumber}
            team1={m.team1}
            team2={m.team2}
            date={m.date}
          />
        ))}
      </div>
    </div>
  );
}
