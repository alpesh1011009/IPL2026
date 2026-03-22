"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useBusinessDetails } from "@/hooks/use-business-details";
import type { Match } from "@/data/schedule";
import { teamLogoUrls } from "@/data/teams";
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
} from "lucide-react";

const teamTextColors: Record<string, string> = {
  CSK: "text-yellow-400", MI: "text-blue-400", RCB: "text-red-400",
  KKR: "text-purple-400", DC: "text-blue-400", PBKS: "text-red-400",
  RR: "text-pink-400", SRH: "text-orange-400", GT: "text-cyan-400", LSG: "text-teal-400",
};

export function ScheduleDownload({ matches }: { matches: Match[] }) {
  const scheduleRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { details, updateField, clearAll, loaded } = useBusinessDetails();

  const handleDownload = async () => {
    if (!scheduleRef.current) return;
    setDownloading(true);
    try {
      const { default: html2canvas } = await import("html2canvas-pro");
      const canvas = await html2canvas(scheduleRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#09090b",
        windowWidth: 800,
      });
      const link = document.createElement("a");
      link.download = `Cricket-2026-Full-Schedule${details.companyName ? `-${details.companyName.replace(/\s+/g, "-")}` : ""}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  const hasBusinessInfo = details.companyName || details.phone || details.website || details.instagram;

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
      >
        <Download className="h-4 w-4" />
        Download Schedule Image
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 backdrop-blur-sm p-4 pt-8">
          <div className="relative w-full max-w-4xl rounded-2xl border border-white/10 bg-background shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <h2 className="text-lg font-bold">Download Schedule with Your Branding</h2>
              <button onClick={() => setShowModal(false)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-white/10 hover:text-white">
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
                  {details.logoUrl ? "Logo uploaded" : "Upload logo"}
                  <input type="file" accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => updateField("logoUrl", reader.result as string);
                      reader.readAsDataURL(file);
                    }
                  }} className="hidden" />
                </label>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                  >
                    {downloading ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating...</> : <><Download className="h-4 w-4" /> Download</>}
                  </button>
                  {hasBusinessInfo && (
                    <button onClick={clearAll} className="rounded-xl bg-red-500/10 px-3 py-2.5 text-red-400 hover:bg-red-500/20">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Schedule preview */}
              <div className="max-h-[70vh] overflow-y-auto rounded-xl border border-white/10">
                <div ref={scheduleRef} className="bg-[#09090b] p-5" style={{ width: "500px" }}>
                  {/* Header */}
                  <div className="mb-4 rounded-xl bg-gradient-to-r from-[#1a1145] via-[#2d1b69] to-[#1a1145] p-4 text-center">
                    <p className="text-lg font-black text-white tracking-wide">Cricket 2026</p>
                    <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-purple-300">
                      Match Schedule &bull; Phase 1
                    </p>
                  </div>

                  {/* Matches */}
                  <div className="space-y-1.5">
                    {matches.map((m) => (
                      <div key={m.matchNumber} className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2">
                        <span className="w-7 text-[9px] font-bold text-white/30">#{m.matchNumber}</span>
                        <div className="flex flex-1 items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            {teamLogoUrls[m.team1] ? (
                              <Image src={teamLogoUrls[m.team1]!} alt={m.team1} width={16} height={16} className="h-4 w-4 object-contain" unoptimized />
                            ) : (
                              <span className="text-[8px] font-black text-white/60">{m.team1}</span>
                            )}
                            <span className={cn("text-xs font-bold", teamTextColors[m.team1])}>{m.team1}</span>
                          </div>
                          <span className="text-[8px] font-black text-primary mx-2">VS</span>
                          <div className="flex items-center gap-1.5">
                            <span className={cn("text-xs font-bold", teamTextColors[m.team2])}>{m.team2}</span>
                            {teamLogoUrls[m.team2] ? (
                              <Image src={teamLogoUrls[m.team2]!} alt={m.team2} width={16} height={16} className="h-4 w-4 object-contain" unoptimized />
                            ) : (
                              <span className="text-[8px] font-black text-white/60">{m.team2}</span>
                            )}
                          </div>
                        </div>
                        <div className="ml-2 text-right">
                          <p className="text-[9px] font-medium text-white/60">{m.date}</p>
                          <p className="text-[8px] text-white/30">{m.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Business footer */}
                  {hasBusinessInfo && (
                    <div className="mt-4 rounded-xl border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-3">
                      <div className="flex items-center gap-3">
                        {details.logoUrl && (
                          <img src={details.logoUrl} alt="Logo" className="h-8 w-8 rounded-lg object-contain bg-white/10 p-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          {details.companyName && <p className="text-xs font-bold text-white">{details.companyName}</p>}
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5">
                            {details.phone && <span className="flex items-center gap-1 text-[8px] text-white/60"><Phone className="h-2 w-2" /> {details.phone}</span>}
                            {details.website && <span className="flex items-center gap-1 text-[8px] text-white/60"><Globe className="h-2 w-2" /> {details.website}</span>}
                            {details.instagram && <span className="flex items-center gap-0.5 text-[8px] text-pink-400"><Instagram className="h-2 w-2" /> {details.instagram}</span>}
                            {details.facebook && <span className="flex items-center gap-0.5 text-[8px] text-blue-400"><Facebook className="h-2 w-2" /> {details.facebook}</span>}
                            {details.twitter && <span className="flex items-center gap-0.5 text-[8px] text-white/60"><Twitter className="h-2 w-2" /> {details.twitter}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <p className="mt-3 text-center text-[7px] text-white/15">Made with CricPro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
