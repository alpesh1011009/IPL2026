"use client";

import { useMemo, useState } from "react";
import {
  Search,
  X,
  Building2,
  ChevronDown,
  ImageIcon,
  Trash2,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { iplTeams, teamLogoUrls } from "@/data/teams";
import type { Player } from "@/data/teams";
import { useBusinessDetails } from "@/hooks/use-business-details";
import { PlayerCard } from "./player-card";

const ROLES: Array<Player["role"] | "All"> = [
  "All",
  "Batsman",
  "Bowler",
  "All-Rounder",
  "Wicket-Keeper",
];

export function PlayersGrid() {
  const [teamId, setTeamId] = useState("all");
  const [role, setRole] = useState<Player["role"] | "All">("All");
  const [search, setSearch] = useState("");
  const [showBusinessForm, setShowBusinessForm] = useState(false);

  const { details, updateField, clearAll, loaded } = useBusinessDetails();

  const hasBusinessInfo = !!(
    details.companyName ||
    details.phone ||
    details.website ||
    details.instagram ||
    details.facebook ||
    details.twitter
  );

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateField("logoUrl", reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const roleCounts = useMemo(() => {
    const teams =
      teamId === "all" ? iplTeams : iplTeams.filter((t) => t.id === teamId);
    const all = teams.flatMap((t) => t.players);
    return {
      All: all.length,
      Batsman: all.filter((p) => p.role === "Batsman").length,
      Bowler: all.filter((p) => p.role === "Bowler").length,
      "All-Rounder": all.filter((p) => p.role === "All-Rounder").length,
      "Wicket-Keeper": all.filter((p) => p.role === "Wicket-Keeper").length,
    };
  }, [teamId]);

  const cards = useMemo(() => {
    const q = search.trim().toLowerCase();
    return iplTeams
      .filter((t) => teamId === "all" || t.id === teamId)
      .flatMap((t) =>
        t.players
          .filter((p) => role === "All" || p.role === role)
          .filter((p) => !q || p.name.toLowerCase().includes(q))
          .map((p) => ({ player: p, team: t, key: `${t.id}-${p.name}` }))
      );
  }, [teamId, role, search]);

  return (
    <div>
      {/* Search */}
      <div className="mb-5">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by player name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-10 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Business Details Collapsible */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-card">
        <button
          onClick={() => setShowBusinessForm(!showBusinessForm)}
          className="flex w-full items-center justify-between px-5 py-3.5 transition-colors hover:bg-white/[0.03]"
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-white">
            <Building2 className="h-4 w-4 text-primary" />
            Card Footer — Business Details
            {hasBusinessInfo && loaded && (
              <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-400">
                <Save className="h-3 w-3" />
                Saved
              </span>
            )}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              showBusinessForm && "rotate-180"
            )}
          />
        </button>

        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            showBusinessForm ? "max-h-[600px]" : "max-h-0"
          )}
        >
          <div className="space-y-3 border-t border-white/10 px-5 pb-5 pt-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                These details appear at the bottom of every downloaded card.
              </p>
              {hasBusinessInfo && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1 rounded-md bg-red-500/10 px-2 py-1 text-[10px] font-medium text-red-400 hover:bg-red-500/20"
                >
                  <Trash2 className="h-3 w-3" /> Clear
                </button>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  Company / Brand Name
                </label>
                <input
                  type="text"
                  placeholder="Your Business Name"
                  value={details.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={details.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                Website
              </label>
              <input
                type="text"
                placeholder="www.yourbusiness.com"
                value={details.website}
                onChange={(e) => updateField("website", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  Instagram
                </label>
                <input
                  type="text"
                  placeholder="@handle"
                  value={details.instagram}
                  onChange={(e) => updateField("instagram", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  Facebook
                </label>
                <input
                  type="text"
                  placeholder="@page"
                  value={details.facebook}
                  onChange={(e) => updateField("facebook", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  Twitter / X
                </label>
                <input
                  type="text"
                  placeholder="@handle"
                  value={details.twitter}
                  onChange={(e) => updateField("twitter", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                Company Logo
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/20 bg-white/5 px-3 py-3 text-sm text-white/50 transition-colors hover:border-primary/50 hover:text-white/70">
                <ImageIcon className="h-4 w-4" />
                {details.logoUrl
                  ? "Logo uploaded — click to change"
                  : "Upload logo (PNG / JPG)"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
              {details.logoUrl && (
                <button
                  onClick={() => updateField("logoUrl", "")}
                  className="mt-1 flex items-center gap-1 text-xs text-red-400 hover:text-red-300"
                >
                  <X className="h-3 w-3" /> Remove logo
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Team Filter */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setTeamId("all")}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
            teamId === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
          }`}
        >
          All Teams
        </button>
        {iplTeams.map((team) => (
          <button
            key={team.id}
            onClick={() => setTeamId(team.id)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
              teamId === team.id
                ? "text-white shadow-lg"
                : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
            }`}
            style={
              teamId === team.id ? { backgroundColor: team.primaryColor } : {}
            }
          >
            {teamLogoUrls[team.shortName] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={teamLogoUrls[team.shortName]!}
                alt={team.shortName}
                className="h-4 w-4 object-contain"
              />
            )}
            {team.shortName}
          </button>
        ))}
      </div>

      {/* Role Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {ROLES.map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
              role === r
                ? "bg-white/15 text-white ring-1 ring-white/20"
                : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
            }`}
          >
            {r === "All" ? "All Roles" : r}
            <span className="ml-1.5 text-[10px] opacity-50">
              {roleCounts[r]}
            </span>
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="mb-6 text-xs text-muted-foreground">
        Showing{" "}
        <span className="font-semibold text-white">{cards.length}</span>{" "}
        player{cards.length !== 1 ? "s" : ""}
        {search && (
          <span className="ml-1">
            for{" "}
            <span className="font-semibold text-primary">&ldquo;{search}&rdquo;</span>
          </span>
        )}
      </p>

      {/* Grid */}
      {cards.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cards.map(({ player, team, key }) => (
            <div key={key} className="flex justify-center">
              <PlayerCard
                player={player}
                team={team}
                businessDetails={loaded ? details : undefined}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-lg font-semibold text-white/40">No players found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different name, team, or role filter
          </p>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="mt-3 text-xs text-primary hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
}
