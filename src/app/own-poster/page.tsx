import type { Metadata } from "next";
import { OwnPosterBuilder } from "@/components/own-poster/own-poster-builder";
import { OwnPosterPageHero } from "@/components/own-poster/own-poster-page-hero";

export const metadata: Metadata = {
  title: "Cricket Fan Support Poster — Support Your Team or Player",
  description:
    "Make a personalised cricket fan support poster for your favourite team or player. Add a custom message, upload your photo, and download free instantly.",
  keywords: ["cricket fan poster", "IPL support poster", "cricket team support", "cricket fan art", "IPL fan poster download"],
  alternates: { canonical: "https://cricpost.in/own-poster" },
  openGraph: {
    title: "Cricket Fan Support Poster — Support Your Team or Player",
    description: "Personalised fan support posters for any IPL team or player. Free download & share.",
    url: "https://cricpost.in/own-poster",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cricket Fan Support Poster — Support Your Team or Player",
    description: "Personalised fan support posters for any IPL team or player.",
    images: ["/og-image.png"],
  },
};

export default function OwnPosterPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <OwnPosterPageHero />
      <OwnPosterBuilder />
    </div>
  );
}
