"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useBusinessDetails } from "@/hooks/use-business-details";
import { teamLogoUrls, getPlayerImage } from "@/data/teams";
import type { Team, Player } from "@/data/teams";
import {
  Download,
  Loader2,
  Phone,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Building2,
  ImageIcon,
  X,
  Save,
  Trash2,
  Trophy,
  MapPin,
  Crown,
  Star,
} from "lucide-react";

const roleColors: Record<Player["role"], string> = {
  Batsman: "text-emerald-400",
  Bowler: "text-red-400",
  "All-Rounder": "text-blue-400",
  "Wicket-Keeper": "text-amber-400",
};

const roleLabels: Record<Player["role"], string> = {
  Batsman: "BAT",
  Bowler: "BOWL",
  "All-Rounder": "AR",
  "Wicket-Keeper": "WK",
};

export function TeamDownload({ team }: { team: Team }) {
  const posterRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { details, updateField, clearAll, loaded } = useBusinessDetails();

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeModal = useCallback(() => setShowModal(false), []);

  // Close on Escape key
  useEffect(() => {
    if (!showModal) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showModal, closeModal]);

  const handleDownload = async () => {
    if (!posterRef.current) return;
    setDownloading(true);
    try {
      const { default: html2canvas } = await import("html2canvas-pro");
      const canvas = await html2canvas(posterRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#09090b",
        windowWidth: 480,
      });
      const link = document.createElement("a");
      link.download = `Cricket-${team.shortName}-Squad${details.companyName ? `-${details.companyName.replace(/\s+/g, "-")}` : ""}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  const hasBusinessInfo =
    details.companyName || details.phone || details.website || details.instagram;

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex w-full items-center justify-center gap-1.5 border-t border-white/[0.06] py-3 text-xs font-semibold text-muted-foreground transition-all hover:text-white hover:bg-white/[0.04]"
      >
        <Download className="h-3.5 w-3.5" />
        Download Team Card
      </button>

      {mounted && showModal && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 backdrop-blur-sm p-4 pt-8"
          onMouseDown={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="relative w-full max-w-4xl rounded-2xl border border-white/10 bg-background shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <h2 className="text-lg font-bold">
                Download {team.name} Card with Your Branding
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-6 p-6 lg:grid-cols-[300px_1fr]">
              {/* Business form */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <Building2 className="h-3.5 w-3.5" /> Business Details
                  </h3>
                  <span className="flex items-center gap-1 text-[9px] text-emerald-400">
                    <Save className="h-2.5 w-2.5" /> Auto-saved
                  </span>
                </div>

                <input
                  type="text"
                  placeholder="Company Name"
                  value={details.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone: +91 98765 43210"
                  value={details.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none"
                />
                <input
                  type="url"
                  placeholder="Website"
                  value={details.website}
                  onChange={(e) => updateField("website", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Instagram @"
                    value={details.instagram}
                    onChange={(e) => updateField("instagram", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Facebook @"
                    value={details.facebook}
                    onChange={(e) => updateField("facebook", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Twitter / X @"
                  value={details.twitter}
                  onChange={(e) => updateField("twitter", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none"
                />

                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/20 bg-white/5 px-3 py-2.5 text-xs text-white/50 hover:border-primary/50">
                  <ImageIcon className="h-3.5 w-3.5" />
                  {details.logoUrl ? "Logo uploaded ✓" : "Upload logo"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () =>
                          updateField("logoUrl", reader.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                </label>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleDownload}
                    disabled={downloading || !loaded}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                  >
                    {downloading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />{" "}
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" /> Download
                      </>
                    )}
                  </button>
                  {hasBusinessInfo && (
                    <button
                      onClick={clearAll}
                      className="rounded-xl bg-red-500/10 px-3 py-2.5 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Poster preview */}
              <div className="max-h-[70vh] overflow-y-auto rounded-xl border border-white/10">
                <div
                  ref={posterRef}
                  className="bg-[#09090b]"
                  style={{ width: "440px" }}
                >
                  {/* Team header */}
                  <div
                    className={cn(
                      "relative overflow-hidden bg-gradient-to-br p-5",
                      team.gradient
                    )}
                  >
                    <div
                      className="absolute inset-0 opacity-[0.08]"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)",
                        backgroundSize: "18px 18px",
                      }}
                    />
                    <div className="absolute -right-2 -top-4 text-[6rem] font-black leading-none text-white/[0.07] select-none tracking-tighter">
                      {team.shortName}
                    </div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/60">
                          Cricket 2026
                        </p>
                        <h2 className="mt-0.5 text-xl font-black text-white leading-tight">
                          {team.name}
                        </h2>
                        <div className="mt-2 flex items-center gap-3">
                          <span className="flex items-center gap-1 text-[10px] text-white/70">
                            <MapPin className="h-3 w-3" />
                            {team.city}
                          </span>
                          {team.titles > 0 && (
                            <span className="flex items-center gap-1 rounded-full bg-yellow-400/20 px-2 py-0.5 text-[9px] font-bold text-yellow-300">
                              <Trophy className="h-2.5 w-2.5" />
                              {team.titles}x Champion
                            </span>
                          )}
                        </div>
                      </div>
                      {teamLogoUrls[team.shortName] && (
                        <Image
                          src={teamLogoUrls[team.shortName]!}
                          alt={team.shortName}
                          width={56}
                          height={56}
                          className="h-14 w-14 object-contain saturate-125 brightness-110 drop-shadow-lg logo-clip"
                          unoptimized
                        />
                      )}
                    </div>
                  </div>

                  {/* Team stats */}
                  <div className="grid grid-cols-3 divide-x divide-white/[0.06] border-b border-white/[0.06]">
                    <div className="px-3 py-2.5 text-center">
                      <p className="text-[8px] uppercase tracking-widest text-white/40 font-medium">
                        Home Ground
                      </p>
                      <p
                        className="mt-0.5 text-[10px] font-semibold text-white/80 truncate"
                        title={team.homeGround}
                      >
                        {team.homeGround}
                      </p>
                    </div>
                    <div className="px-3 py-2.5 text-center">
                      <p className="text-[8px] uppercase tracking-widest text-white/40 font-medium">
                        Coach
                      </p>
                      <p className="mt-0.5 text-[10px] font-semibold text-white/80 truncate">
                        {team.coach}
                      </p>
                    </div>
                    <div className="px-3 py-2.5 text-center">
                      <p className="text-[8px] uppercase tracking-widest text-white/40 font-medium">
                        Founded
                      </p>
                      <p className="mt-0.5 text-[10px] font-bold text-white">
                        {team.founded}
                      </p>
                    </div>
                  </div>

                  {/* Squad */}
                  <div className="p-3">
                    <p className="mb-2 px-1 text-[9px] font-bold uppercase tracking-widest text-white/40">
                      Full Squad ({team.players.length} players)
                    </p>
                    <div className="space-y-0.5">
                      {team.players.map((player) => (
                        <div
                          key={player.name}
                          className="flex items-center gap-2.5 rounded-lg bg-white/[0.03] px-2.5 py-1.5"
                        >
                          <img
                            src={getPlayerImage(player)}
                            alt={player.name}
                            width={28}
                            height={28}
                            className="h-7 w-7 rounded-full object-cover ring-1 ring-white/10 saturate-110 brightness-105"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1">
                              <span className="text-[11px] font-semibold text-white truncate">
                                {player.name}
                              </span>
                              {player.isCaptain && (
                                <Crown className="h-3 w-3 shrink-0 text-yellow-400 fill-yellow-400" />
                              )}
                              {player.isIcon && !player.isCaptain && (
                                <Star className="h-3 w-3 shrink-0 text-yellow-400 fill-yellow-400" />
                              )}
                            </div>
                            <span className="text-[9px] text-white/40">
                              {player.country}
                            </span>
                          </div>
                          <span
                            className={cn(
                              "text-[8px] font-bold shrink-0",
                              roleColors[player.role]
                            )}
                          >
                            {roleLabels[player.role]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Business footer */}
                  {hasBusinessInfo && (
                    <div className="mx-3 mb-3 rounded-xl border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-3">
                      <div className="flex items-center gap-3">
                        {details.logoUrl && (
                          <img
                            src={details.logoUrl}
                            alt="Logo"
                            className="h-8 w-8 rounded-lg object-contain bg-white/10 p-0.5"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          {details.companyName && (
                            <p className="text-xs font-bold text-white">
                              {details.companyName}
                            </p>
                          )}
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5">
                            {details.phone && (
                              <span className="flex items-center gap-1 text-[8px] text-white/60">
                                <Phone className="h-2 w-2" /> {details.phone}
                              </span>
                            )}
                            {details.website && (
                              <span className="flex items-center gap-1 text-[8px] text-white/60">
                                <Globe className="h-2 w-2" /> {details.website}
                              </span>
                            )}
                            {details.instagram && (
                              <span className="flex items-center gap-0.5 text-[8px] text-pink-400">
                                <Instagram className="h-2 w-2" />{" "}
                                {details.instagram}
                              </span>
                            )}
                            {details.facebook && (
                              <span className="flex items-center gap-0.5 text-[8px] text-blue-400">
                                <Facebook className="h-2 w-2" />{" "}
                                {details.facebook}
                              </span>
                            )}
                            {details.twitter && (
                              <span className="flex items-center gap-0.5 text-[8px] text-white/60">
                                <Twitter className="h-2 w-2" />{" "}
                                {details.twitter}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <p className="pb-2 text-center text-[7px] text-white/15">
                    Made with cricpost.in
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
