"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Zap,
  Trophy,
  Share2,
  Sparkles,
  ArrowRight,
  ImageIcon,
  CalendarDays,
  Download,
  Users,
  Heart,
  CreditCard,
  Ticket,
  ChevronRight,
  HelpCircle,
  Instagram,
} from "lucide-react";
import { iplTeams, teamLogoUrls } from "@/data/teams";
import { iplSchedule, teamTextColors } from "@/data/schedule";
import { MatchCountdown } from "@/components/ui/match-countdown";
import { MatchPrediction } from "@/components/ui/match-prediction";
import { useLanguage } from "@/context/language-context";
import type { TranslationKey } from "@/lib/translations";

const toolDefs: {
  href: string;
  icon: React.ElementType;
  labelKey: TranslationKey;
  descKey: TranslationKey;
  color: string;
  bg: string;
  border: string;
  badgeKey?: TranslationKey;
  badgeColor?: string;
}[] = [
  { href: "/poster", icon: ImageIcon, labelKey: "toolMatchPoster", descKey: "toolMatchPosterDesc", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", badgeKey: "badgeMostPopular", badgeColor: "bg-blue-500/20 text-blue-300" },
  { href: "/players", icon: CreditCard, labelKey: "toolPlayerCards", descKey: "toolPlayerCardsDesc", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
  { href: "/match-card", icon: Ticket, labelKey: "toolMatchCard", descKey: "toolMatchCardDesc", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", badgeKey: "badgeNew", badgeColor: "bg-purple-500/20 text-purple-300" },
  { href: "/own-poster", icon: Heart, labelKey: "toolFanSupport", descKey: "toolFanSupportDesc", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20", badgeKey: "badgeNew", badgeColor: "bg-rose-500/20 text-rose-300" },
  { href: "/memes", icon: Sparkles, labelKey: "toolMemes", descKey: "toolMemesDesc", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
  { href: "/schedule", icon: CalendarDays, labelKey: "toolSchedule", descKey: "toolScheduleDesc", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { href: "/teams", icon: Users, labelKey: "toolTeams", descKey: "toolTeamsDesc", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  { href: "/quiz", icon: HelpCircle, labelKey: "toolCricketQuiz", descKey: "toolCricketQuizDesc", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", badgeKey: "badgeNew", badgeColor: "bg-cyan-500/20 text-cyan-300" },
  { href: "/instagram", icon: Instagram, labelKey: "toolInstagram", descKey: "toolInstagramDesc", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", badgeKey: "badgeNew", badgeColor: "bg-pink-500/20 text-pink-300" },
];

export default function HomePage() {
  const { t } = useLanguage();
  const nextMatches = iplSchedule.slice(0, 6);

  const steps = [
    { num: "01", title: t("step1Title") as string, desc: t("step1Desc") as string },
    { num: "02", title: t("step2Title") as string, desc: t("step2Desc") as string },
    { num: "03", title: t("step3Title") as string, desc: t("step3Desc") as string },
  ];

  const tools = toolDefs.map((tool) => ({
    ...tool,
    label: t(tool.labelKey) as string,
    description: t(tool.descKey) as string,
    badge: tool.badgeKey ? (t(tool.badgeKey) as string) : undefined,
  }));

  return (
    <div className="flex flex-col">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 h-[700px] w-[700px] rounded-full bg-primary/15 blur-[150px]" />
          <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute left-0 bottom-0 h-[300px] w-[300px] rounded-full bg-primary/8 blur-[100px]" />
        </div>

        {/* Cricket Animations */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          {/* Pitch outline */}
          <div className="anim-pitch absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12">
            <svg width="110" height="300" viewBox="0 0 110 300" fill="none">
              <rect x="5" y="5" width="100" height="290" rx="4" stroke="var(--color-primary)" strokeWidth="1.5"/>
              <line x1="5"   y1="48"  x2="105" y2="48"  stroke="var(--color-primary)" strokeWidth="1"/>
              <line x1="5"   y1="252" x2="105" y2="252" stroke="var(--color-primary)" strokeWidth="1"/>
              <line x1="0"   y1="32"  x2="110" y2="32"  stroke="var(--color-primary)" strokeWidth="0.8"/>
              <line x1="0"   y1="268" x2="110" y2="268" stroke="var(--color-primary)" strokeWidth="0.8"/>
              <line x1="32"  y1="32"  x2="32"  y2="48"  stroke="var(--color-primary)" strokeWidth="0.8"/>
              <line x1="78"  y1="32"  x2="78"  y2="48"  stroke="var(--color-primary)" strokeWidth="0.8"/>
              <line x1="32"  y1="252" x2="32"  y2="268" stroke="var(--color-primary)" strokeWidth="0.8"/>
              <line x1="78"  y1="252" x2="78"  y2="268" stroke="var(--color-primary)" strokeWidth="0.8"/>
            </svg>
          </div>
          {/* Cricket Ball 1 */}
          <div className="anim-ball-1 absolute top-16 right-[22%] opacity-20">
            <svg width="56" height="56" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="19" fill="#9B1B0A"/>
              <circle cx="20" cy="20" r="19" fill="none" stroke="#5a0e05" strokeWidth="1"/>
              <path d="M3 20 C9 6, 31 6, 37 20"  stroke="#e8c87a" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M3 20 C9 34, 31 34, 37 20" stroke="#e8c87a" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="11" y1="13" x2="11" y2="10" stroke="#e8c87a" strokeWidth="1"/>
              <line x1="17" y1="9"  x2="17" y2="6"  stroke="#e8c87a" strokeWidth="1"/>
              <line x1="23" y1="6"  x2="23" y2="9"  stroke="#e8c87a" strokeWidth="1"/>
              <line x1="29" y1="10" x2="29" y2="13" stroke="#e8c87a" strokeWidth="1"/>
              <circle cx="12" cy="13" r="4" fill="white" fillOpacity="0.12"/>
            </svg>
          </div>
          {/* Cricket Ball 2 */}
          <div className="anim-ball-2 absolute top-[45%] left-[8%]" style={{ opacity: 0.15 }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="19" fill="#9B1B0A"/>
              <circle cx="20" cy="20" r="19" fill="none" stroke="#5a0e05" strokeWidth="1"/>
              <path d="M3 20 C9 6, 31 6, 37 20"  stroke="#e8c87a" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M3 20 C9 34, 31 34, 37 20" stroke="#e8c87a" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="12" cy="13" r="4" fill="white" fillOpacity="0.12"/>
            </svg>
          </div>
          {/* Cricket Ball 3 */}
          <div className="anim-ball-3 absolute bottom-20 right-[8%]" style={{ opacity: 0.18 }}>
            <svg width="48" height="48" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="19" fill="#9B1B0A"/>
              <circle cx="20" cy="20" r="19" fill="none" stroke="#5a0e05" strokeWidth="1"/>
              <path d="M3 20 C9 6, 31 6, 37 20"  stroke="#e8c87a" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M3 20 C9 34, 31 34, 37 20" stroke="#e8c87a" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="12" cy="13" r="4" fill="white" fillOpacity="0.12"/>
            </svg>
          </div>
          {/* Bat */}
          <div className="anim-bat absolute top-[15%] left-[3%] opacity-10" style={{ transformOrigin: "80% 90%" }}>
            <svg width="36" height="130" viewBox="0 0 36 130" fill="none">
              <rect x="14" y="0" width="8" height="45" rx="4" fill="#d4a855"/>
              <line x1="16" y1="4"  x2="20" y2="4"  stroke="#a07030" strokeWidth="1"/>
              <line x1="16" y1="9"  x2="20" y2="9"  stroke="#a07030" strokeWidth="1"/>
              <line x1="16" y1="14" x2="20" y2="14" stroke="#a07030" strokeWidth="1"/>
              <line x1="16" y1="19" x2="20" y2="19" stroke="#a07030" strokeWidth="1"/>
              <line x1="16" y1="24" x2="20" y2="24" stroke="#a07030" strokeWidth="1"/>
              <line x1="16" y1="29" x2="20" y2="29" stroke="#a07030" strokeWidth="1"/>
              <line x1="16" y1="34" x2="20" y2="34" stroke="#a07030" strokeWidth="1"/>
              <path d="M14 45 Q6 50 4 60 L4 115 Q4 128 18 128 Q32 128 32 115 L32 60 Q30 50 22 45 Z" fill="#d4a855"/>
              <line x1="4"  y1="70"  x2="4"  y2="115" stroke="#b08840" strokeWidth="1.5"/>
              <line x1="32" y1="70"  x2="32" y2="115" stroke="#b08840" strokeWidth="1.5"/>
              <line x1="8" y1="58" x2="28" y2="58" stroke="#a07030" strokeWidth="1"/>
            </svg>
          </div>
          {/* Stumps */}
          <div className="anim-stumps absolute bottom-0 right-[3%] opacity-20" style={{ transformOrigin: "bottom center" }}>
            <svg width="88" height="130" viewBox="0 0 88 130" fill="none">
              <rect x="6"  y="28" width="9" height="100" rx="3" fill="#f5e6c8"/>
              <rect x="40" y="28" width="9" height="100" rx="3" fill="#f5e6c8"/>
              <rect x="73" y="28" width="9" height="100" rx="3" fill="#f5e6c8"/>
              <rect className="anim-bail" x="6" y="18" width="43" height="10" rx="4" fill="#f5e6c8"/>
              <rect x="40" y="18" width="42" height="10" rx="4" fill="#f5e6c8"/>
            </svg>
          </div>
          {/* Particles */}
          <div className="absolute bottom-28 right-[7%] flex gap-3">
            <div className="anim-particle-a w-2 h-2 rounded-full bg-primary/60"/>
            <div className="anim-particle-b w-1.5 h-1.5 rounded-full bg-primary/40"/>
            <div className="anim-particle-c w-2 h-2 rounded-full bg-primary/50"/>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:py-20">
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 lg:items-center">
            {/* Text */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                TATA IPL 2025 &bull; Season Live
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                {t("heroH1a")}{" "}
                <span className="text-primary">{t("heroH1b")}</span>{" "}
                {t("heroH1c")}
              </h1>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                {t("heroDesc")}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/own-poster"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
                >
                  <Zap className="h-4 w-4" />
                  {t("createPosterFree")}
                </Link>
                <Link
                  href="/players"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-6 py-3.5 text-sm font-medium text-yellow-300 transition-all hover:bg-yellow-500/20"
                >
                  <CreditCard className="h-4 w-4" />
                  {t("toolPlayerCards")}
                </Link>
                <Link
                  href="/schedule"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-white/10"
                >
                  <CalendarDays className="h-4 w-4" />
                  {t("viewSchedule")}
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-6 flex flex-wrap items-center gap-6">
                <div>
                  <p className="text-2xl font-bold text-white">70+</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("matchesLabel")}</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <p className="text-2xl font-bold text-white">150+</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("playersLabel")}</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <p className="text-2xl font-bold text-white">10</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("teamsLabel")}</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <p className="text-2xl font-bold text-primary">8</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Tools</p>
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
                    <div className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center">
                      {teamLogoUrls[team.shortName] ? (
                        <Image
                          src={teamLogoUrls[team.shortName]!}
                          alt={team.shortName}
                          width={48}
                          height={48}
                          className="h-full w-full object-contain drop-shadow-lg saturate-125 brightness-110 logo-clip"
                          unoptimized
                        />
                      ) : (
                        <span className="text-[11px] font-black" style={{ color: team.primaryColor }}>
                          {team.shortName}
                        </span>
                      )}
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

      {/* ── IPL 2025 Highlight + Quick Navigate ───────────── */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">

          {/* IPL 2025 Featured Banner */}
          <div className="relative overflow-hidden rounded-2xl border border-primary/40 bg-gradient-to-r from-primary/20 via-primary/8 to-transparent p-4 sm:p-5 mb-6">
            <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
            <div className="absolute right-0 bottom-0 h-32 w-32 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Trophy + Title */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/20 ring-1 ring-primary/40">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xl font-black tracking-tight text-white">TATA IPL 2025</span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-red-500/40 bg-red-500/15 px-2 py-0.5 text-[10px] font-bold text-red-400">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-400" />
                      </span>
                      LIVE
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Mar 22 – Jun 1, 2025 &bull; 10 Teams &bull; 74 Matches &bull; India&apos;s Biggest Cricket League
                  </p>
                </div>
              </div>
              {/* Quick CTA buttons */}
              <div className="flex flex-wrap gap-2 sm:ml-auto">
                <Link href="/schedule" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90 transition-all">
                  <CalendarDays className="h-3.5 w-3.5" /> Schedule
                </Link>
                <Link href="/poster" className="inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-xs font-bold text-primary hover:bg-primary/20 transition-all">
                  <Zap className="h-3.5 w-3.5" /> Make Poster
                </Link>
                <Link href="/teams" className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-white hover:bg-white/10 transition-all">
                  <Users className="h-3.5 w-3.5" /> All Teams
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Navigate — all tools as icon grid */}
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Quick Navigate</p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`group relative flex flex-col items-center gap-2 rounded-xl border ${tool.border} ${tool.bg} px-2 py-3 text-center transition-all hover:scale-[1.04] hover:shadow-lg hover:border-white/20`}
                >
                  {tool.badge && (
                    <span className="absolute right-1.5 top-1.5 rounded-full bg-primary/80 px-1 py-px text-[8px] font-bold text-white leading-none">
                      {tool.badge}
                    </span>
                  )}
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
                    <tool.icon className={`h-[18px] w-[18px] ${tool.color}`} />
                  </div>
                  <span className="text-[10px] font-semibold leading-tight text-muted-foreground group-hover:text-white transition-colors">
                    {tool.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── All Tools ─────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-14">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Everything You Need in{" "}
              <span className="text-primary">One Place</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              8 tools built for cricket fans, businesses, and content creators.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Large card — poster (spans 2 cols on lg) */}
            {tools.slice(0, 1).map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`group relative overflow-hidden rounded-2xl border ${tool.border} bg-card p-6 transition-all duration-300 hover:border-white/20 hover:shadow-xl lg:col-span-2`}
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${tool.bg}`}>
                  <tool.icon className={`h-6 w-6 ${tool.color}`} />
                </div>
                {tool.badge && (
                  <span className={`absolute right-4 top-4 rounded-full px-2 py-0.5 text-[10px] font-bold ${tool.badgeColor}`}>
                    {tool.badge}
                  </span>
                )}
                <h3 className="mb-2 text-lg font-bold text-white">{tool.label}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
                <span className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold ${tool.color} opacity-0 transition-opacity group-hover:opacity-100`}>
                  Open Tool <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
            {/* Remaining tools */}
            {tools.slice(1).map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`group relative overflow-hidden rounded-2xl border ${tool.border} bg-card p-5 transition-all duration-300 hover:border-white/20 hover:shadow-lg`}
              >
                <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${tool.bg}`}>
                  <tool.icon className={`h-5 w-5 ${tool.color}`} />
                </div>
                {tool.badge && (
                  <span className={`absolute right-4 top-4 rounded-full px-2 py-0.5 text-[10px] font-bold ${tool.badgeColor}`}>
                    {tool.badge}
                  </span>
                )}
                <h3 className="mb-1.5 text-sm font-bold text-white">{tool.label}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{tool.description}</p>
                <span className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold ${tool.color} opacity-0 transition-opacity group-hover:opacity-100`}>
                  Open <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────── */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-14">
          <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
            {t("getStarted")}{" "}
            <span className="text-primary">{t("getStarted3Steps")}</span>
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

      {/* ── Countdown + Predictions ───────────────────────── */}
      <section className="border-t border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-14">
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Countdown — 2 cols */}
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-lg font-bold text-white">
                  {t("nextMatch")} <span className="text-primary">{t("nextMatchHighlight")}</span>
                </span>
              </div>
              <MatchCountdown />
            </div>
            {/* Prediction poll — 3 cols */}
            <div className="lg:col-span-3">
              <MatchPrediction />
            </div>
          </div>
        </div>
      </section>

      {/* ── Upcoming Matches ──────────────────────────────── */}
      <section className="border-t border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-14">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {t("upcomingMatches")}{" "}
              <span className="text-primary">{t("upcomingMatchesHighlight")}</span>
            </h2>
            <Link href="/schedule" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              {t("viewFullSchedule")} <ArrowRight className="h-3.5 w-3.5" />
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
                    <div className="h-8 w-8 rounded-full bg-white/5 p-1 flex items-center justify-center">
                      {teamLogoUrls[m.team1] ? (
                        <Image src={teamLogoUrls[m.team1]!} alt={m.team1} width={24} height={24} className="h-full w-full object-contain" unoptimized />
                      ) : (
                        <span className="text-[8px] font-black text-white/70">{m.team1}</span>
                      )}
                    </div>
                    <span className={`text-sm font-bold ${teamTextColors[m.team1]}`}>{m.team1}</span>
                  </div>
                  <span className="text-[10px] font-black text-primary">VS</span>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold ${teamTextColors[m.team2]}`}>{m.team2}</span>
                    <div className="h-8 w-8 rounded-full bg-white/5 p-1 flex items-center justify-center">
                      {teamLogoUrls[m.team2] ? (
                        <Image src={teamLogoUrls[m.team2]!} alt={m.team2} width={24} height={24} className="h-full w-full object-contain" unoptimized />
                      ) : (
                        <span className="text-[8px] font-black text-white/70">{m.team2}</span>
                      )}
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

      {/* ── Feature Highlights ────────────────────────────── */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            {/* Left: text */}
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                <Share2 className="h-3.5 w-3.5" /> Built for Virality
              </div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Create. Brand. Share.{" "}
                <span className="text-primary">Go Viral.</span>
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Every piece of content you create is automatically branded with your business details — name, phone, website, and social handles. One-tap export for WhatsApp, Instagram Stories, and Facebook.
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  "Auto-saves your business details across all tools",
                  "PNG exports optimised for WhatsApp & Instagram",
                  "Multi-language support: English, Hindi, Gujarati",
                  "100+ meme templates with AI-picked captions",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-[10px]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Right: mini tool cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { href: "/match-card", icon: Ticket,     label: "Match Card",    sub: "I'm going to the match!", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
                { href: "/own-poster", icon: Heart,       label: "Fan Support",   sub: "Cheer your favourite",    color: "text-rose-400",   bg: "bg-rose-500/10",   border: "border-rose-500/20" },
                { href: "/memes",      icon: Sparkles,    label: "Memes & Posts", sub: "100+ cricket templates",  color: "text-pink-400",   bg: "bg-pink-500/10",   border: "border-pink-500/20" },
                { href: "/players",    icon: CreditCard,  label: "Player Cards",  sub: "150+ cricketers",         color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group rounded-xl border ${item.border} bg-card p-4 transition-all hover:border-white/20 hover:shadow-md`}
                >
                  <div className={`mb-2.5 inline-flex h-9 w-9 items-center justify-center rounded-lg ${item.bg}`}>
                    <item.icon className={`h-4.5 w-4.5 ${item.color}`} />
                  </div>
                  <p className="text-sm font-bold text-white">{item.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.sub}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Teams Strip ───────────────────────────────────── */}
      <section className="border-t border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
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
                  {teamLogoUrls[team.shortName] ? (
                    <Image
                      src={teamLogoUrls[team.shortName]!}
                      alt={team.shortName}
                      width={32}
                      height={32}
                      className="h-8 w-8 object-contain saturate-125 brightness-110 drop-shadow-md logo-clip"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: team.primaryColor + "22" }}>
                      <span className="text-[10px] font-black" style={{ color: team.primaryColor }}>{team.shortName}</span>
                    </div>
                  )}
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

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-8 sm:p-12 text-center border border-primary/20">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold sm:text-3xl">Ready to Start Creating?</h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Posters, player cards, memes, match cards — all free, all branded with your business. Pick a tool and go.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/poster"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
                >
                  <Zap className="h-4 w-4" />
                  Create Match Poster
                </Link>
                <Link
                  href="/players"
                  className="inline-flex items-center gap-2 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-6 py-3 text-sm font-medium text-yellow-300 transition-all hover:bg-yellow-500/20"
                >
                  <CreditCard className="h-4 w-4" />
                  Player Cards
                </Link>
                <Link
                  href="/memes"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
                >
                  <Sparkles className="h-4 w-4" />
                  Memes & Posts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
