"use client";

import { useState, useRef } from "react";
import { Copy, Check, Download, Loader2, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

type PostCategory = "All" | "Hype" | "Team" | "Fact" | "Matchday" | "Prediction";

interface InstaPost {
  id: number;
  category: Exclude<PostCategory, "All">;
  emoji: string;
  headline: string;
  subline: string;
  caption: string;
  gradientClass: string;
  decorClass: string;
  lightText: boolean;
}

const POSTS: InstaPost[] = [
  {
    id: 1,
    category: "Hype",
    emoji: "🏏",
    headline: "IPL 2026\nIS HERE!",
    subline: "The Greatest Cricket Show on Earth",
    caption:
      "🏏 The biggest cricket party on the planet is BACK!\n\nIPL 2026 has officially arrived and we are HERE for it! Stadiums full, boundaries flying, and legends in the making. 🏟️🔥\n\nWhich team are you backing this season? Drop your team below! 👇\n\n#IPL2026 #IPL #Cricket #IndianPremierLeague #CricketFever #IPLFever #T20Cricket #BCCI #CricketIndia",
    gradientClass: "bg-gradient-to-br from-orange-500 to-red-700",
    decorClass: "bg-yellow-300/20",
    lightText: true,
  },
  {
    id: 2,
    category: "Team",
    emoji: "🦁",
    headline: "YELLOW\nARMY\nRISE!",
    subline: "Chennai Super Kings 🏆🏆🏆🏆🏆",
    caption:
      "💛 Yellow never goes out of fashion!\n\nCSK fans, this one's for you. Five-time champions, the most loyal fanbase in cricket — through wins, bans, and every last over heartbreak. 🏆\n\nWhistle Podu! Drop a 💛 if you bleed yellow!\n\n#CSK #ChennaiSuperKings #WhistlePodu #ThalaForever #MSDhoni #IPL2026 #YellowArmy",
    gradientClass: "bg-gradient-to-br from-yellow-400 to-amber-600",
    decorClass: "bg-white/15",
    lightText: false,
  },
  {
    id: 3,
    category: "Team",
    emoji: "⚡",
    headline: "5x\nCHAMPIONS",
    subline: "Mumbai Indians 💙",
    caption:
      "⚡ 5 titles. 1 dynasty.\n\nNo team in IPL history has dominated like Mumbai Indians. The most successful franchise — built on grit, power, and sheer belief. 💙\n\nAre you riding with the Blue Brigade? Comment 'MI' below! 👇\n\n#MumbaiIndians #MI #IPL2026 #CricketIndia #BlueBrigade #JeetegaMera #T20Cricket",
    gradientClass: "bg-gradient-to-br from-blue-600 to-blue-950",
    decorClass: "bg-sky-300/15",
    lightText: true,
  },
  {
    id: 4,
    category: "Team",
    emoji: "🔴",
    headline: "EE SALA\nCUP\nNAMDE",
    subline: "Royal Challengers Bengaluru ❤️",
    caption:
      "❤️ 18 years of faith. Still standing strong.\n\nRCB fans are built from a different kind of passion. Every season, every heartbreak — and yet here we are, believing harder than ever.\n\nThis season FEELS different. Ee Sala Cup Namde! 🏆\n\n#RCB #EeSalaCupNamde #RoyalChallengers #Bengaluru #IPL2026 #Virat #CricketIndia",
    gradientClass: "bg-gradient-to-br from-red-600 to-red-950",
    decorClass: "bg-yellow-500/15",
    lightText: true,
  },
  {
    id: 5,
    category: "Team",
    emoji: "💜",
    headline: "KORBO\nLORBO\nJEETBO",
    subline: "Kolkata Knight Riders 👑",
    caption:
      "💜 Purple & Gold forever!\n\nKKR — the franchise built on royalty, skill, and iconic fan energy. Three-time champions and always dangerous. The Knight Riders are here to conquer IPL 2026! 🏆\n\nAre you part of the Purple Army? Drop a 💜 below!\n\n#KKR #KolkataKnightRiders #KorboLorboJeetbo #PurpleArmy #IPL2026 #Cricket",
    gradientClass: "bg-gradient-to-br from-purple-700 to-purple-950",
    decorClass: "bg-yellow-400/10",
    lightText: true,
  },
  {
    id: 6,
    category: "Team",
    emoji: "🌅",
    headline: "ORANGE\nARMY\nATTACK!",
    subline: "Sunrisers Hyderabad 🧡",
    caption:
      "🧡 The Sunrisers are RISING!\n\nSRH's fearless batting lineup is ready to take IPL 2026 by storm. The Orange Army never sleeps! 🌅\n\nHyderabad fans, show some love! Drop a 🧡 in the comments!\n\n#SRH #SunrisersHyderabad #OrangeArmy #IPL2026 #CricketIndia #T20Cricket",
    gradientClass: "bg-gradient-to-br from-orange-400 to-orange-700",
    decorClass: "bg-red-500/20",
    lightText: true,
  },
  {
    id: 7,
    category: "Team",
    emoji: "💎",
    headline: "AAVA DE\nTITANS!",
    subline: "Gujarat Titans — Champions on Debut 🏆",
    caption:
      "💎 Built from the ground up. Built to last.\n\nGujarat Titans burst onto the IPL scene and immediately became champions in their debut season — one of the greatest stories in cricket history!\n\nGT fans, show your love! 👇\n\n#GT #GujaratTitans #AavaDe #IPL2026 #Cricket #Gujarat #Titans",
    gradientClass: "bg-gradient-to-br from-cyan-600 to-slate-900",
    decorClass: "bg-cyan-300/10",
    lightText: true,
  },
  {
    id: 8,
    category: "Matchday",
    emoji: "🔥",
    headline: "GAME\nDAY\nVIBES",
    subline: "Turn up the energy! 🏟️",
    caption:
      "🔥 It's cricket o'clock!\n\nNothing beats the rush of IPL match day. The stadium roars, the crowd goes wild, and legends are born under pressure. 🏟️\n\nAre you watching today? Comment your city! 👇\n\n#IPL2026 #MatchDay #Cricket #IPLMatchDay #CricketFever #BCCI #T20 #LiveCricket",
    gradientClass: "bg-gradient-to-br from-rose-500 to-orange-700",
    decorClass: "bg-yellow-400/15",
    lightText: true,
  },
  {
    id: 9,
    category: "Matchday",
    emoji: "📺",
    headline: "LIGHTS.\nCAMERA.\nCRICKET.",
    subline: "IPL 2026 — Every match is a blockbuster",
    caption:
      "📺 Popcorn ready. Jersey on. Phone charged.\n\nIPL 2026 match day is a full-on event and we wouldn't have it any other way! Whether you're at the stadium or watching from home — let's make some NOISE! 🎉\n\nTag your cricket squad below! 👇\n\n#IPL2026 #CricketNight #MatchDay #IPLLive #CricketFamily #T20Cricket",
    gradientClass: "bg-gradient-to-br from-violet-600 to-indigo-950",
    decorClass: "bg-pink-400/10",
    lightText: true,
  },
  {
    id: 10,
    category: "Fact",
    emoji: "🏆",
    headline: "IPL\nCHAMPIONS\nBOARD",
    subline: "Who has lifted the trophy?",
    caption:
      "📊 IPL Championship Roll Call — Who's on the winners list?\n\n🥇 MI — 5 titles\n🥇 CSK — 5 titles\n🥇 KKR — 3 titles\n🥇 SRH — 1 title\n🥇 RR — 1 title\n🥇 GT — 1 title\n\nWho adds another star in IPL 2026? 👇\n\n#IPL2026 #Cricket #CricketFacts #IPLHistory #IndianPremierLeague #BCCI",
    gradientClass: "bg-gradient-to-br from-slate-700 to-slate-950",
    decorClass: "bg-yellow-500/10",
    lightText: true,
  },
  {
    id: 11,
    category: "Fact",
    emoji: "💨",
    headline: "140+\nKM/H\nPACE",
    subline: "IPL's elite fast bowlers ⚡",
    caption:
      "💨 140+ km/h — and the batsman has just 0.4 seconds to react.\n\nIPL fast bowlers are elite athletes delivering thunderbolts under the brightest lights, in front of 80,000 screaming fans. The pressure is IMMENSE! ⚡\n\nWho's your favourite pace bowler this IPL? Comment below! 👇\n\n#IPL2026 #FastBowling #Cricket #CricketFacts #Pace #T20Cricket",
    gradientClass: "bg-gradient-to-br from-emerald-600 to-green-950",
    decorClass: "bg-emerald-300/10",
    lightText: true,
  },
  {
    id: 12,
    category: "Prediction",
    emoji: "🔮",
    headline: "WHO\nWINS\nIPL 2026?",
    subline: "Drop your prediction! 👇",
    caption:
      "🔮 The million-rupee question — Who lifts the IPL 2026 trophy?\n\nDrop your prediction in the comments!\n\n1️⃣ CSK\n2️⃣ MI\n3️⃣ RCB\n4️⃣ KKR\n5️⃣ SRH\n6️⃣ Other — name them!\n\nLet's see which fanbase is most confident! 😏\n\n#IPL2026 #CricketPrediction #IPLPrediction #CricketFans #IPL #Cricket #WhoWins",
    gradientClass: "bg-gradient-to-br from-indigo-600 to-violet-950",
    decorClass: "bg-pink-500/15",
    lightText: true,
  },
  {
    id: 13,
    category: "Hype",
    emoji: "🚀",
    headline: "MAXIMUM!\nSIX!",
    subline: "The shot that breaks the internet 🌐",
    caption:
      "🚀 When the ball disappears into the stands...\n\nThere is NOTHING in cricket that gets the crowd on its feet like a massive SIX over long-on! Pure electricity! ⚡\n\nWho's your favourite six-hitter in IPL 2026? Tag them below! 👇\n\n#IPL2026 #SIX #Maximum #CricketShots #T20Cricket #BigHit #CricketFans",
    gradientClass: "bg-gradient-to-br from-amber-400 to-yellow-600",
    decorClass: "bg-white/10",
    lightText: false,
  },
  {
    id: 14,
    category: "Prediction",
    emoji: "🎯",
    headline: "WHO'S\nYOUR\nFAVOURITE?",
    subline: "Top run scorer of IPL 2026?",
    caption:
      "🎯 Who will be the Orange Cap winner of IPL 2026?\n\nEvery IPL season produces a runscoring machine that just cannot be stopped! Who do you think will top the batting charts this year?\n\nDrop your pick in the comments! 👇\n\n#IPL2026 #OrangeCap #CricketPrediction #IPLBatting #Cricket #T20 #CricketFans",
    gradientClass: "bg-gradient-to-br from-pink-600 to-rose-950",
    decorClass: "bg-orange-300/10",
    lightText: true,
  },
  {
    id: 15,
    category: "Hype",
    emoji: "🏟️",
    headline: "CRICKET\nSZN IS\nLIVE!",
    subline: "IPL 2026 — 74 matches. 10 teams. 1 champion.",
    caption:
      "🏟️ 74 matches. 10 teams. Millions of fans. 1 champion.\n\nIPL 2026 is the biggest sporting spectacle on the subcontinent and it is LIVE! Are you ready for the greatest season of cricket? 🏏🔥\n\nShare this with your cricket squad! 👇\n\n#IPL2026 #CricketSeason #IPL #Cricket #T20Cricket #CricketIndia #BCCI #IPLFever",
    gradientClass: "bg-gradient-to-br from-teal-500 to-cyan-900",
    decorClass: "bg-white/10",
    lightText: true,
  },
];

const CATEGORIES: PostCategory[] = ["All", "Hype", "Team", "Matchday", "Fact", "Prediction"];

const CATEGORY_COLORS: Record<PostCategory, string> = {
  All: "bg-primary/10 text-primary border-primary/20",
  Hype: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Team: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Matchday: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  Fact: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Prediction: "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

function PostCard({ post }: { post: InstaPost }) {
  const visualRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleDownload() {
    if (!visualRef.current) return;
    setDownloading(true);
    try {
      const { default: html2canvas } = await import("html2canvas-pro");
      const canvas = await html2canvas(visualRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
      });
      const link = document.createElement("a");
      link.download = `IPL2026-instagram-post-${post.id}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(false);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(post.caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-card overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Square Visual — this gets captured as the Instagram image */}
      <div
        ref={visualRef}
        className={cn(
          "relative aspect-square w-full overflow-hidden flex flex-col items-center justify-center text-center p-8",
          post.gradientClass
        )}
      >
        {/* Decorative circles */}
        <div className={cn("absolute -top-16 -right-16 w-48 h-48 rounded-full", post.decorClass)} />
        <div className={cn("absolute -bottom-10 -left-10 w-36 h-36 rounded-full", post.decorClass)} />
        <div className={cn("absolute top-1/3 -left-6 w-20 h-20 rounded-full", post.decorClass)} />
        <div className={cn("absolute bottom-1/3 -right-4 w-16 h-16 rounded-full", post.decorClass)} />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          <span className="text-[4.5rem] leading-none drop-shadow-lg">{post.emoji}</span>
          <h2
            className={cn(
              "text-3xl font-black uppercase tracking-tight leading-tight whitespace-pre-line drop-shadow",
              post.lightText ? "text-white" : "text-gray-900"
            )}
          >
            {post.headline}
          </h2>
          <p
            className={cn(
              "text-[11px] font-semibold uppercase tracking-widest px-3 text-center leading-snug",
              post.lightText ? "text-white/70" : "text-gray-700"
            )}
          >
            {post.subline}
          </p>
        </div>

        {/* Bottom branding */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center">
          <span
            className={cn(
              "text-[10px] font-semibold tracking-widest uppercase",
              post.lightText ? "text-white/40" : "text-gray-600/60"
            )}
          >
            IPL 2026 · cricpost.in
          </span>
        </div>
      </div>

      {/* Caption & Actions */}
      <div className="flex flex-col gap-3 p-4">
        {/* Category badge */}
        <span
          className={cn(
            "self-start inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
            CATEGORY_COLORS[post.category]
          )}
        >
          {post.category}
        </span>

        {/* Caption preview */}
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4 whitespace-pre-line">
          {post.caption}
        </p>

        {/* Action buttons */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={handleCopy}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all",
              copied
                ? "bg-green-500/15 text-green-400 border border-green-500/30"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/70 border border-transparent"
            )}
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied!" : "Copy Caption"}
          </button>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-primary/10 border border-primary/20 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary/20 transition-all disabled:opacity-50"
          >
            {downloading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Download className="h-3.5 w-3.5" />
            )}
            {downloading ? "..." : "Download"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function InstagramClient() {
  const [activeCategory, setActiveCategory] = useState<PostCategory>("All");

  const filtered =
    activeCategory === "All" ? POSTS : POSTS.filter((p) => p.category === activeCategory);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-pink-500/10 border border-pink-500/20 px-4 py-1.5">
          <Instagram className="h-4 w-4 text-pink-400" />
          <span className="text-sm font-bold text-pink-400">Instagram Marketing</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight">
          Ready-to-Post{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">
            IPL Images
          </span>
        </h1>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">
          Download the image · Copy the caption · Post on Instagram in seconds.
          <br />
          All images export at high resolution — perfect for Instagram.
        </p>
      </div>

      {/* How to use */}
      <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
        {[
          { num: "1", text: "Pick a post below" },
          { num: "2", text: "Click Download Image" },
          { num: "3", text: "Copy the caption" },
          { num: "4", text: "Post on Instagram!" },
        ].map((step) => (
          <div key={step.num} className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary text-[10px] font-bold">
              {step.num}
            </span>
            <span>{step.text}</span>
          </div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-semibold transition-all border",
              activeCategory === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary/50 text-muted-foreground hover:text-foreground border-transparent hover:border-white/10"
            )}
          >
            {cat}
            {cat !== "All" && (
              <span className="ml-1.5 text-[10px] opacity-60">
                ({POSTS.filter((p) => p.category === cat).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Footer tip */}
      <p className="text-center text-xs text-muted-foreground/60 pb-4">
        💡 Tip: Download the image and paste the caption separately in Instagram for the best result.
      </p>
    </div>
  );
}
