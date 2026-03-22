"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Menu, X, Zap, Trophy, Building2, Phone, Globe,
  Instagram, Facebook, Twitter, Save, Check, ChevronDown,
  Users, ImageIcon, Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useBusinessDetails } from "@/hooks/use-business-details";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/players", label: "Player Cards" },
  { href: "/schedule", label: "Schedule" },
  { href: "/match-card", label: "Match Card" },
  { href: "/own-poster", label: "Fan Support" },
];

const moreLinks = [
  { href: "/teams", label: "Teams", icon: Users },
  { href: "/memes", label: "Memes & Posts", icon: Sparkles },
  { href: "/poster", label: "Create Poster", icon: ImageIcon },
];

const allNavLinks = [...primaryLinks, ...moreLinks.map(({ href, label }) => ({ href, label }))];

function MoreDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
      >
        More
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 w-44 rounded-xl border border-white/10 bg-[#111113] shadow-2xl shadow-black/60 z-50 py-1">
          {moreLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function BusinessDetailsDropdown() {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { details, updateField, loaded } = useBusinessDetails();

  const hasAny = !!(
    details.companyName || details.phone || details.website ||
    details.instagram || details.facebook || details.twitter
  );

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function handleSave() {
    setSaved(true);
    setTimeout(() => { setSaved(false); setOpen(false); }, 1200);
  }

  if (!loaded) return null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "hidden sm:inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all",
          hasAny
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
            : "border-white/10 bg-white/5 text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/10"
        )}
      >
        <Building2 className="h-4 w-4" />
        <span>{hasAny ? details.companyName || "My Business" : "Add Business"}</span>
        {hasAny && <span className="flex h-2 w-2 rounded-full bg-emerald-400" />}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-white/10 bg-[#111113] shadow-2xl shadow-black/60 z-50">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-white">Business Details</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                <Save className="h-3 w-3" /> Auto-saved
              </span>
              <button onClick={() => setOpen(false)} className="rounded p-0.5 text-muted-foreground hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2.5 p-4">
            {/* Company */}
            <div>
              <label className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                <Building2 className="h-3 w-3" /> Company / Brand Name
              </label>
              <input
                type="text"
                placeholder="Your Business Name"
                value={details.companyName}
                onChange={(e) => updateField("companyName", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                <Phone className="h-3 w-3" /> Phone
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={details.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Website */}
            <div>
              <label className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                <Globe className="h-3 w-3" /> Website
              </label>
              <input
                type="url"
                placeholder="www.yourbusiness.com"
                value={details.website}
                onChange={(e) => updateField("website", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Social row */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-pink-400">
                  <Instagram className="h-3 w-3" /> IG
                </label>
                <input
                  type="text"
                  placeholder="@handle"
                  value={details.instagram}
                  onChange={(e) => updateField("instagram", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-xs text-white placeholder:text-white/25 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400"
                />
              </div>
              <div>
                <label className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-blue-400">
                  <Facebook className="h-3 w-3" /> FB
                </label>
                <input
                  type="text"
                  placeholder="@page"
                  value={details.facebook}
                  onChange={(e) => updateField("facebook", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-xs text-white placeholder:text-white/25 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <Twitter className="h-3 w-3" /> X
                </label>
                <input
                  type="text"
                  placeholder="@handle"
                  value={details.twitter}
                  onChange={(e) => updateField("twitter", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-xs text-white placeholder:text-white/25 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Save + CTA */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={handleSave}
                className={cn(
                  "flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all",
                  saved
                    ? "bg-emerald-500 text-white"
                    : "bg-white/10 text-white hover:bg-white/15"
                )}
              >
                {saved ? <><Check className="h-3.5 w-3.5" /> Saved!</> : <><Save className="h-3.5 w-3.5" /> Save</>}
              </button>
              <Link
                href="/poster"
                onClick={() => setOpen(false)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-all"
              >
                <Zap className="h-3.5 w-3.5" /> Create Poster
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDetailsOpen, setMobileDetailsOpen] = useState(false);
  const { details, updateField, loaded } = useBusinessDetails();

  const hasAny = !!(
    details.companyName || details.phone || details.website ||
    details.instagram || details.facebook || details.twitter
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Trophy className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Cric<span className="text-primary">Pro</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
            >
              {link.label}
            </Link>
          ))}
          <MoreDropdown />
        </nav>

        {/* CTA + Business Button + Mobile Toggle */}
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <BusinessDetailsDropdown />
          <Link
            href="/poster"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
          >
            <Zap className="h-4 w-4" />
            Create Now
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex md:hidden items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-secondary"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          mobileOpen ? "max-h-[600px] border-t border-border" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 p-4">
          {allNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile business details toggle */}
          <button
            onClick={() => setMobileDetailsOpen((o) => !o)}
            className={cn(
              "mt-2 flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm font-medium transition-all",
              hasAny
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                : "border-white/10 bg-white/5 text-muted-foreground"
            )}
          >
            <span className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              {hasAny ? details.companyName || "My Business" : "Add Business Details"}
              {hasAny && <span className="flex h-2 w-2 rounded-full bg-emerald-400" />}
            </span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", mobileDetailsOpen && "rotate-180")} />
          </button>

          {/* Mobile business fields */}
          {mobileDetailsOpen && loaded && (
            <div className="mt-1 space-y-2 rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <input
                type="text"
                placeholder="Company / Brand Name"
                value={details.companyName}
                onChange={(e) => updateField("companyName", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:border-primary focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={details.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:border-primary focus:outline-none"
              />
              <input
                type="url"
                placeholder="Website"
                value={details.website}
                onChange={(e) => updateField("website", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:border-primary focus:outline-none"
              />
              <div className="grid grid-cols-3 gap-2">
                <input type="text" placeholder="Instagram" value={details.instagram} onChange={(e) => updateField("instagram", e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-xs text-white placeholder:text-white/25 focus:border-pink-400 focus:outline-none" />
                <input type="text" placeholder="Facebook" value={details.facebook} onChange={(e) => updateField("facebook", e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-xs text-white placeholder:text-white/25 focus:border-blue-400 focus:outline-none" />
                <input type="text" placeholder="Twitter/X" value={details.twitter} onChange={(e) => updateField("twitter", e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-xs text-white placeholder:text-white/25 focus:border-primary focus:outline-none" />
              </div>
              <p className="flex items-center gap-1 text-[10px] text-emerald-400">
                <Save className="h-3 w-3" /> Changes saved automatically
              </p>
            </div>
          )}

          <Link
            href="/poster"
            onClick={() => setMobileOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            <Zap className="h-4 w-4" />
            Create Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
