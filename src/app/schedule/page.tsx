import type { Metadata } from "next";
import { iplSchedule, teamFullNames, teamTextColors, teamColors } from "@/data/schedule";
import { ScheduleTable } from "@/components/schedule/schedule-table";
import { SchedulePageHero } from "@/components/schedule/schedule-page-hero";

export const metadata: Metadata = {
  title: "IPL 2026 Full Schedule — Dates, Venues & Timings",
  description:
    "Complete IPL 2026 match schedule with dates, times, and venues. Create a branded poster for any match and download the full fixture list.",
  keywords: ["IPL 2026 schedule", "IPL fixture list", "cricket match dates", "IPL venues", "T20 2026 schedule"],
  alternates: { canonical: "https://cricpost.in/schedule" },
  openGraph: {
    title: "IPL 2026 Full Schedule — Dates, Venues & Timings",
    description: "All IPL 2026 matches with dates, times & venues. Create a branded match poster in one click.",
    url: "https://cricpost.in/schedule",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IPL 2026 Full Schedule — Dates, Venues & Timings",
    description: "All IPL 2026 matches with dates, times & venues.",
    images: ["/og-image.png"],
  },
};

export default function SchedulePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:py-6">
      <SchedulePageHero />
      <ScheduleTable
        matches={iplSchedule}
        teamFullNames={teamFullNames}
        teamTextColors={teamTextColors}
        teamColors={teamColors}
      />
    </div>
  );
}
