import Link from "next/link";
import Image from "next/image";
import {
  Zap,
  Trophy,
  Share2,
  Sparkles,
  ArrowRight,
  Globe,
  ImageIcon,
  TrendingUp,
  CalendarDays,
  Download,
  Users,
  ChevronRight,
} from "lucide-react";
import { iplTeams } from "@/data/teams";
import { iplSchedule, teamTextColors } from "@/data/schedule";

const teamLogos: Record<string, string> = {
  CSK: "https://documents.iplt20.com/ipl/CSK/Logos/Logooutline/CSKoutline.png",
  MI: "https://documents.iplt20.com/ipl/MI/Logos/Logooutline/MIoutline.png",
  RCB: "https://documents.iplt20.com/ipl/RCB/Logos/Logooutline/RCBoutline.png",
  KKR: "https://documents.iplt20.com/ipl/KKR/Logos/Logooutline/KKRoutline.png",
  DC: "https://documents.iplt20.com/ipl/DC/Logos/Logooutline/DCoutline.png",
  PBKS: "https://documents.iplt20.com/ipl/PBKS/Logos/Logooutline/PBKSoutline.png",
  RR: "https://documents.iplt20.com/ipl/RR/Logos/Logooutline/RRoutline.png",
  SRH: "https://documents.iplt20.com/ipl/SRH/Logos/Logooutline/SRHoutline.png",
  GT: "https://documents.iplt20.com/ipl/GT/Logos/Logooutline/GToutline.png",
  LSG: "https://documents.iplt20.com/ipl/LSG/Logos/Logooutline/LSGoutline.png",
};

