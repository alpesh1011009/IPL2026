import type { Metadata } from "next";
import React from "react";
import type { ReactNode } from "react";
import {
  Building2, Zap, Users, ImageIcon, CalendarDays,
  Sparkles, HelpCircle, Heart, Ticket,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Help & User Guide — How to Use CricPost",
  description:
    "Step-by-step guide to using CricPost. Learn how to create cricket match posters, download player cards, share memes, and add your business branding.",
  alternates: { canonical: "https://cricpost.in/help" },
  openGraph: {
    title: "Help & User Guide — How to Use CricPost",
    description: "Step-by-step guide to creating cricket posters, player cards, and memes on CricPost.",
    url: "https://cricpost.in/help",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

type Section = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
  title: string;
  badge: string;
  badgeColor: string;
  steps: ReactNode[];
  tip?: string;
};

const sections: Section[] = [
  {
    id: "business",
    icon: Building2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    title: "Step 1 — Set Up Your Business Details",
    badge: "Do this first!",
    badgeColor: "bg-emerald-500/20 text-emerald-400",
    steps: [
      <>Click the <strong>Business</strong> button in the top navigation bar.</>,
      <>Enter your <strong>Company / Brand Name</strong>, Phone, Website, and social handles (Instagram, Facebook, X).</>,
      <>Details are <strong>auto-saved</strong> to your browser — no sign-up needed.</>,
      "Your branding will automatically appear as a footer on every poster, player card, and match card you create.",
    ],
    tip: "You only need to set this up once. It persists across all pages.",
  },
  {
    id: "poster",
    icon: Zap,
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
    title: "Create a Match Poster",
    badge: "/poster",
    badgeColor: "bg-primary/20 text-primary",
    steps: [
      <>Go to <strong>Create Now</strong> (top right) or <Link href="/poster" className="text-primary underline">Create Poster</Link> in the More menu.</>,
      "Select a match from the dropdown — teams, venue, and date are auto-filled.",
      "Add your business logo by clicking the upload area.",
      <>Preview updates live. Hit <strong>Download PNG</strong> or <strong>Download JPG</strong> to save.</>,
      "Share directly to WhatsApp, Instagram Stories, or any platform.",
    ],
    tip: "You can deep-link to a specific match: /poster?match=5",
  },
  {
    id: "players",
    icon: ImageIcon,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    title: "Player Cards",
    badge: "/players",
    badgeColor: "bg-blue-500/20 text-blue-400",
    steps: [
      <><Link href="/players" className="text-primary underline">Player Cards</Link> — visit from the nav.</>,
      <>Filter by <strong>Team</strong> or <strong>Role</strong> (Batsman, Bowler, All-rounder, Wicket-keeper).</>,
      "Use the search bar to find a specific player by name.",
      "Each card shows team branding, player stats, role badge, and your business footer.",
      <>Click <strong>Download</strong> on any card to save it as an image.</>,
    ],
    tip: "150+ players across all 10 IPL 2026 teams are available.",
  },
  {
    id: "match-card",
    icon: Ticket,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
    title: "Match Attendance Card",
    badge: "/match-card",
    badgeColor: "bg-yellow-500/20 text-yellow-400",
    steps: [
      <>Open <Link href="/match-card" className="text-primary underline">Match Card</Link> from the nav.</>,
      <>Upload your <strong>photo</strong> (or use the placeholder).</>,
      "Select the match you are attending from the dropdown.",
      "Your business details are auto-embedded at the bottom.",
      <>Hit <strong>Download</strong> to get your personalized &quot;I&apos;m Going to the Match&quot; card.</>,
    ],
    tip: "Great for sharing on social media before attending a live match.",
  },
  {
    id: "memes",
    icon: Sparkles,
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20",
    title: "Memes & Posts",
    badge: "/memes",
    badgeColor: "bg-pink-500/20 text-pink-400",
    steps: [
      <>Go to <Link href="/memes" className="text-primary underline">Memes &amp; Posts</Link> from the More menu.</>,
      "Browse 100+ cricket memes in English, Hindi, and Gujarati.",
      <>Filter by <strong>Category</strong> or <strong>Language</strong>.</>,
      <>Click <strong>Copy</strong> to copy the text to your clipboard.</>,
      <>Click <strong>WhatsApp</strong> to share directly to a WhatsApp chat.</>,
      "Use the native Share button to share to any app on your device.",
    ],
    tip: "Perfect for WhatsApp groups during match days!",
  },
  {
    id: "schedule",
    icon: CalendarDays,
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
    title: "Schedule",
    badge: "/schedule",
    badgeColor: "bg-orange-500/20 text-orange-400",
    steps: [
      <>Visit <Link href="/schedule" className="text-primary underline">Schedule</Link> from the nav.</>,
      "Browse all 70+ IPL 2026 matches with dates, venues, and team matchups.",
      "Filter by team to see only matches involving your favourite team.",
      <>Export the schedule as a <strong>CSV</strong> (spreadsheet) or <strong>ICS</strong> (add to Google/Apple Calendar).</>,
    ],
    tip: "Use the ICS export to never miss a match — it adds all matches to your calendar.",
  },
  {
    id: "teams",
    icon: Users,
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
    title: "Teams",
    badge: "/teams",
    badgeColor: "bg-purple-500/20 text-purple-400",
    steps: [
      <>Go to <Link href="/teams" className="text-primary underline">Teams</Link> from the More menu.</>,
      "Browse all 10 IPL 2026 teams with their full squad.",
      "Each team card shows the complete player roster with roles.",
      "Click any team to expand and see all player details.",
    ],
    tip: "Squad data covers all 150+ registered players across all teams.",
  },
  {
    id: "fan-support",
    icon: Heart,
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
    title: "Fan Support Posters",
    badge: "/own-poster",
    badgeColor: "bg-red-500/20 text-red-400",
    steps: [
      <>Go to <Link href="/own-poster" className="text-primary underline">Fan Support</Link> from the nav.</>,
      "Select your favourite team.",
      "Customize the poster with your name or message.",
      "Download and share to show your support.",
    ],
    tip: "Show your team pride on social media during the tournament.",
  },
  {
    id: "quiz",
    icon: HelpCircle,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
    title: "Cricket Quiz",
    badge: "/quiz",
    badgeColor: "bg-cyan-500/20 text-cyan-400",
    steps: [
      <>Open <Link href="/quiz" className="text-primary underline">Cricket Quiz</Link> from the More menu.</>,
      "Answer cricket trivia questions — from IPL history to player stats.",
      "See your score at the end and challenge your friends.",
    ],
    tip: "New questions added regularly throughout the IPL 2026 season.",
  },
];

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <div className="border-b border-border bg-background/60 backdrop-blur-xl">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-4">
            <HelpCircle className="h-3.5 w-3.5" />
            User Guide
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
            How to Use <span className="text-primary">cricpost.in</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Create cricket posters, player cards, memes and more — all with your own business branding.
            Follow this guide to get the most out of the platform.
          </p>
        </div>
      </div>

      {/* Quick nav pills */}
      <div className="border-b border-border bg-background/40 sticky top-16 z-40 backdrop-blur-xl">
        <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex-shrink-0 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors"
              >
                <s.icon className={`h-3 w-3 ${s.color}`} />
                {s.title.replace(/Step \d+ — /, "")}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 space-y-8">
        {sections.map((section) => (
          <div
            key={section.id}
            id={section.id}
            className={`rounded-2xl border p-6 ${section.bg} scroll-mt-32`}
          >
            <div className="flex items-start gap-4">
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-black/30 border border-white/10`}>
                <section.icon className={`h-5 w-5 ${section.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <h2 className="text-lg font-bold text-foreground">{section.title}</h2>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${section.badgeColor}`}>
                    {section.badge}
                  </span>
                </div>
                <ol className="space-y-2">
                  {section.steps.map((step, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold mt-0.5 bg-black/30 ${section.color}`}>
                        {j + 1}
                      </span>
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
                {section.tip && (
                  <div className="mt-4 flex items-start gap-2 rounded-lg bg-black/20 px-3 py-2">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider mt-0.5">Tip</span>
                    <p className="text-xs text-muted-foreground">{section.tip}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
          <h3 className="text-lg font-bold text-foreground mb-2">Ready to create?</h3>
          <p className="text-sm text-muted-foreground mb-4">Start with your business details, then create your first poster in under a minute.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/poster"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
            >
              <Zap className="h-4 w-4" />
              Create a Poster
            </Link>
            <Link
              href="/players"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-all"
            >
              <ImageIcon className="h-4 w-4" />
              Browse Player Cards
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
