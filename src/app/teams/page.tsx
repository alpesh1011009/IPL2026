import type { Metadata } from "next";
import { iplTeams } from "@/data/teams";
import { TeamCard } from "@/components/teams/team-card";
import { TeamsPageHero, TeamsRoleLegend } from "@/components/teams/teams-page-hero";

export const metadata: Metadata = {
  title: "IPL 2026 Teams & Squads — All 10 Franchises",
  description:
    "Explore all 10 IPL 2026 franchises with full squad details, player roles, and team history. MI, CSK, RCB, KKR, SRH, RR, GT, LSG, PBKS, DC.",
  keywords: ["IPL 2026 teams", "IPL squads 2026", "MI squad", "CSK squad", "RCB players", "IPL franchise", "cricket teams 2026"],
  alternates: { canonical: "https://cricpost.in/teams" },
  openGraph: {
    title: "IPL 2026 Teams & Squads — All 10 Franchises",
    description: "Full squads for all 10 IPL 2026 teams. MI, CSK, RCB, KKR & more.",
    url: "https://cricpost.in/teams",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IPL 2026 Teams & Squads — All 10 Franchises",
    description: "Full squads for all 10 IPL 2026 teams. MI, CSK, RCB, KKR & more.",
    images: ["/og-image.png"],
  },
};

export default function TeamsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <TeamsPageHero />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {iplTeams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
      <TeamsRoleLegend />
    </div>
  );
}