const features = [
  {
    icon: ImageIcon,
    title: "Match Poster Generator",
    description: "Create stunning match-day posters with team logos, your branding, and download as images.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: Zap,
    title: "Live Match Triggers",
    description: "Auto-generate trending posters on wickets, sixes, centuries. Be first to share viral content.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  {
    icon: Sparkles,
    title: "AI Meme Generator",
    description: "Type a prompt, get a cricket meme. AI picks the perfect template and caption.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description: "Create in English, Hindi, or Gujarati. Templates and UI fully localized.",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  {
    icon: Share2,
    title: "WhatsApp Sharing",
    description: "One-tap share to WhatsApp and Instagram Stories. Built for virality.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: Download,
    title: "Business Branding",
    description: "Add your company name, phone, social handles and logo to every poster you create.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
];

const steps = [
  { num: "01", title: "Pick a Match", desc: "Choose from the full IPL 2026 schedule" },
  { num: "02", title: "Add Your Details", desc: "Company name, phone, social media & logo" },
  { num: "03", title: "Download & Share", desc: "Get a branded poster image for WhatsApp" },
];

export default function HomePage() {
  const nextMatches = iplSchedule.slice(0, 6);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 h-[700px] w-[700px] rounded-full bg-primary/15 blur-[150px]" />
          <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[120px]" />
          <div className="absolute left-0 bottom-0 h-[300px] w-[300px] rounded-full bg-blue-600/10 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Text */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                <Trophy className="h-3.5 w-3.5" />
                IPL 2026 Season is LIVE
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Create{" "}
                <span className="bg-gradient-to-r from-primary via-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Viral IPL
                </span>{" "}
                Posters in Seconds
              </h1>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                Pick a match, add your business details, download a branded poster — share it on WhatsApp instantly. Free for everyone.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/poster"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
                >
                  <Zap className="h-4 w-4" />
                  Create Poster — Free
                </Link>
                <Link
                  href="/schedule"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-white/10"
                >
                  <CalendarDays className="h-4 w-4" />
                  View Schedule
                </Link>
              </div>

              {/* Social proof */}
              <div className="mt-8 flex items-center gap-6">
                <div>
                  <p className="text-2xl font-bold text-white">70+</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Matches</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <p className="text-2xl font-bold text-white">10</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Teams</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <p className="text-2xl font-bold text-primary">Free</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">To Start</p>
                </div>
              </div>
            </div>

            {/* Team logos grid */}
            <div className="relative">
              <div className="grid grid-cols-5 gap-3">
                {iplTeams.map((team) => (
                  <Link
                    key={team.id}
                    href="/teams"
                    className="group flex flex-col items-center gap-1.5 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 transition-all hover:border-white/20 hover:bg-white/[0.06] hover:scale-105"
                  >
                    <div className="h-10 w-10 sm:h-12 sm:w-12">
                      <Image
                        src={teamLogos[team.shortName] || ""}
                        alt={team.shortName}
                        width={48}
                        height={48}
                        className="h-full w-full object-contain drop-shadow-lg"
                        unoptimized
                      />
                    </div>
                    <span className={`text-[9px] font-bold ${team.textColor}`}>
                      {team.shortName}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">
            Create a Poster in{" "}
            <span className="text-primary">3 Steps</span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.num} className="relative flex gap-4 rounded-xl border border-white/[0.08] bg-card p-5">
                <span className="text-3xl font-black text-primary/20">{step.num}</span>
                <div>
                  <h3 className="text-base font-bold text-white">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-white/10 sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Matches */}
      <section className="border-t border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Upcoming{" "}
              <span className="text-primary">Matches</span>
            </h2>
            <Link href="/schedule" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              Full Schedule <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {nextMatches.map((m) => (
              <Link
                key={m.matchNumber}
                href={`/poster?match=${m.matchNumber}`}
                className="group overflow-hidden rounded-xl border border-white/[0.08] bg-card transition-all hover:border-primary/30 hover:shadow-lg"
              >
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-white/5 p-1">
                      <Image src={teamLogos[m.team1] || ""} alt={m.team1} width={24} height={24} className="h-full w-full object-contain" unoptimized />
                    </div>
                    <span className={`text-sm font-bold ${teamTextColors[m.team1]}`}>{m.team1}</span>
                  </div>
                  <span className="text-[10px] font-black text-primary">VS</span>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold ${teamTextColors[m.team2]}`}>{m.team2}</span>
                    <div className="h-8 w-8 rounded-full bg-white/5 p-1">
                      <Image src={teamLogos[m.team2] || ""} alt={m.team2} width={24} height={24} className="h-full w-full object-contain" unoptimized />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 px-4 py-2 text-[10px] text-muted-foreground">
                  <span>{m.date} &bull; {m.time}</span>
                  <span className="flex items-center gap-1 font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    <Download className="h-3 w-3" /> Create Poster
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Everything You Need to Go{" "}
              <span className="text-primary">Viral</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              From match-day posters to AI memes — all in one platform.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className={`group rounded-xl border ${f.border} bg-card p-6 transition-all duration-300 hover:border-white/20 hover:shadow-lg`}
              >
                <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${f.bg}`}>
                  <f.icon className={`h-5 w-5 ${f.color}`} />
                </div>
                <h3 className="mb-2 text-base font-semibold text-white">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teams Strip */}
      <section className="border-t border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">
              <span className="text-primary">10</span> Franchise Teams
            </h2>
            <Link href="/teams" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View All Teams <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {iplTeams.map((team) => (
              <Link
                key={team.id}
                href="/teams"
                className={`group overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br ${team.gradient} p-[1px] transition-all hover:scale-[1.02] hover:shadow-lg`}
              >
                <div className="flex items-center gap-3 rounded-[11px] bg-card/95 px-4 py-3">
                  <Image
                    src={teamLogos[team.shortName] || ""}
                    alt={team.shortName}
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                    unoptimized
                  />
                  <div>
                    <p className={`text-xs font-bold ${team.textColor}`}>{team.shortName}</p>
                    <p className="text-[9px] text-muted-foreground">{team.city}</p>
                  </div>
                  {team.titles > 0 && (
                    <Trophy className="ml-auto h-3 w-3 text-yellow-400" />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-orange-500/10 to-yellow-500/10 p-8 sm:p-12 text-center border border-primary/20">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-yellow-500/10 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold sm:text-3xl">Ready to Create Your First Poster?</h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Join thousands of cricket fans creating viral IPL content. Free to start, no credit card required.
              </p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/poster"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
                >
                  <Zap className="h-4 w-4" />
                  Start Creating Now
                </Link>
                <Link
                  href="/schedule"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
                >
                  <CalendarDays className="h-4 w-4" />
                  Browse Schedule
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
