"use client";

import React, { useRef, useState, useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useBusinessDetails } from "@/hooks/use-business-details";
import { iplTeams, teamLogoUrls, getPlayerImage } from "@/data/teams";
import {
  Download,
  Loader2,
  Users,
  User,
  Heart,
  Type,
  ImageIcon,
  Check,
  Phone,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  X,
} from "lucide-react";

const teamGradients: Record<string, string> = {
  CSK: "from-yellow-500 to-yellow-700",
  MI: "from-blue-600 to-blue-900",
  RCB: "from-red-600 to-red-900",
  KKR: "from-purple-600 to-purple-950",
  DC: "from-blue-500 to-red-600",
  PBKS: "from-red-500 to-red-800",
  RR: "from-pink-500 to-blue-700",
  SRH: "from-orange-400 to-orange-700",
  GT: "from-cyan-700 to-slate-900",
  LSG: "from-cyan-500 to-teal-800",
};

type Mode = "team" | "player";
type SectionId = "subject" | "text" | "photo";

const formSections: { id: SectionId; label: string; icon: React.ElementType }[] = [
  { id: "subject", label: "Pick", icon: Users },
  { id: "text", label: "Text", icon: Type },
  { id: "photo", label: "Photo", icon: ImageIcon },
];

export function OwnPosterBuilder() {
  const posterRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("subject");
  const { details, loaded } = useBusinessDetails();

  // Poster state
  const [mode, setMode] = useState<Mode>("team");
  const [selectedTeam, setSelectedTeam] = useState<string>("CSK");
  const [selectedPlayerName, setSelectedPlayerName] = useState<string>("");
  const [headline, setHeadline] = useState("");
  const [subtext, setSubtext] = useState("");
  const [userPhotoUrl, setUserPhotoUrl] = useState("");

  const teamData = useMemo(
    () => iplTeams.find((t) => t.shortName === selectedTeam),
    [selectedTeam]
  );
  const teamPlayers = useMemo(() => teamData?.players ?? [], [teamData]);
  const selectedPlayer = useMemo(
    () => teamPlayers.find((p) => p.name === selectedPlayerName),
    [teamPlayers, selectedPlayerName]
  );

  function handleTeamSelect(shortName: string) {
    setSelectedTeam(shortName);
    setSelectedPlayerName("");
  }

  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUserPhotoUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  async function handleDownload() {
    if (!posterRef.current) return;
    setDownloading(true);
    try {
      const { default: html2canvas } = await import("html2canvas-pro");
      const canvas = await html2canvas(posterRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });
      const link = document.createElement("a");
      const subject =
        mode === "player" && selectedPlayer
          ? selectedPlayer.name
          : selectedTeam;
      link.download = `CricPro-Support-${subject.replace(/\s+/g, "-")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(false);
    }
  }

  const gradient = teamGradients[selectedTeam] || "from-gray-600 to-gray-800";
  const hasBusinessInfo =
    details.companyName ||
    details.phone ||
    details.website ||
    details.instagram ||
    details.facebook ||
    details.twitter;

  const sectionDone: Record<SectionId, boolean> = {
    subject: true,
    text: !!(headline || subtext),
    photo: !!userPhotoUrl,
  };

  const defaultHeadline =
    mode === "team"
      ? `WE SUPPORT ${selectedTeam}!`
      : selectedPlayer
      ? `GO ${selectedPlayer.name.split(" ").pop()?.toUpperCase()}!`
      : "GO TEAM!";

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* ── Form ── */}
      <div className="rounded-2xl border border-white/10 bg-card overflow-hidden">
        {/* Section nav bar */}
        <div className="border-b border-white/10 bg-white/[0.02]">
          <div className="flex">
            {formSections.map((section, idx) => {
              const isActive = activeSection === section.id;
              const isDone = sectionDone[section.id];
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "relative flex flex-1 flex-col items-center gap-1 px-2 py-3 text-[10px] font-semibold uppercase tracking-wider transition-all",
                    isActive
                      ? "text-primary bg-primary/10"
                      : isDone && section.id !== "subject"
                      ? "text-emerald-400 hover:text-white hover:bg-white/5"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  )}
                >
                  <div className="relative">
                    <Icon className="h-4 w-4" />
                    {isDone && !isActive && section.id !== "subject" && (
                      <span className="absolute -right-1.5 -top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500">
                        <Check className="h-2 w-2 text-white" />
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:block">{section.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                  {idx < formSections.length - 1 && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-white/10 text-xs">
                      |
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* ── Subject Section ── */}
          {activeSection === "subject" && (
            <div className="space-y-4">
              {/* Mode toggle */}
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  I want to support a…
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {(["team", "player"] as Mode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-bold capitalize transition-all",
                        mode === m
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-white"
                      )}
                    >
                      {m === "team" ? (
                        <Users className="h-4 w-4" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Team grid */}
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  Choose Team
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {iplTeams.map((team) => (
                    <button
                      key={team.shortName}
                      onClick={() => handleTeamSelect(team.shortName)}
                      className={cn(
                        "flex flex-col items-center gap-1 rounded-xl border p-2 transition-all",
                        selectedTeam === team.shortName
                          ? "border-primary bg-primary/10"
                          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.08]"
                      )}
                    >
                      {teamLogoUrls[team.shortName] ? (
                        <Image
                          src={teamLogoUrls[team.shortName]!}
                          alt={team.shortName}
                          width={32}
                          height={32}
                          className="h-8 w-8 object-contain"
                          unoptimized
                        />
                      ) : (
                        <span
                          className="text-[10px] font-black"
                          style={{ color: team.primaryColor }}
                        >
                          {team.shortName}
                        </span>
                      )}
                      <span className="text-[9px] font-semibold text-white/50">
                        {team.shortName}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Player picker — only in player mode */}
              {mode === "player" && (
                <div>
                  <p className="mb-2 text-xs font-medium text-muted-foreground">
                    Choose Player
                  </p>
                  <select
                    value={selectedPlayerName}
                    onChange={(e) => setSelectedPlayerName(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="" className="bg-[#111113]">
                      — Select a player —
                    </option>
                    {teamPlayers.map((p) => (
                      <option key={p.name} value={p.name} className="bg-[#111113]">
                        {p.name}
                        {p.isCaptain ? " (C)" : ""}
                        {p.isIcon ? " ★" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={() => setActiveSection("text")}
                className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-lg border border-primary/30 py-2 text-xs font-semibold text-primary hover:bg-primary/10 transition-colors"
              >
                Next: Add Your Text →
              </button>
            </div>
          )}

          {/* ── Text Section ── */}
          {activeSection === "text" && (
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  Headline *
                </label>
                <input
                  type="text"
                  placeholder={defaultHeadline}
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  maxLength={40}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <p className="mt-0.5 text-right text-[10px] text-white/30">
                  {headline.length}/40
                </p>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  Sub-text
                </label>
                <input
                  type="text"
                  placeholder={
                    mode === "team"
                      ? "Yellow Army Forever!"
                      : "Our hero, our champion!"
                  }
                  value={subtext}
                  onChange={(e) => setSubtext(e.target.value)}
                  maxLength={60}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <p className="mt-0.5 text-right text-[10px] text-white/30">
                  {subtext.length}/60
                </p>
              </div>
              <button
                onClick={() => setActiveSection("photo")}
                className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-lg border border-primary/30 py-2 text-xs font-semibold text-primary hover:bg-primary/10 transition-colors"
              >
                Next: Add Your Photo →
              </button>
            </div>
          )}

          {/* ── Photo Section ── */}
          {activeSection === "photo" && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">
                Add your photo to appear on the poster — optional but makes it
                personal!
              </p>
              <label className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-white/20 bg-white/5 px-4 py-8 text-center transition-colors hover:border-primary/50 hover:bg-primary/5">
                {userPhotoUrl ? (
                  <>
                    <img
                      src={userPhotoUrl}
                      alt="Your photo"
                      className="h-20 w-20 rounded-full object-cover ring-2 ring-primary/50"
                    />
                    <span className="text-xs text-white/60">
                      Click to change photo
                    </span>
                  </>
                ) : (
                  <>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Upload Your Photo
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        PNG, JPG — appears as a circular cutout on the poster
                      </p>
                    </div>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              {userPhotoUrl && (
                <button
                  onClick={() => setUserPhotoUrl("")}
                  className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300"
                >
                  <X className="h-3 w-3" /> Remove photo
                </button>
              )}
            </div>
          )}

          {/* Download button — always visible */}
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
          >
            {downloading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Generating…
              </>
            ) : (
              <>
                <Download className="h-4 w-4" /> Download Poster
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Poster Preview ── */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs font-medium text-muted-foreground">Live Preview</p>

        <div
          ref={posterRef}
          className={cn(
            "w-full max-w-[380px] overflow-hidden rounded-2xl bg-gradient-to-br",
            gradient
          )}
        >
          {/* Dot-grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 0.6px, transparent 0)",
              backgroundSize: "18px 18px",
            }}
          />

          {/* IPL badge */}
          <div className="relative px-5 pt-5 pb-1 text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/50">
              Cricket 2026
            </p>
          </div>

          {/* Main content */}
          <div className="relative flex flex-col items-center px-6 pb-6 pt-3">
            {/* User photo */}
            {userPhotoUrl && (
              <div className="mb-3 h-16 w-16 overflow-hidden rounded-full ring-2 ring-white/40 shadow-lg">
                <img
                  src={userPhotoUrl}
                  alt="Fan"
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            {/* Subject image — team logo or player headshot */}
            <div
              className={cn(
                "flex items-center justify-center overflow-hidden rounded-full bg-white/10 ring-4 ring-white/20 shadow-2xl",
                mode === "player" && selectedPlayer
                  ? "h-28 w-28"
                  : "h-32 w-32"
              )}
            >
              {mode === "player" && selectedPlayer ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={getPlayerImage(selectedPlayer)}
                  alt={selectedPlayer.name}
                  className="h-full w-full object-cover object-top"
                />
              ) : teamLogoUrls[selectedTeam] ? (
                <Image
                  src={teamLogoUrls[selectedTeam]!}
                  alt={selectedTeam}
                  width={88}
                  height={88}
                  className="h-20 w-20 object-contain drop-shadow-2xl"
                  unoptimized
                />
              ) : (
                <span className="text-2xl font-black text-white">
                  {selectedTeam}
                </span>
              )}
            </div>

            {/* Subject name */}
            <div className="mt-3 text-center">
              {mode === "player" && selectedPlayer ? (
                <>
                  <p className="text-xl font-black text-white drop-shadow-lg">
                    {selectedPlayer.name}
                  </p>
                  <span className="mt-1 inline-block rounded-full bg-white/20 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white/80">
                    {selectedPlayer.role}
                  </span>
                </>
              ) : (
                <p className="text-lg font-black text-white drop-shadow-lg">
                  {teamData?.name ?? selectedTeam}
                </p>
              )}
            </div>

            {/* Custom text */}
            <div className="mt-5 text-center">
              <p className="text-2xl font-extrabold leading-tight text-white drop-shadow-lg">
                {headline || defaultHeadline}
              </p>
              {subtext && (
                <p className="mt-1.5 text-sm font-medium text-white/75">
                  {subtext}
                </p>
              )}
            </div>

            {/* Heart row */}
            <div className="mt-4 flex items-center gap-2">
              <Heart className="h-4 w-4 fill-red-400 text-red-400" />
              <span className="text-xs font-bold text-white/50">Cricket 2026</span>
              <Heart className="h-4 w-4 fill-red-400 text-red-400" />
            </div>

            {/* Team mini-badge in player mode */}
            {mode === "player" && teamLogoUrls[selectedTeam] && (
              <div className="mt-3 flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1">
                <Image
                  src={teamLogoUrls[selectedTeam]!}
                  alt={selectedTeam}
                  width={14}
                  height={14}
                  className="h-3.5 w-3.5 object-contain"
                  unoptimized
                />
                <span className="text-[10px] font-bold text-white/70">
                  {selectedTeam}
                </span>
              </div>
            )}
          </div>

          {/* Business footer */}
          {hasBusinessInfo && (
            <div className="border-t border-white/20 bg-black/30 px-4 py-3">
              <div className="flex items-center gap-3">
                {details.logoUrl && (
                  <img
                    src={details.logoUrl}
                    alt="Logo"
                    className="h-9 w-9 rounded-lg object-contain bg-white/10 p-0.5"
                  />
                )}
                <div className="flex-1 min-w-0">
                  {details.companyName && (
                    <p className="text-xs font-bold text-white truncate">
                      {details.companyName}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5">
                    {details.phone && (
                      <span className="flex items-center gap-1 text-[9px] text-white/60">
                        <Phone className="h-2.5 w-2.5" /> {details.phone}
                      </span>
                    )}
                    {details.website && (
                      <span className="flex items-center gap-1 text-[9px] text-white/60">
                        <Globe className="h-2.5 w-2.5" /> {details.website}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2.5 mt-1">
                    {details.instagram && (
                      <span className="flex items-center gap-0.5 text-[9px] text-pink-300">
                        <Instagram className="h-2.5 w-2.5" />{" "}
                        {details.instagram}
                      </span>
                    )}
                    {details.facebook && (
                      <span className="flex items-center gap-0.5 text-[9px] text-blue-300">
                        <Facebook className="h-2.5 w-2.5" /> {details.facebook}
                      </span>
                    )}
                    {details.twitter && (
                      <span className="flex items-center gap-0.5 text-[9px] text-white/60">
                        <Twitter className="h-2.5 w-2.5" /> {details.twitter}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Made-with branding */}
          <div className="bg-black/20 px-4 py-1.5 text-center">
            <p className="text-[8px] text-white/30">Made with CricPro</p>
          </div>
        </div>
      </div>
    </div>
  );
}
