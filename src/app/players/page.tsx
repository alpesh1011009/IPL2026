import type { Metadata } from "next";
import { PlayersGrid } from "@/components/players/players-grid";
import { PlayersPageHero } from "@/components/players/players-page-hero";

export const metadata: Metadata = {
  title: "IPL 2026 Player Cards — Download Free Digital Trading Cards",
  description:
    "Download free digital trading cards for 150+ IPL 2026 cricketers. Filter by team or role and share on WhatsApp & Instagram instantly.",
  keywords: ["IPL player cards", "cricket trading cards", "IPL 2026 players", "cricket player download", "IPL squad 2026"],
  alternates: { canonical: "https://cricpost.in/players" },
  openGraph: {
    title: "IPL 2026 Player Cards — Download Free Digital Trading Cards",
    description: "Free digital trading cards for 150+ IPL cricketers. Download PNG & share instantly.",
    url: "https://cricpost.in/players",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IPL 2026 Player Cards — Download Free Digital Trading Cards",
    description: "Free digital trading cards for 150+ IPL cricketers.",
    images: ["/og-image.png"],
  },
};

export default function PlayersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:py-6">
      <PlayersPageHero />
      <PlayersGrid />
    </div>
  );
}
