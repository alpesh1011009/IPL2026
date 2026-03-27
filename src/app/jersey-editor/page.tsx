import type { Metadata } from "next";
import { JerseyFaceOverlay } from "@/components/jersey/jersey-face-overlay";

export const metadata: Metadata = {
  title: "IPL Jersey Try-On — Wear Any Team's Jersey Free",
  description:
    "Upload your photo and wear any IPL 2026 team jersey. Pick CSK, MI, RCB, KKR or any franchise, add your name & number, and download free.",
  keywords: [
    "IPL jersey try on",
    "IPL 2026 jersey",
    "cricket jersey editor",
    "CSK jersey photo",
    "MI jersey photo",
    "RCB jersey maker",
    "IPL team jersey download",
    "cricket fan jersey",
    "IPL jersey with my photo",
    "wear IPL jersey online",
  ],
  alternates: { canonical: "https://cricpost.in/jersey-editor" },
  openGraph: {
    title: "IPL Jersey Try-On — Wear Any Team's Jersey Free",
    description:
      "Upload your photo, pick any IPL team jersey, add your name & number. Free download & share.",
    url: "https://cricpost.in/jersey-editor",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IPL Jersey Try-On — Wear Any Team's Jersey Free",
    description:
      "Upload your photo and wear any IPL team jersey. Free to download & share.",
    images: ["/og-image.png"],
  },
};

export default function JerseyEditorPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:py-6">
      {/* Page Hero */}
      <div className="mb-8 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          New Feature
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Wear Your Team&apos;s{" "}
          <span className="text-primary">Jersey</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Upload your photo, pick any IPL team jersey, add your name &amp;
          number — download &amp; share with friends instantly.
        </p>
      </div>

      <JerseyFaceOverlay />
    </div>
  );
}
