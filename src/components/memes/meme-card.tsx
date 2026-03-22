"use client";

import { useState } from "react";
import { Copy, Check, Share2, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type MemeCategory = "Funny" | "Fact" | "Prediction" | "Team Banter" | "Match Day" | "Legend";
export type MemeLanguage = "English" | "Hindi" | "Gujarati";

export interface Meme {
  id: number;
  category: MemeCategory;
  language: MemeLanguage;
  emoji: string;
  title: string;
  content: string;
  hashtags: string[];
  accent: string;
  accentBg: string;
  accentBorder: string;
}

export function MemeCard({ meme }: { meme: Meme }) {
  const [copied, setCopied] = useState(false);

  const fullText = `${meme.emoji} ${meme.title}\n\n${meme.content}\n\n${meme.hashtags.join(" ")}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const encoded = encodeURIComponent(fullText);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      await navigator.share({ text: fullText });
    } else {
      handleWhatsApp();
    }
  };

  return (
    <div
      className={cn(
        "group anim-fade-in-up relative flex flex-col gap-4 rounded-2xl border bg-card p-5 transition-all duration-300",
        "hover:shadow-2xl hover:-translate-y-1.5 hover:border-opacity-60",
        meme.accentBorder
      )}
    >
      {/* Category + Language Badge */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
              meme.accentBg,
              meme.accent
            )}
          >
            {meme.category}
          </span>
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border",
              meme.language === "Hindi"
                ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
                : meme.language === "Gujarati"
                ? "bg-green-500/10 text-green-400 border-green-500/20"
                : "bg-blue-500/10 text-blue-400 border-blue-500/20"
            )}
          >
            {meme.language === "Hindi" ? "🇮🇳 हिंदी" : meme.language === "Gujarati" ? "🟠 ગુજરાતી" : "🌐 EN"}
          </span>
        </div>
        <span className="text-2xl transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6 inline-block">{meme.emoji}</span>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-foreground leading-snug">{meme.title}</h3>

      {/* Content */}
      <p className="flex-1 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
        {meme.content}
      </p>

      {/* Hashtags */}
      <div className="flex flex-wrap gap-1.5">
        {meme.hashtags.map((tag) => (
          <span
            key={tag}
            className={cn("rounded-full px-2 py-0.5 text-xs font-medium", meme.accentBg, meme.accent)}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-1 border-t border-border">
        <button
          onClick={handleCopy}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all",
            copied
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
          )}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied!" : "Copy"}
        </button>

        <button
          onClick={handleWhatsApp}
          className="flex items-center justify-center gap-2 rounded-lg bg-green-600/20 px-3 py-2 text-sm font-medium text-green-400 border border-green-600/20 transition-all hover:bg-green-600/30"
          title="Share on WhatsApp"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          WhatsApp
        </button>

        <button
          onClick={handleNativeShare}
          className="flex items-center justify-center rounded-lg bg-secondary p-2 text-muted-foreground transition-all hover:text-foreground hover:bg-secondary/80"
          title="Share"
        >
          <Share2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
