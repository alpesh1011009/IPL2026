"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Download, Loader2, Upload, Camera, X } from "lucide-react";
import { iplSchedule, teamFullNames } from "@/data/schedule";
import { iplTeams, teamLogoUrls } from "@/data/teams";
import type { Team } from "@/data/teams";
import { useBusinessDetails } from "@/hooks/use-business-details";
import type { BusinessDetails } from "@/hooks/use-business-details";

// ─── helpers ──────────────────────────────────────────────────────────────────

function alpha(hex6: string, opacity: number) {
  return hex6 + Math.round(opacity * 255).toString(16).padStart(2, "0");
}

function getTeam(shortName: string): Team | undefined {
  return iplTeams.find((t) => t.shortName === shortName);
}

// ─── inline SVG icons (for html2canvas compatibility) ────────────────────────

const IgIcon = ({ size = 10, color = "#f472b6" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="17.5" cy="6.5" r="1.2" fill={color} stroke="none" />
  </svg>
);

const FbIcon = ({ size = 10, color = "#60a5fa" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const XIcon = ({ size = 10, color = "rgba(255,255,255,0.55)" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const PhoneIcon = ({ size = 9, color = "rgba(255,255,255,0.5)" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.58 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.48 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6 6l1.67-1.67a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 14.92z" />
  </svg>
);

const GlobeIcon = ({ size = 9, color = "rgba(255,255,255,0.5)" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

// ─── footer sub-components ───────────────────────────────────────────────────

function BusinessFooter({
  details,
  primaryColor,
  secondaryColor,
}: {
  details: BusinessDetails;
  primaryColor: string;
  secondaryColor: string;
}) {
  const hasSocial = !!(details.instagram || details.facebook || details.twitter);
  const hasContact = !!(details.phone || details.website);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ height: 2, background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }} />
      <div style={{ background: "#090909", padding: "9px 14px 10px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at top left, ${alpha(primaryColor, 0.07)} 0%, transparent 60%)`, pointerEvents: "none" }} />
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 10 }}>
          {details.logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={details.logoUrl} alt="logo" style={{ width: 40, height: 40, borderRadius: 9, objectFit: "contain", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", padding: 4, flexShrink: 0 }} />
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            {details.companyName && (
              <div style={{ color: "#ffffff", fontWeight: 800, fontSize: 13, lineHeight: 1.2, letterSpacing: "-0.2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 3 }}>
                {details.companyName}
              </div>
            )}
            {hasContact && (
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "2px 10px" }}>
                {details.website && (
                  <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 8.5, color: alpha(primaryColor, 0.9), maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    <GlobeIcon size={8} color={primaryColor} />
                    {details.website}
                  </span>
                )}
                {details.phone && (
                  <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 8.5, color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
                    <PhoneIcon size={8} color="rgba(255,255,255,0.45)" />
                    {details.phone}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        {hasSocial && (
          <>
            <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "7px 0 6px" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
              {details.instagram && (
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 8.5, color: "#f472b6", whiteSpace: "nowrap" }}>
                  <IgIcon size={10} color="#f472b6" />
                  {details.instagram}
                </span>
              )}
              {details.facebook && (
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 8.5, color: "#60a5fa", whiteSpace: "nowrap" }}>
                  <FbIcon size={10} color="#60a5fa" />
                  {details.facebook}
                </span>
              )}
              {details.twitter && (
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 8.5, color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
                  <XIcon size={10} color="rgba(255,255,255,0.5)" />
                  {details.twitter}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function BrandingFooter({ primaryColor, secondaryColor }: { primaryColor: string; secondaryColor: string }) {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${alpha(primaryColor, 0.5)}, ${alpha(secondaryColor, 0.5)}, transparent)` }} />
      <div style={{ background: "#090909", padding: "8px 14px 9px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, ${alpha(primaryColor, 0.05)} 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 5, position: "relative" }}>
          <div style={{ width: 5, height: 5, background: primaryColor, transform: "rotate(45deg)", opacity: 0.7, borderRadius: 1 }} />
          <span style={{ color: "rgba(255,255,255,0.22)", fontSize: 8, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>CricPro</span>
          <div style={{ width: 5, height: 5, background: secondaryColor, transform: "rotate(45deg)", opacity: 0.7, borderRadius: 1 }} />
        </div>
        <span style={{ color: "rgba(255,255,255,0.12)", fontSize: 7.5, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", position: "relative" }}>
          Cricket 2026
        </span>
      </div>
    </div>
  );
}

// ─── card face ────────────────────────────────────────────────────────────────

interface CardFaceProps {
  matchNumber: number;
  team1: string;
  team2: string;
  date: string;
  day: string;
  time: string;
  venue: string;
  userPhoto: string;
  userName: string;
  supportingTeam: string;
  businessDetails?: BusinessDetails;
}

function CardFace({ matchNumber, team1, team2, date, day, time, venue, userPhoto, userName, supportingTeam, businessDetails }: CardFaceProps) {
  const t1 = getTeam(team1);
  const t2 = getTeam(team2);
  const supportTeam = getTeam(supportingTeam) || t1;

  const logo1 = teamLogoUrls[team1];
  const logo2 = teamLogoUrls[team2];
  const supportLogo = teamLogoUrls[supportingTeam];

  const primaryColor = supportTeam?.primaryColor || "#f97316";
  const secondaryColor = supportTeam?.secondaryColor || "#ef4444";

  const hasBusiness = !!(
    businessDetails &&
    (businessDetails.companyName || businessDetails.phone || businessDetails.website ||
      businessDetails.instagram || businessDetails.facebook || businessDetails.twitter || businessDetails.logoUrl)
  );

  const venueShort = venue.split(",")[0];

  return (
    <div
      style={{
        width: 360,
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: "#0a0a0a",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        boxShadow: "0 12px 48px rgba(0,0,0,0.8)",
      }}
    >
      {/* Split top accent bar */}
      <div style={{ height: 5, display: "flex" }}>
        <div style={{ flex: 1, background: t1?.primaryColor || "#f97316" }} />
        <div style={{ flex: 1, background: t2?.primaryColor || "#3b82f6" }} />
      </div>

      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${alpha(primaryColor, 0.18)} 0%, #0a0a0a 60%)`,
          padding: "10px 16px",
          borderBottom: `1px solid ${alpha(primaryColor, 0.2)}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444" }} />
          <span style={{ color: "#ef4444", fontSize: 9, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Match Day
          </span>
        </div>
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, fontWeight: 700, letterSpacing: "0.12em" }}>
          Cricket 2026 · #{matchNumber}
        </span>
      </div>

      {/* VS Row */}
      <div
        style={{
          padding: "18px 16px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: `radial-gradient(ellipse at center top, ${alpha(primaryColor, 0.08)} 0%, transparent 70%)`,
          position: "relative",
        }}
      >
        {/* Watermark */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: 68,
            fontWeight: 900,
            color: "rgba(255,255,255,0.03)",
            letterSpacing: -4,
            fontFamily: "Arial Black, Impact, sans-serif",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          {team1} VS {team2}
        </div>

        {/* Team 1 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1, position: "relative" }}>
          {logo1 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo1} alt={team1} crossOrigin="anonymous" style={{ width: 64, height: 64, objectFit: "contain" }} />
          ) : (
            <div style={{ width: 64, height: 64, borderRadius: 12, background: alpha(t1?.primaryColor || "#f97316", 0.2), border: `2px solid ${alpha(t1?.primaryColor || "#f97316", 0.4)}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: t1?.primaryColor || "#f97316", fontWeight: 900, fontSize: 18 }}>{team1}</span>
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "white", fontWeight: 800, fontSize: 15 }}>{team1}</div>
            <div style={{ color: "rgba(255,255,255,0.38)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em" }}>{t1?.city || ""}</div>
          </div>
        </div>

        {/* VS Badge */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 10px", position: "relative" }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
              border: "1.5px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: 900 }}>VS</span>
          </div>
        </div>

        {/* Team 2 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1, position: "relative" }}>
          {logo2 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo2} alt={team2} crossOrigin="anonymous" style={{ width: 64, height: 64, objectFit: "contain" }} />
          ) : (
            <div style={{ width: 64, height: 64, borderRadius: 12, background: alpha(t2?.primaryColor || "#3b82f6", 0.2), border: `2px solid ${alpha(t2?.primaryColor || "#3b82f6", 0.4)}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: t2?.primaryColor || "#3b82f6", fontWeight: 900, fontSize: 18 }}>{team2}</span>
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "white", fontWeight: 800, fontSize: 15 }}>{team2}</div>
            <div style={{ color: "rgba(255,255,255,0.38)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em" }}>{t2?.city || ""}</div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${alpha(primaryColor, 0.35)}, transparent)`, margin: "0 16px" }} />

      {/* User Section */}
      <div
        style={{
          padding: "18px 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          background: `linear-gradient(180deg, transparent, ${alpha(primaryColor, 0.05)} 100%)`,
        }}
      >
        {/* Photo with team badge */}
        <div style={{ position: "relative" }}>
          {userPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={userPhoto}
              alt="Your photo"
              style={{
                width: 92,
                height: 92,
                borderRadius: "50%",
                objectFit: "cover",
                border: `3px solid ${primaryColor}`,
                boxShadow: `0 0 28px ${alpha(primaryColor, 0.4)}`,
              }}
            />
          ) : (
            <div
              style={{
                width: 92,
                height: 92,
                borderRadius: "50%",
                background: alpha(primaryColor, 0.1),
                border: `3px solid ${alpha(primaryColor, 0.35)}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke={alpha(primaryColor, 0.55)} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          )}
          {/* Team mini badge */}
          <div
            style={{
              position: "absolute",
              bottom: 2,
              right: -2,
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: primaryColor,
              border: "2px solid #0a0a0a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {supportLogo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={supportLogo} alt={supportingTeam} crossOrigin="anonymous" style={{ width: 19, height: 19, objectFit: "contain" }} />
            ) : (
              <span style={{ color: "white", fontSize: 6, fontWeight: 900 }}>{supportingTeam.slice(0, 2)}</span>
            )}
          </div>
        </div>

        {/* Name */}
        {userName && (
          <div style={{ color: "white", fontWeight: 700, fontSize: 16, letterSpacing: "-0.3px" }}>
            {userName}
          </div>
        )}

        {/* Headline */}
        <div
          style={{
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
            borderRadius: 14,
            padding: "9px 24px",
            textAlign: "center",
          }}
        >
          <div style={{ color: "white", fontWeight: 900, fontSize: 17, letterSpacing: "-0.3px" }}>
            I&apos;M GOING TO THE MATCH!
          </div>
        </div>

        {/* Supporting badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: alpha(primaryColor, 0.1),
            border: `1px solid ${alpha(primaryColor, 0.3)}`,
            borderRadius: 20,
            padding: "4px 14px",
          }}
        >
          <span style={{ color: primaryColor, fontSize: 9.5, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Rooting for {teamFullNames[supportingTeam] || supportingTeam}
          </span>
        </div>
      </div>

      {/* Match info strip */}
      <div
        style={{
          margin: "0 16px 16px",
          borderRadius: 12,
          background: "rgba(255,255,255,0.035)",
          border: "1px solid rgba(255,255,255,0.06)",
          padding: "12px 14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "stretch" }}>
          {/* Date */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 7.5, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>Date</span>
            <span style={{ color: "white", fontSize: 11, fontWeight: 700 }}>{date}</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 9 }}>{day}</span>
          </div>
          <div style={{ width: 1, background: "rgba(255,255,255,0.07)", margin: "0 6px" }} />
          {/* Time */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 7.5, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>Time</span>
            <span style={{ color: "white", fontSize: 11, fontWeight: 700 }}>{time}</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 9 }}>IST</span>
          </div>
          <div style={{ width: 1, background: "rgba(255,255,255,0.07)", margin: "0 6px" }} />
          {/* Venue */}
          <div style={{ flex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 7.5, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>Venue</span>
            <span style={{ color: "white", fontSize: 10, fontWeight: 600, textAlign: "center", lineHeight: 1.35 }}>{venueShort}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      {hasBusiness && businessDetails ? (
        <BusinessFooter details={businessDetails} primaryColor={primaryColor} secondaryColor={secondaryColor} />
      ) : (
        <BrandingFooter primaryColor={primaryColor} secondaryColor={secondaryColor} />
      )}
    </div>
  );
}

// ─── main builder ─────────────────────────────────────────────────────────────

export function MatchCardBuilder() {
  const { details: businessDetails } = useBusinessDetails();
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedMatchIndex, setSelectedMatchIndex] = useState(0);
  const [userPhoto, setUserPhoto] = useState("");
  const [userName, setUserName] = useState("");
  const [supportingTeam, setSupportingTeam] = useState(iplSchedule[0].team1);
  const [downloading, setDownloading] = useState(false);

  // Load saved details from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem("matchcard_userName");
    const savedPhoto = localStorage.getItem("matchcard_userPhoto");
    if (savedName) setUserName(savedName);
    if (savedPhoto) setUserPhoto(savedPhoto);
  }, []);

  // Save name to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("matchcard_userName", userName);
  }, [userName]);

  // Save photo to localStorage whenever it changes
  useEffect(() => {
    if (userPhoto) {
      localStorage.setItem("matchcard_userPhoto", userPhoto);
    } else {
      localStorage.removeItem("matchcard_userPhoto");
    }
  }, [userPhoto]);

  const selectedMatch = iplSchedule[selectedMatchIndex];

  const handleMatchChange = (index: number) => {
    setSelectedMatchIndex(index);
    setSupportingTeam(iplSchedule[index].team1);
  };

  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUserPhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const { default: html2canvas } = await import("html2canvas-pro");
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0a0a0a",
      });
      const link = document.createElement("a");
      link.download = `Going-To-Match-${selectedMatch.team1}-vs-${selectedMatch.team2}-M${selectedMatch.matchNumber}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
      {/* Page header */}
      <div className="mb-4">
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">New</span>
          <span className="text-xs text-muted-foreground">Personalized match card</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">I&apos;m Going to the Match!</h1>
        <p className="mt-1 text-sm text-muted-foreground">Pick a match, upload your photo, and create a shareable card to announce your match day.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
        {/* ── Controls ── */}
        <div className="space-y-5">

          {/* Photo & Name — shown first so users fill in their details before picking a match */}
          <div className="rounded-2xl border border-white/10 bg-card p-5">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Your Details</h2>
            <div className="space-y-4">
              {/* Photo upload */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-muted-foreground">Your Photo</label>
                <div className="flex items-center gap-4">
                  <div
                    className="relative flex h-20 w-20 flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-white/20 bg-white/5 transition-all hover:border-primary/50 hover:bg-primary/5"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {userPhoto ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={userPhoto} alt="Your photo" className="h-full w-full object-cover" />
                    ) : (
                      <Camera className="h-6 w-6 text-white/25" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition-all hover:border-white/20 hover:bg-white/10"
                    >
                      <Upload className="h-4 w-4" />
                      Upload Photo
                    </button>
                    {userPhoto && (
                      <button
                        onClick={() => setUserPhoto("")}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-white"
                      >
                        <X className="h-3 w-3" /> Remove photo
                      </button>
                    )}
                    <p className="text-xs text-muted-foreground">JPG or PNG, up to 5 MB</p>
                  </div>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </div>

              {/* Name */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-muted-foreground">Your Name <span className="text-white/25">(optional)</span></label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground/60">Your details are saved automatically and will be here next time.</p>
          </div>

          {/* Match selector */}
          <div className="rounded-2xl border border-white/10 bg-card p-5">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Select Match</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {iplSchedule.map((match, idx) => (
                <button
                  key={match.matchNumber}
                  onClick={() => handleMatchChange(idx)}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    selectedMatchIndex === idx
                      ? "border-primary/50 bg-primary/10 shadow-sm shadow-primary/10"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-muted-foreground">Match #{match.matchNumber}</span>
                    <span className="text-[10px] text-muted-foreground">{match.date}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white">{match.team1}</span>
                    <span className="text-xs text-muted-foreground">vs</span>
                    <span className="text-sm font-bold text-white">{match.team2}</span>
                  </div>
                  <div className="mt-0.5 truncate text-[10px] text-muted-foreground">{match.venue.split(",")[0]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Supporting team */}
          <div className="rounded-2xl border border-white/10 bg-card p-5">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Which Team Are You Supporting?</h2>
            <div className="flex gap-3">
              {[selectedMatch.team1, selectedMatch.team2].map((team) => {
                const t = getTeam(team);
                const logo = teamLogoUrls[team];
                const isSelected = supportingTeam === team;
                return (
                  <button
                    key={team}
                    onClick={() => setSupportingTeam(team)}
                    className={`flex flex-1 flex-col items-center gap-2.5 rounded-xl border p-4 transition-all ${
                      isSelected
                        ? "border-primary/50 bg-primary/10"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                    }`}
                  >
                    {logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={logo} alt={team} className="h-12 w-12 object-contain" />
                    ) : (
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-lg text-sm font-black"
                        style={{ background: `${t?.primaryColor}22`, color: t?.primaryColor }}
                      >
                        {team}
                      </div>
                    )}
                    <div className="text-center">
                      <div className="text-sm font-bold text-white">{team}</div>
                      <div className="text-xs text-muted-foreground">{t?.city}</div>
                    </div>
                    {isSelected && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">✓</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Business branding hint */}
          <p className="text-xs text-muted-foreground">
            Business branding is pulled from your{" "}
            <span className="text-primary">Business Details</span> in the header — fill it in to add your logo and contact info to the card.
          </p>
        </div>

        {/* ── Card Preview ── */}
        <div className="flex flex-col items-center gap-4 lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Preview</p>
          <div ref={cardRef}>
            <CardFace
              matchNumber={selectedMatch.matchNumber}
              team1={selectedMatch.team1}
              team2={selectedMatch.team2}
              date={selectedMatch.date}
              day={selectedMatch.day}
              time={selectedMatch.time}
              venue={selectedMatch.venue}
              userPhoto={userPhoto}
              userName={userName}
              supportingTeam={supportingTeam}
              businessDetails={businessDetails}
            />
          </div>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
          >
            {downloading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating…
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download Card
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
