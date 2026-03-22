import { Metadata } from "next";
import { MemesClient } from "./memes-client";

export const metadata: Metadata = {
  title: "IPL Memes & Cricket Posts — Share on WhatsApp",
  description:
    "Funny & viral IPL 2026 cricket memes in English, Hindi & Gujarati. One-tap copy to share on WhatsApp, Instagram & more. 100+ memes updated daily.",
  keywords: ["IPL memes", "cricket memes 2026", "IPL WhatsApp status", "cricket jokes", "IPL funny posts", "cricket Hindi memes"],
  alternates: { canonical: "https://cricpost.in/memes" },
  openGraph: {
    title: "IPL Memes & Cricket Posts — Share on WhatsApp",
    description: "100+ viral IPL memes in English, Hindi & Gujarati. Tap to copy & share instantly.",
    url: "https://cricpost.in/memes",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IPL Memes & Cricket Posts — Share on WhatsApp",
    description: "100+ viral IPL memes in English, Hindi & Gujarati. Tap to copy & share instantly.",
    images: ["/og-image.png"],
  },
};

export default function MemesPage() {
  return <MemesClient />;
}
