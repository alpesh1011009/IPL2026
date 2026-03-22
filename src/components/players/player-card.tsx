"use client";

import { useRef, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import type { Player, Team } from "@/data/teams";
import { getPlayerImage, teamLogoUrls } from "@/data/teams";
import type { BusinessDetails } from "@/hooks/use-business-details";

// ─── helpers ──────────────────────────────────────────────────────────────────

const roleConfig: Record<Player["role"], { label: string; color: string }> = {
  Batsman: { label: "BATSMAN", color: "#10b981" },
  Bowler: { label: "BOWLER", color: "#ef4444" },
  "All-Rounder": { label: "ALL-ROUNDER", color: "#3b82f6" },
  "Wicket-Keeper": { label: "WK", color: "#f59e0b" },
};

function alpha(hex6: string, opacity: number) {
  return (
    hex6 +
    Math.round(opacity * 255)
      .toString(16)
      .padStart(2, "0")
  );
}

// ─── inline svg icons (all 12×12 rendered at chosen size) ────────────────────

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
      {/* Gradient top border */}
      <div
        style={{
          height: 2,
          background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
        }}
      />

      {/* Footer body */}
      <div
        style={{
          background: "#090909",
          padding: "9px 14px 10px",
          position: "relative",
        }}
      >
        {/* Subtle tinted mesh */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at top left, ${alpha(primaryColor, 0.07)} 0%, transparent 60%)`,
            pointerEvents: "none",
          }}
        />

        {/* Main row: logo + details */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          {/* Logo */}
          {details.logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={details.logoUrl}
              alt="logo"
              style={{
                width: 40,
                height: 40,
                borderRadius: 9,
                objectFit: "contain",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: 4,
                flexShrink: 0,
              }}
            />
          )}

          {/* Text block */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Company name */}
            {details.companyName && (
              <div
                style={{
                  color: "#ffffff",
                  fontWeight: 800,
                  fontSize: 13,
                  lineHeight: 1.2,
                  letterSpacing: "-0.2px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginBottom: 3,
                }}
              >
                {details.companyName}
              </div>
            )}

            {/* Contact row */}
            {hasContact && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "2px 10px",
                }}
              >
                {details.website && (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      fontSize: 8.5,
                      color: alpha(primaryColor, 0.9) || "rgba(255,255,255,0.6)",
                      maxWidth: 120,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <GlobeIcon size={8} color={primaryColor} />
                    {details.website}
                  </span>
                )}
                {details.phone && (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      fontSize: 8.5,
                      color: "rgba(255,255,255,0.5)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <PhoneIcon size={8} color="rgba(255,255,255,0.45)" />
                    {details.phone}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Social row */}
        {hasSocial && (
          <>
            <div
              style={{
                height: 1,
                background: "rgba(255,255,255,0.07)",
                margin: "7px 0 6px",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                position: "relative",
              }}
            >
              {details.instagram && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 8.5,
                    color: "#f472b6",
                    whiteSpace: "nowrap",
                  }}
                >
                  <IgIcon size={10} color="#f472b6" />
                  {details.instagram}
                </span>
              )}
              {details.facebook && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 8.5,
                    color: "#60a5fa",
                    whiteSpace: "nowrap",
                  }}
                >
                  <FbIcon size={10} color="#60a5fa" />
                  {details.facebook}
                </span>
              )}
              {details.twitter && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 8.5,
                    color: "rgba(255,255,255,0.5)",
                    whiteSpace: "nowrap",
                  }}
                >
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

function BrandingFooter({
  primaryColor,
  secondaryColor,
}: {
  primaryColor: string;
  secondaryColor: string;
}) {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Top separator */}
      <div
        style={{
          height: 1,
          background: `linear-gradient(to right, transparent, ${alpha(primaryColor, 0.5)}, ${alpha(secondaryColor, 0.5)}, transparent)`,
        }}
      />
      <div
        style={{
          background: "#090909",
          padding: "8px 14px 9px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Faint team color glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at center, ${alpha(primaryColor, 0.05)} 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        {/* Left diamond accent */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, position: "relative" }}>
          <div
            style={{
              width: 5,
              height: 5,
              background: primaryColor,
              transform: "rotate(45deg)",
              opacity: 0.7,
              borderRadius: 1,
            }}
          />
          <span
            style={{
              color: "rgba(255,255,255,0.22)",
              fontSize: 8,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            CricPro
          </span>
          <div
            style={{
              width: 5,
              height: 5,
              background: secondaryColor,
              transform: "rotate(45deg)",
              opacity: 0.7,
              borderRadius: 1,
            }}
          />
        </div>
        <span
          style={{
            color: "rgba(255,255,255,0.12)",
            fontSize: 7.5,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            position: "relative",
          }}
        >
          Cricket 2026
        </span>
      </div>
    </div>
  );
}

// ─── card face ────────────────────────────────────────────────────────────────

interface Props {
  player: Player;
  team: Team;
  businessDetails?: BusinessDetails;
}

function CardFace({ player, team, businessDetails }: Props) {
  const role = roleConfig[player.role];
  const logoUrl = teamLogoUrls[team.shortName];

  const hasBusiness = !!(
    businessDetails &&
    (businessDetails.companyName ||
      businessDetails.phone ||
      businessDetails.website ||
      businessDetails.instagram ||
      businessDetails.facebook ||
      businessDetails.twitter ||
      businessDetails.logoUrl)
  );

  return (
    <div
      style={{
        width: 280,
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: "#0d0d0d",
        fontFamily:
          "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          height: 4,
          background: `linear-gradient(to right, ${team.primaryColor}, ${team.secondaryColor})`,
        }}
      />

      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${alpha(team.primaryColor, 0.18)} 0%, ${alpha(team.secondaryColor, 0.1)} 100%)`,
          borderBottom: `1px solid ${alpha(team.primaryColor, 0.25)}`,
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt={team.shortName}
              crossOrigin="anonymous"
              style={{ width: 30, height: 30, objectFit: "contain" }}
            />
          ) : (
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 6,
                background: alpha(team.primaryColor, 0.25),
                border: `1px solid ${alpha(team.primaryColor, 0.4)}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  color: team.primaryColor,
                  fontWeight: 900,
                  fontSize: 9,
                  letterSpacing: "-0.5px",
                }}
              >
                {team.shortName}
              </span>
            </div>
          )}
          <div>
            <div
              style={{
                color: "white",
                fontWeight: 800,
                fontSize: 15,
                lineHeight: 1,
              }}
            >
              {team.shortName}
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: 8,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginTop: 2,
              }}
            >
              {team.city}
            </div>
          </div>
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Cricket 2026
        </div>
      </div>

      {/* Photo Area */}
      <div style={{ position: "relative", height: 230, overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(160deg, ${alpha(team.primaryColor, 0.5)} 0%, #000 100%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.07,
            backgroundImage:
              "radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)",
            backgroundSize: "14px 14px",
          }}
        />
        {/* Team watermark */}
        <div
          style={{
            position: "absolute",
            bottom: -8,
            right: -10,
            fontSize: 100,
            fontWeight: 900,
            color: "rgba(255,255,255,0.05)",
            lineHeight: 1,
            letterSpacing: -5,
            userSelect: "none",
            fontFamily: "Arial Black, Impact, sans-serif",
          }}
        >
          {team.shortName}
        </div>
        {/* Player photo */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getPlayerImage(player)}
            alt={player.name}
            crossOrigin="anonymous"
            style={{
              width: 210,
              height: 225,
              objectFit: "cover",
              objectPosition: "top center",
              position: "relative",
              zIndex: 1,
            }}
          />
        </div>
        {/* Bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 90,
            background: "linear-gradient(to top, #0d0d0d, transparent)",
            zIndex: 2,
          }}
        />
        {/* Captain / Icon badge */}
        {(player.isCaptain || player.isIcon) && (
          <div
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              zIndex: 3,
              display: "flex",
              gap: 4,
            }}
          >
            {player.isCaptain && (
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "#eab308",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(234,179,8,0.6)",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="black">
                  <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
                </svg>
              </div>
            )}
            {player.isIcon && !player.isCaptain && (
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "#eab308",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(234,179,8,0.6)",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="black">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Player info */}
      <div style={{ padding: "10px 14px 10px", backgroundColor: "#0d0d0d" }}>
        {/* Accent bar */}
        <div
          style={{
            width: 32,
            height: 3,
            borderRadius: 2,
            background: team.primaryColor,
            marginBottom: 7,
          }}
        />
        {/* Player name */}
        <div
          style={{
            color: "white",
            fontWeight: 800,
            fontSize: 18,
            lineHeight: 1.15,
            marginBottom: 7,
            letterSpacing: "-0.3px",
          }}
        >
          {player.name}
        </div>
        {/* Role + Country */}
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span
            style={{
              backgroundColor: alpha(role.color, 0.15),
              color: role.color,
              border: `1px solid ${alpha(role.color, 0.35)}`,
              borderRadius: 20,
              padding: "2px 9px",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {role.label}
          </span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 10 }}>
            {player.country}
          </span>
        </div>
      </div>

      {/* Footer */}
      {hasBusiness && businessDetails ? (
        <BusinessFooter
          details={businessDetails}
          primaryColor={team.primaryColor}
          secondaryColor={team.secondaryColor}
        />
      ) : (
        <BrandingFooter
          primaryColor={team.primaryColor}
          secondaryColor={team.secondaryColor}
        />
      )}
    </div>
  );
}

// ─── exported card with download ─────────────────────────────────────────────

export function PlayerCard({ player, team, businessDetails }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const { default: html2canvas } = await import("html2canvas-pro");
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0d0d0d",
      });
      const link = document.createElement("a");
      link.download = `${player.name.replace(/\s+/g, "-")}-Cricket-Card.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div ref={cardRef}>
        <CardFace player={player} team={team} businessDetails={businessDetails} />
      </div>
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 transition-all hover:border-white/20 hover:bg-white/15 hover:text-white disabled:opacity-50"
      >
        {downloading ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Generating…
          </>
        ) : (
          <>
            <Download className="h-3.5 w-3.5" />
            Download Card
          </>
        )}
      </button>
    </div>
  );
}
