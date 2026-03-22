import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cricket Match Poster Maker — Brand Your Business",
  description:
    "Create branded IPL 2026 match posters with your business name, logo & contact. Download as PNG and share on WhatsApp in seconds. Free to use.",
  keywords: ["IPL match poster", "cricket business poster", "branded match poster", "IPL poster maker", "cricket poster download"],
  alternates: { canonical: "https://cricpost.in/poster" },
  openGraph: {
    title: "Cricket Match Poster Maker — Brand Your Business",
    description: "Branded IPL match posters with your business details. Download PNG & share on WhatsApp.",
    url: "https://cricpost.in/poster",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cricket Match Poster Maker — Brand Your Business",
    description: "Branded IPL match posters with your business details. Free download.",
    images: ["/og-image.png"],
  },
};

export default function PosterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
