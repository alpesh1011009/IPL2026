"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useBusinessDetails } from "@/hooks/use-business-details";
import type { Match } from "@/data/schedule";
import {
  Download,
  Phone,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Building2,
  ImageIcon,
  Loader2,
  X,
  Check,
  Trash2,
  Save,
} from "lucide-react";

const teamLogos: Record<string, string> = {
  CSK: "https://documents.iplt20.com/ipl/CSK/Logos/Logooutline/CSKoutline.png",
  MI: "https://documents.iplt20.com/ipl/MI/Logos/Logooutline/MIoutline.png",
  RCB: "https://documents.iplt20.com/ipl/RCB/Logos/Logooutline/RCBoutline.png",
  KKR: "https://documents.iplt20.com/ipl/KKR/Logos/Logooutline/KKRoutline.png",
  DC: "https://documents.iplt20.com/ipl/DC/Logos/Logooutline/DCoutline.png",
  PBKS: "https://documents.iplt20.com/ipl/PBKS/Logos/Logooutline/PBKSoutline.png",
  RR: "https://documents.iplt20.com/ipl/RR/Logos/Logooutline/RRoutline.png",
  SRH: "https://documents.iplt20.com/ipl/SRH/Logos/Logooutline/SRHoutline.png",
  GT: "https://documents.iplt20.com/ipl/GT/Logos/Logooutline/GToutline.png",
  LSG: "https://documents.iplt20.com/ipl/LSG/Logos/Logooutline/LSGoutline.png",
};

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

export function BusinessPoster({ match }: { match: Match }) {
  const posterRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const { details, updateField, clearAll, loaded } = useBusinessDetails();

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField("logoUrl", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (!posterRef.current) return;
    setDownloading(true);
    try {
      const { default: html2canvas } = await import("html2canvas-pro");
      const canvas = await html2canvas(posterRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#09090b",
      });
      const link = document.createElement("a");
      link.download = `IPL2026-${match.team1}-vs-${match.team2}-Match${match.matchNumber}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  const team1Gradient = teamGradients[match.team1] || "from-gray-600 to-gray-800";
  const team2Gradient = teamGradients[match.team2] || "from-gray-600 to-gray-800";
  const hasBusinessInfo =
    details.companyName || details.phone || details.website || details.instagram || details.facebook || details.twitter;

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Form */}
      <div className="space-y-4 rounded-2xl border border-white/10 bg-card p-5">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            <Building2 className="h-4 w-4" />
            Your Business Details
          </h3>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[10px] text-emerald-400">
              <Save className="h-3 w-3" />
              Auto-saved locally
            </span>
            {hasBusinessInfo && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1 rounded-md bg-red-500/10 px-2 py-1 text-[10px] font-medium text-red-400 hover:bg-red-500/20"
              >
                <Trash2 className="h-3 w-3" /> Clear
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Company / Brand Name *
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

          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Website
            </label>
            <input
              type="url"
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
              {details.logoUrl ? "Logo uploaded — click to change" : "Upload logo (PNG/JPG)"}
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

        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
        >
          {downloading ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Generating...</>
          ) : (
            <><Download className="h-4 w-4" /> Download Poster</>
          )}
        </button>
      </div>

      {/* Poster Preview */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs font-medium text-muted-foreground">Live Preview</p>
        <div
          ref={posterRef}
          className="w-full max-w-[400px] overflow-hidden rounded-2xl border border-white/10 bg-[#09090b]"
        >
          {/* Match header */}
          <div className="relative overflow-hidden bg-gradient-to-r from-[#1a1145] via-[#2d1b69] to-[#1a1145] px-5 py-4">
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, white 0.5px, transparent 0)",
                backgroundSize: "16px 16px",
              }}
            />
            <div className="relative text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-300">
                TATA Indian Premier League 2026
              </p>
              <p className="mt-0.5 text-[10px] text-white/50">
                Match {match.matchNumber} &bull; {match.date} &bull; {match.day}
              </p>
            </div>
          </div>

          {/* Teams VS */}
          <div className="relative flex items-center justify-between px-5 py-8">
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1145]/50 to-transparent" />
            {/* Team 1 */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className={cn("flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br p-0.5", team1Gradient)}>
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#09090b]">
                  <Image src={teamLogos[match.team1] || ""} alt={match.team1} width={48} height={48} className="h-12 w-12 object-contain" unoptimized />
                </div>
              </div>
              <span className="text-xl font-black text-white">{match.team1}</span>
            </div>
            {/* VS */}
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-3xl font-black bg-gradient-to-b from-primary to-yellow-400 bg-clip-text text-transparent">VS</span>
              <span className="mt-1 text-[9px] font-medium text-white/40">{match.time} IST</span>
            </div>
            {/* Team 2 */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className={cn("flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br p-0.5", team2Gradient)}>
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#09090b]">
                  <Image src={teamLogos[match.team2] || ""} alt={match.team2} width={48} height={48} className="h-12 w-12 object-contain" unoptimized />
                </div>
              </div>
              <span className="text-xl font-black text-white">{match.team2}</span>
            </div>
          </div>

          {/* Venue */}
          <div className="border-t border-white/5 px-5 py-2.5 text-center">
            <p className="text-[10px] text-white/40">{match.venue}</p>
          </div>

          {/* Business Footer */}
          {hasBusinessInfo && (
            <div className="border-t border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 px-4 py-3">
              <div className="flex items-center gap-3">
                {details.logoUrl && (
                  <img src={details.logoUrl} alt="Logo" className="h-9 w-9 rounded-lg object-contain bg-white/10 p-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  {details.companyName && (
                    <p className="text-xs font-bold text-white truncate">{details.companyName}</p>
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
                      <span className="flex items-center gap-0.5 text-[9px] text-pink-400">
                        <Instagram className="h-2.5 w-2.5" /> {details.instagram}
                      </span>
                    )}
                    {details.facebook && (
                      <span className="flex items-center gap-0.5 text-[9px] text-blue-400">
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

          {/* Branding */}
          <div className="bg-[#09090b] px-4 py-1.5 text-center">
            <p className="text-[8px] text-white/20">Made with IPLPro</p>
          </div>
        </div>
      </div>
    </div>
  );
}
