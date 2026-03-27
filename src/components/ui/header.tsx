"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Menu, X, Zap, Building2, Phone, Globe,
  Instagram, Facebook, Twitter, Save, Check, ChevronDown,
  Users, ImageIcon, Sparkles, HelpCircle, BookOpen,
  LogIn, LogOut, Home, Calendar, Trophy, Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useBusinessDetails } from "@/hooks/use-business-details";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useAuth } from "@/context/auth-context";
import { AuthModal } from "@/components/ui/auth-modal";
import { useLanguage } from "@/context/language-context";
import type { Lang, TranslationKey } from "@/lib/translations";

const LANG_OPTIONS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "hi", label: "हि" },
  { code: "gu", label: "ગુ" },
];

function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = LANG_OPTIONS.find((o) => o.code === lang)!;

  return (
    <div ref={ref} className="relative hidden sm:block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
      >
        {current.label}
        <ChevronDown className={cn("h-3 w-3 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-20 rounded-lg border border-white/10 bg-[#111113] py-1 shadow-xl z-50">
          {LANG_OPTIONS.map((opt) => (
            <button
              key={opt.code}
              onClick={() => { setLang(opt.code); setOpen(false); }}
              className={cn(
                "w-full px-3 py-1.5 text-left text-xs font-semibold transition-colors",
                opt.code === lang
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const primaryLinkDefs: { href: string; labelKey: TranslationKey; icon: React.ElementType }[] = [
  { href: "/", labelKey: "home", icon: Home },
  { href: "/players", labelKey: "playerCards", icon: Users },
  { href: "/schedule", labelKey: "schedule", icon: Calendar },
  { href: "/match-card", labelKey: "matchCard", icon: Trophy },
  { href: "/own-poster", labelKey: "fanSupport", icon: Heart },
];

const moreLinkDefs: { href: string; labelKey: TranslationKey; icon: React.ElementType }[] = [
  { href: "/teams", labelKey: "teams", icon: Users },
  { href: "/memes", labelKey: "memesAndPosts", icon: Sparkles },
  { href: "/instagram", labelKey: "toolInstagram", icon: Instagram },
  { href: "/poster", labelKey: "createPoster", icon: ImageIcon },
  { href: "/quiz", labelKey: "cricketQuiz", icon: HelpCircle },
  { href: "/help", labelKey: "helpAndGuide", icon: BookOpen },
  { href: "/about", labelKey: "aboutUs", icon: Users },
];

const BIZ_POPUP_KEY = "cricpost_biz_popup_shown";

function BusinessOnboardingPopup({ onAddDetails, onDismiss }: { onAddDetails: () => void; onDismiss: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onDismiss} />
      <div className="relative w-full max-w-sm rounded-2xl border border-primary/30 bg-[#111113] p-6 shadow-2xl shadow-black/60 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onDismiss}
          className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="mb-4 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/30">
          <Building2 className="h-7 w-7 text-primary" />
        </div>
        <h3 className="mb-2 text-center text-lg font-bold text-white">{t("personalizeYourPosters")}</h3>
        <p className="mb-4 text-center text-sm text-muted-foreground leading-relaxed">{t("bizPopupDesc")}</p>
        <ul className="mb-5 space-y-2">
          {([t("bizFeature1"), t("bizFeature2"), t("bizFeature3")] as string[]).map((item) => (
            <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
              {item}
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2">
          <button
            onClick={onAddDetails}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all"
          >
            <Building2 className="h-4 w-4" />
            {t("addBusinessDetails")}
          </button>
          <button
            onClick={onDismiss}
            className="rounded-xl py-2 text-xs text-muted-foreground hover:text-white transition-colors"
          >
            {t("skipForNow")}
          </button>
        </div>
      </div>
    </div>
  );
}

function MoreDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const pathname = usePathname();

  const anyMoreActive = moreLinkDefs.some(({ href }) => pathname === href || pathname.startsWith(href + "/"));

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
        className={cn(
          "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground hover:bg-secondary",
          anyMoreActive ? "text-primary bg-primary/10" : "text-muted-foreground"
        )}
      >
        {t("more")}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 w-48 rounded-xl border border-white/10 bg-[#111113] shadow-2xl shadow-black/60 z-50 py-1">
          {moreLinkDefs.map(({ href, labelKey, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium transition-colors hover:bg-white/5",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {t(labelKey) as string}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function BusinessDetailsDropdown({ externalOpen, onExternalOpenConsumed }: { externalOpen?: boolean; onExternalOpenConsumed?: () => void } = {}) {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { details, updateField, loaded } = useBusinessDetails();
  const { t } = useLanguage();

  const hasAny = !!(
    details.companyName || details.phone || details.website ||
    details.instagram || details.facebook || details.twitter
  );

  // Open when triggered externally (e.g. from onboarding popup)
  useEffect(() => {
    if (externalOpen) {
      setOpen(true);
      onExternalOpenConsumed?.();
    }
  }, [externalOpen, onExternalOpenConsumed]);

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
    <div ref={ref} className="relative group/biz">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "hidden sm:inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all",
          hasAny
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
            : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10"
        )}
      >
        <Building2 className="h-4 w-4" />
        <span>{hasAny ? details.companyName || t("myBusiness") : t("addBusiness")}</span>
        {hasAny && <span className="flex h-2 w-2 rounded-full bg-emerald-400" />}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>

      {/* Tooltip — only when no details and dropdown is closed */}
      {!hasAny && !open && (
        <div className="pointer-events-none absolute right-0 top-full mt-2 w-56 rounded-xl border border-primary/30 bg-[#111113] px-3 py-2.5 text-xs shadow-xl opacity-0 group-hover/biz:opacity-100 transition-opacity duration-200 z-50">
          <p className="font-semibold text-primary mb-0.5">{t("addYourBusinessDetails")}</p>
          <p className="text-muted-foreground leading-relaxed">{t("personalizePostersTooltip")}</p>
        </div>
      )}

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-white/10 bg-[#111113] shadow-2xl shadow-black/60 z-50">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-white">{t("businessDetails")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                <Save className="h-3 w-3" /> {t("autoSaved")}
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
                <Building2 className="h-3 w-3" /> {t("companyBrandName")}
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
                <Phone className="h-3 w-3" /> {t("phone")}
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
                <Globe className="h-3 w-3" /> {t("website")}
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
                {saved ? <><Check className="h-3.5 w-3.5" /> {t("saved")}</> : <><Save className="h-3.5 w-3.5" /> {t("save")}</>}
              </button>
              <Link
                href="/own-poster"
                onClick={() => setOpen(false)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-all"
              >
                <Zap className="h-3.5 w-3.5" /> {t("createPoster")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function UserButton({ onSignIn }: { onSignIn: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user, signOut, authLoading } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (authLoading) return null;

  if (!user) {
    return (
      <button
        onClick={onSignIn}
        className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/10 transition-all"
      >
        <LogIn className="h-4 w-4" />
        {t("signIn")}
      </button>
    );
  }

  const initials = (user.email ?? "U").slice(0, 2).toUpperCase();

  return (
    <div ref={ref} className="relative hidden sm:block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1.5 text-sm font-medium text-emerald-400 hover:bg-emerald-500/20 transition-all"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] font-bold">
          {initials}
        </span>
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-white/10 bg-[#111113] shadow-2xl shadow-black/60 z-50 py-1.5">
          <div className="border-b border-white/10 px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{t("signedInAs")}</p>
            <p className="mt-0.5 truncate text-xs text-white">{user.email}</p>
          </div>
          <button
            onClick={() => { setOpen(false); signOut(); }}
            className="flex w-full items-center gap-2 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            {t("signOut")}
          </button>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDetailsOpen, setMobileDetailsOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [triggerBizOpen, setTriggerBizOpen] = useState(false);
  const { details, updateField, loaded } = useBusinessDetails();
  const { user, signOut, authLoading } = useAuth();
  const { t, lang, setLang } = useLanguage();
  const pathname = usePathname();
  const businessSectionRef = useRef<HTMLButtonElement>(null);

  function openMobileBusiness() {
    setMobileOpen(true);
    setMobileDetailsOpen(true);
    setTimeout(() => {
      businessSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 320);
  }

  const hasAny = !!(
    details.companyName || details.phone || details.website ||
    details.instagram || details.facebook || details.twitter
  );

  // Show onboarding popup once on first visit if no business details
  useEffect(() => {
    if (!loaded || hasAny) return;
    if (localStorage.getItem(BIZ_POPUP_KEY)) return;
    const t = setTimeout(() => setShowOnboarding(true), 1500);
    return () => clearTimeout(t);
  }, [loaded, hasAny]);

  function dismissOnboarding() {
    setShowOnboarding(false);
    localStorage.setItem(BIZ_POPUP_KEY, "1");
  }

  function handleOnboardingAddDetails() {
    dismissOnboarding();
    if (window.innerWidth < 640) {
      openMobileBusiness();
    } else {
      setTriggerBizOpen(true);
    }
  }

  return (
    <>
    {showOnboarding && (
      <BusinessOnboardingPopup
        onAddDetails={handleOnboardingAddDetails}
        onDismiss={dismissOnboarding}
      />
    )}
    {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            {/* Bat + Ball icon */}
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
              {/* C arc */}
              <path d="M15 5.2 Q11.5 2 8.5 3 Q4 4.5 4 10 Q4 15.5 8.5 17 Q11.5 18 15 14.8"
                    stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
              {/* Ball in C opening */}
              <circle cx="15.5" cy="10" r="2.8" fill="currentColor"/>
              {/* Ball seam */}
              <path d="M14.2 8 Q12.8 10 14.2 12" stroke="rgba(0,0,0,0.28)" strokeWidth="0.65" fill="none" strokeLinecap="round"/>
              <path d="M16.8 8 Q18.2 10 16.8 12" stroke="rgba(0,0,0,0.18)" strokeWidth="0.65" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">
            cricpost<span className="text-primary">.in</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {primaryLinkDefs.map(({ href, labelKey }) => {
            const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground hover:bg-secondary",
                  active ? "text-primary bg-primary/10" : "text-muted-foreground"
                )}
              >
                {t(labelKey) as string}
              </Link>
            );
          })}
          <MoreDropdown />
        </nav>

        {/* Right side: utilities → actions */}
        <div className="flex items-center gap-1.5">
          {/* Utility group */}
          <LanguageSwitcher />
          <ThemeSwitcher />
          {/* Separator */}
          <div className="hidden sm:block h-5 w-px bg-white/10 mx-1" />
          <UserButton onSignIn={() => setShowAuthModal(true)} />
          <BusinessDetailsDropdown
            externalOpen={triggerBizOpen}
            onExternalOpenConsumed={() => setTriggerBizOpen(false)}
          />
          {/* Mobile business button — highlighted, always visible on mobile */}
          {loaded && (
            <div className="relative group/mobiz sm:hidden">
              <button
                onClick={openMobileBusiness}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-all",
                  hasAny
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                    : "border-white/10 bg-white/5 text-muted-foreground"
                )}
              >
                <Building2 className="h-3.5 w-3.5" />
                <span>{t("business")}</span>
                {hasAny && <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />}
              </button>
              {!hasAny && (
                <div className="pointer-events-none absolute right-0 top-full mt-2 w-52 rounded-xl border border-primary/30 bg-[#111113] px-3 py-2.5 text-xs shadow-xl opacity-0 group-hover/mobiz:opacity-100 transition-opacity duration-200 z-50">
                  <p className="font-semibold text-primary mb-0.5">{t("addYourBusinessDetails")}</p>
                  <p className="text-muted-foreground leading-relaxed">{t("personalizePostersTooltipShort")}</p>
                </div>
              )}
            </div>
          )}
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
          "md:hidden transition-all duration-300 ease-in-out",
          mobileOpen
            ? "max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border"
            : "max-h-0 overflow-hidden"
        )}
      >
        <nav className="flex flex-col gap-1 p-4">
          {/* Mobile language switcher */}
          <div className="flex items-center gap-1 pb-2 border-b border-white/10 mb-1">
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.code}
                onClick={() => setLang(opt.code)}
                className={cn(
                  "flex-1 rounded-md py-1.5 text-sm font-semibold transition-all",
                  lang === opt.code
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-white"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Primary links grid */}
          <div className="grid grid-cols-2 gap-2 pb-2">
            {primaryLinkDefs.map(({ href, labelKey, icon: Icon }) => {
              const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl border px-3 py-3 text-sm font-medium transition-colors active:bg-white/10",
                    active
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-white/8 bg-white/[0.04] text-muted-foreground hover:text-foreground hover:bg-white/8"
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="leading-tight">{t(labelKey) as string}</span>
                </Link>
              );
            })}
          </div>

          {/* More links grid */}
          <div className="grid grid-cols-2 gap-2 border-t border-white/8 pt-2">
            {moreLinkDefs.map(({ href, labelKey, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl border px-3 py-3 text-sm font-medium transition-colors active:bg-white/10",
                    active
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-white/8 bg-white/[0.04] text-muted-foreground hover:text-foreground hover:bg-white/8"
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="leading-tight">{t(labelKey) as string}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile business details toggle */}
          <button
            ref={businessSectionRef}
            onClick={() => setMobileDetailsOpen((o) => !o)}
            className={cn(
              "mt-2 flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm font-medium transition-all",
              hasAny
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                : "border-primary/60 bg-primary/10 text-primary ring-1 ring-primary/30"
            )}
          >
            <span className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              {hasAny ? details.companyName || t("myBusiness") : t("addBusinessDetails")}
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
                <Save className="h-3 w-3" /> {t("changesAutoSaved")}
              </p>
            </div>
          )}

          {/* Mobile auth button */}
          {!authLoading && (
            user ? (
              <button
                onClick={() => { setMobileOpen(false); signOut(); }}
                className="mt-1 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-medium text-muted-foreground"
              >
                <LogOut className="h-4 w-4" />
                {t("signOut")}
                <span className="ml-auto truncate max-w-[140px] text-xs text-white/50">{user.email}</span>
              </button>
            ) : (
              <button
                onClick={() => { setMobileOpen(false); setShowAuthModal(true); }}
                className="mt-1 flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2.5 text-sm font-medium text-primary"
              >
                <LogIn className="h-4 w-4" />
                {t("signInRegister")}
              </button>
            )
          )}

          <Link
            href="/own-poster"
            onClick={() => setMobileOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            <Zap className="h-4 w-4" />
            {t("createNow")}
          </Link>
        </nav>
      </div>
    </header>
    </>
  );
}
