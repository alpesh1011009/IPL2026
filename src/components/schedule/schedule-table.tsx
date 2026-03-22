"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CalendarDays, Clock, MapPin, Download, Search, Filter } from "lucide-react";
import type { Match } from "@/data/schedule";
import { teamLogoUrls } from "@/data/teams";

interface Props {
  matches: Match[];
  teamFullNames: Record<string, string>;
  teamTextColors: Record<string, string>;
  teamColors: Record<string, string>;
}

export function ScheduleTable({
  matches,
  teamFullNames,
  teamTextColors,
  teamColors,
}: Props) {
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const teams = ["ALL", ...Object.keys(teamFullNames)];

  const filtered = matches.filter((m) => {
    const matchesTeam =
      filter === "ALL" || m.team1 === filter || m.team2 === filter;
    const matchesSearch =
      search === "" ||
      m.venue.toLowerCase().includes(search.toLowerCase()) ||
      m.date.toLowerCase().includes(search.toLowerCase()) ||
      teamFullNames[m.team1]?.toLowerCase().includes(search.toLowerCase()) ||
      teamFullNames[m.team2]?.toLowerCase().includes(search.toLowerCase());
    return matchesTeam && matchesSearch;
  });

  // Group by date
  const grouped: Record<string, Match[]> = {};
  for (const match of filtered) {
    if (!grouped[match.date]) grouped[match.date] = [];
    grouped[match.date].push(match);
  }

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search team, venue, date..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Team filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="h-4 w-4 shrink-0 text-muted-foreground" />
          {teams.map((team) => (
            <button
              key={team}
              onClick={() => setFilter(team)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
                filter === team
                  ? "bg-primary text-primary-foreground"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
              )}
            >
              {team}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        Showing {filtered.length} of {matches.length} matches
      </p>

      {/* Schedule */}
      <div className="space-y-6">
        {Object.entries(grouped).map(([date, dateMatches]) => (
          <div key={date}>
            {/* Date header */}
            <div className="mb-3 flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-primary" />
                <span className="text-sm font-semibold text-white">{date}</span>
                <span className="text-xs text-muted-foreground">
                  {dateMatches[0].day}
                </span>
              </div>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            {/* Match cards */}
            <div className="space-y-3">
              {dateMatches.map((match) => (
                <div
                  key={match.matchNumber}
                  className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-card transition-all hover:border-white/20 hover:shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    {/* Match number */}
                    <div className="flex items-center gap-3 border-b border-white/5 px-4 py-2 sm:w-28 sm:border-b-0 sm:border-r sm:py-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Match
                      </span>
                      <span className="text-lg font-black text-white">
                        #{match.matchNumber}
                      </span>
                    </div>

                    {/* Teams */}
                    <div className="flex flex-1 items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
                      {/* Team 1 */}
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-white/5 p-1.5 ring-1 ring-white/10 flex items-center justify-center">
                          {teamLogoUrls[match.team1] ? (
                            <Image
                              src={teamLogoUrls[match.team1]!}
                              alt={match.team1}
                              width={28}
                              height={28}
                              className="h-full w-full object-contain saturate-125 brightness-110 logo-clip"
                              unoptimized
                            />
                          ) : (
                            <span className="text-[9px] font-black text-white/70">{match.team1}</span>
                          )}
                        </div>
                        <div>
                          <p className={cn("text-sm font-bold", teamTextColors[match.team1])}>
                            {match.team1}
                          </p>
                          <p className="hidden text-[10px] text-muted-foreground sm:block">
                            {teamFullNames[match.team1]}
                          </p>
                        </div>
                      </div>

                      {/* VS */}
                      <div className="mx-4 flex flex-col items-center">
                        <span className="text-xs font-black text-primary">VS</span>
                        <span className="flex items-center gap-1 mt-0.5 text-[10px] text-muted-foreground">
                          <Clock className="h-2.5 w-2.5" />
                          {match.time}
                        </span>
                      </div>

                      {/* Team 2 */}
                      <div className="flex items-center gap-3">
                        <div>
                          <p className={cn("text-sm font-bold text-right", teamTextColors[match.team2])}>
                            {match.team2}
                          </p>
                          <p className="hidden text-[10px] text-muted-foreground text-right sm:block">
                            {teamFullNames[match.team2]}
                          </p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-white/5 p-1.5 ring-1 ring-white/10 flex items-center justify-center">
                          {teamLogoUrls[match.team2] ? (
                            <Image
                              src={teamLogoUrls[match.team2]!}
                              alt={match.team2}
                              width={28}
                              height={28}
                              className="h-full w-full object-contain saturate-125 brightness-110 logo-clip"
                              unoptimized
                            />
                          ) : (
                            <span className="text-[9px] font-black text-white/70">{match.team2}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Venue & Action */}
                    <div className="flex items-center gap-3 border-t border-white/5 px-4 py-2 sm:w-auto sm:border-l sm:border-t-0 sm:py-4 sm:pr-4">
                      <div className="flex-1 sm:hidden">
                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <MapPin className="h-2.5 w-2.5" />
                          {match.venue}
                        </span>
                      </div>
                      <Link
                        href={`/poster?match=${match.matchNumber}`}
                        className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Create Poster</span>
                        <span className="sm:hidden">Poster</span>
                      </Link>
                    </div>
                  </div>

                  {/* Venue bar (desktop) */}
                  <div className="hidden border-t border-white/5 px-4 py-1.5 sm:block">
                    <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {match.venue}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
