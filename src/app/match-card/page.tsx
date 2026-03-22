import type { Metadata } from "next";
import { MatchCardBuilder } from "@/components/match-card/match-card-builder";

export const metadata: Metadata = {
  title: "I'm Going to the Match — Personalized Cricket Card",
  description:
    "Create a personalised 'I'm going to the match' card with your photo and team. Download and share on WhatsApp & Instagram before the big game!",
  keywords: ["I'm going to the match card", "cricket match card", "IPL match selfie card", "cricket fan card", "match day card"],
  alternates: { canonical: "https://cricpost.in/match-card" },
  openGraph: {
    title: "I'm Going to the Match — Personalized Cricket Card",
    description: "Make your personalised match-day card with your photo. Download & share on WhatsApp!",
    url: "https://cricpost.in/match-card",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "I'm Going to the Match — Personalized Cricket Card",
    description: "Make your personalised match-day card with your photo.",
    images: ["/og-image.png"],
  },
};

export default function MatchCardPage() {
  return <MatchCardBuilder />;
}
