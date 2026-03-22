import type { Metadata } from "next";
import { OwnPosterBuilder } from "@/components/own-poster/own-poster-builder";

export const metadata: Metadata = {
  title: "Fan Support Poster — Support Your Team or Player | CricPro",
  description:
    "Create a personalized cricket support poster for your favourite team or player. Add your custom message, upload your photo, and download instantly.",
};

export default function OwnPosterPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Page header */}
      <div className="mb-8 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
          ❤️ Fan Support Poster
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Create Your{" "}
          <span className="text-primary">Fan Support</span> Poster
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Pick your favourite team or player, write your cheer message, and
          download a shareable support poster — with your business branding
          built right in.
        </p>
      </div>

      <OwnPosterBuilder />
    </div>
  );
}
