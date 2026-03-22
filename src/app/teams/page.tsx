import type { Metadata } from "next";
import { iplTeams } from "@/data/teams";
import { TeamCard } from "@/components/teams/team-card";
import { Trophy, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Cricket Teams & Squads | CricPro",
  description:
    "Explore all cricket teams with full squad details, player roles, and team information.",
};

export default function TeamsPage() {
  const totalPlayers = iplTeams.reduce((sum, t) => sum + t.players.length, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      {/* Page header */}
      <div className="mb-10 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
          <Trophy className="h-3.5 w-3.5" />
          Cricket 2026
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          All Teams &{" "}
          <span className="bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
            Squads
          </span>
        </h1>
        <p className="mt-3 text-muted-foreground sm:text-lg">
          {iplTeams.length} franchises &bull; {totalPlayers} players &bull; One
          champion
        </p>

        {/* Stats row */}
        <div className="mt-6 inline-flex items-center gap-6 rounded-xl border border-white/10 bg-white/5 px-6 py-3">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{iplTeams.length}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Teams
            </p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{totalPlayers}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Players
            </p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">
              {iplTeams.reduce((sum, t) => sum + t.titles, 0)}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Total Titles
            </p>
          </div>
        </div>
      </div>

      {/* Team grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {iplTeams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4 rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-xs text-muted-foreground">
        <span className="font-semibold text-white">Role Legend:</span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" /> Batsman
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-red-400" /> Bowler
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-blue-400" /> All-Rounder
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-amber-400" /> Wicket-Keeper
        </span>
      </div>
    </div>
  );
}
