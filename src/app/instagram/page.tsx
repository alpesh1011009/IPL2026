import { Metadata } from "next";
import { InstagramClient } from "./instagram-client";

export const metadata: Metadata = {
  title: "IPL Instagram Posts — Download Free",
  description:
    "Download IPL 2026 Instagram post images with ready-to-copy captions. Team hype, match day, cricket facts — download & share in seconds.",
  keywords: [
    "IPL Instagram posts",
    "cricket Instagram images",
    "IPL 2026 marketing",
    "cricket social media posts",
    "IPL post download",
  ],
  alternates: { canonical: "https://cricpost.in/instagram" },
  openGraph: {
    title: "IPL Instagram Posts — Download Free",
    description:
      "Download IPL 2026 Instagram post images with ready-to-copy captions. Team hype, match day, cricket facts.",
    url: "https://cricpost.in/instagram",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function InstagramPage() {
  return <InstagramClient />;
}
