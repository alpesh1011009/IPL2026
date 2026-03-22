"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getPlayerImage } from "@/data/teams";
import {
  Trophy,
  MapPin,
  ChevronDown,
  ChevronUp,
  Crown,
  Star,
  Shield,
  Crosshair,
  Swords,
  User,
} from "lucide-react";
import type { Team, Player } from "@/data/teams";
import { TeamDownload } from "@/components/teams/team-download";

const roleConfig: Record<
  Player["role"],
  { icon: typeof User; badge: string; label: string }
> = {
  Batsman: { icon: Swords, badge: "bg-emerald-500/20 text-emerald-400 ring-emerald-500/30", label: "BAT" },
  Bowler: { icon: Crosshair, badge: "bg-red-500/20 text-red-400 ring-red-500/30", label: "BOWL" },
  "All-Rounder": { icon: Shield, badge: "bg-blue-500/20 text-blue-400 ring-blue-500/30", label: "AR" },
  "Wicket-Keeper": { icon: Star, badge: "bg-amber-500/20 text-amber-400 ring-amber-500/30", label: "WK" },
};

function PlayerRow({ player }: { player: Player }) {
  const config = roleConfig[player.role];
  const Icon = config.icon;
  const imageUrl = getPlayerImage(player);

  return (
    <div className="group flex items-center gap-3 rounded-xl px-3 py-2 transition-all hover:bg-white/[0.06]">
      {/* Player avatar */}
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/10 transition-all group-hover:ring-white/25">
        <Image
          src={imageUrl}
          alt={player.name}
          width={40}
          height={40}
          className="h-full w-full object-cover"
          unoptimized
        />
        {player.isCaptain && (
          <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500 ring-2 ring-card">
            <Crown className="h-2.5 w-2.5 text-black" />
          </div>
        )}
        {player.isIcon && !player.isCaptain && (
          <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500 ring-2 ring-card">
            <Star className="h-2.5 w-2.5 text-black fill-black" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-white truncate">
            {player.name}
          </span>
        </div>
        <span className="text-[11px] text-white/40">{player.country}</span>
      </div>

      {/* Role badge */}
      <span
        className={cn(
          "flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ring-1 shrink-0",
          config.badge
        )}
      >
        <Icon className="h-3 w-3" />
        {config.label}
      </span>
    </div>
  );
}

export function TeamCard({ team }: { team: Team }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-card transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1">
      {/* Gradient header */}
      <div className={cn("relative h-40 bg-gradient-to-br overflow-hidden", team.gradient)}>
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Glow effect */}
        <div className="absolute -bottom-12 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full bg-white/20 blur-3xl" />

        {/* Team short name watermark */}
        <div className="absolute -right-3 -top-6 text-[8rem] font-black leading-none text-white/[0.08] select-none tracking-tighter">
          {team.shortName}
        </div>

        {/* Team info */}
        <div className="relative z-10 flex h-full flex-col justify-end p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-white drop-shadow-lg leading-tight">
                {team.name}
              </h3>
              <div className="mt-1.5 flex items-center gap-3">
                <span className="flex items-center gap-1 text-xs text-white/70">
                  <MapPin className="h-3 w-3" />
                  {team.city}
                </span>
                {team.titles > 0 && (
                  <span className="flex items-center gap-1 rounded-full bg-yellow-400/20 px-2 py-0.5 text-[10px] font-bold text-yellow-300">
                    <Trophy className="h-3 w-3" />
                    {team.titles}x
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 divide-x divide-white/[0.06] border-b border-white/[0.06]">
        <div className="px-3 py-3 text-center">
          <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-medium">Founded</p>
          <p className="mt-0.5 text-sm font-bold text-white">{team.founded}</p>
        </div>
        <div className="px-3 py-3 text-center">
          <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-medium">Home</p>
          <p className="mt-0.5 text-[11px] font-semibold text-white/80 truncate" title={team.homeGround}>
            {team.homeGround}
          </p>
        </div>
        <div className="px-3 py-3 text-center">
          <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-medium">Coach</p>
          <p className="mt-0.5 text-[11px] font-semibold text-white/80 truncate">{team.coach}</p>
        </div>
      </div>

      {/* Key players */}
      <div className="p-3">
        <div className="mb-1.5 flex items-center justify-between px-1">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Key Players
          </h4>
          <div className="flex items-center gap-2 text-[9px] text-muted-foreground">
            <span className="flex items-center gap-0.5">
              <div className="h-3 w-3 rounded-full bg-yellow-500 flex items-center justify-center">
                <Crown className="h-2 w-2 text-black" />
              </div>
              Capt
            </span>
            <span className="flex items-center gap-0.5">
              <div className="h-3 w-3 rounded-full bg-yellow-500 flex items-center justify-center">
                <Star className="h-2 w-2 text-black fill-black" />
              </div>
              Icon
            </span>
          </div>
        </div>
        <div className="space-y-0.5">
          {team.players.slice(0, 4).map((player) => (
            <PlayerRow key={player.name} player={player} />
          ))}
        </div>
      </div>

      {/* Expandable full squad */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-500 ease-in-out",
          expanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="border-t border-white/[0.06] px-3 pb-3 pt-1">
          <h4 className="px-1 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Full Squad
          </h4>
          <div className="space-y-0.5">
            {team.players.slice(4).map((player) => (
              <PlayerRow key={player.name} player={player} />
            ))}
          </div>
        </div>
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "flex w-full items-center justify-center gap-1.5 border-t border-white/[0.06] py-3 text-xs font-semibold transition-all",
          expanded
            ? "text-white bg-white/[0.03]"
            : "text-muted-foreground hover:text-white hover:bg-white/[0.04]"
        )}
      >
        {expanded ? (
          <>
            Show Less <ChevronUp className="h-3.5 w-3.5" />
          </>
        ) : (
          <>
            View Full Squad ({team.players.length}){" "}
            <ChevronDown className="h-3.5 w-3.5" />
          </>
        )}
      </button>

      {/* Download team card */}
      <TeamDownload team={team} />
    </div>
  );
}
