# TASKS — IPL 2026 Viral Poster Platform

> `[ ]` todo | `[x]` done | `[~]` in-progress | `[!]` blocked

---

## Milestone 1: Project Setup & Infrastructure

- [ ] Initialize Next.js 15 project with TypeScript, Tailwind, pnpm
- [ ] Configure ESLint, Prettier, tsconfig strict mode
- [ ] Set up Supabase project (DB, Auth, Storage)
- [ ] Create `.env.example` with all required env vars
- [ ] Set up Vercel deployment pipeline
- [ ] Install shadcn/ui + core components (Button, Card, Dialog, Input, Skeleton)
- [ ] Create base layout (header, footer, mobile nav)
- [ ] Set up middleware.ts for Supabase session refresh

## Milestone 2: Auth & User Management

- [ ] Supabase Auth — email + Google OAuth
- [ ] Login / Register / Forgot Password pages
- [ ] Protected route layout with session check
- [ ] User profiles table + RLS policies
- [ ] User gallery table (saved posters)

## Milestone 3: Poster Generator (Canvas)

- [ ] Integrate Fabric.js canvas component
- [ ] Template data model (Supabase table + Storage for assets)
- [ ] Template browser page with categories & search
- [ ] Canvas editor page — load template, edit text/images
- [ ] Add sticker/logo overlay system
- [ ] Business branding overlay (logo + contact)
- [ ] Export to PNG/JPG (client-side canvas export)
- [ ] Watermark logic (free tier = watermark, Pro = clean)

## Milestone 4: Live Match Trigger System

- [ ] Match events table schema (match_id, event_type, timestamp, metadata)
- [ ] Supabase Realtime subscription for match events
- [ ] Admin panel to push match events manually
- [ ] Auto-generate template suggestions on events
- [ ] Trending section on homepage (sorted by recency + event type)
- [ ] Push notification integration (web push / service worker)

## Milestone 5: AI Meme Generator

- [ ] AI prompt input UI
- [ ] Backend: prompt → caption generation (OpenAI / Claude API)
- [ ] Match AI caption to best-fit meme template
- [ ] Render AI meme on canvas for editing
- [ ] Rate limiting on AI calls (free: 3/day, Pro: 20/day)

## Milestone 6: Multi-Language Support

- [ ] Set up next-intl (or equivalent) for i18n
- [ ] Translate UI strings: English, Hindi, Gujarati
- [ ] Language picker in header
- [ ] Template text variants per language
- [ ] RTL/script rendering validation for Devanagari & Gujarati

## Milestone 7: Sharing & Virality

- [ ] WhatsApp share (wa.me deep link with image blob)
- [ ] Instagram Stories share (download + instructions)
- [ ] Share tracking table (poster_id, platform, count)
- [ ] Viral coefficient dashboard (admin)
- [ ] OG meta tags for shared poster links

## Milestone 8: Monetization & Payments

- [ ] Subscription plans table + RLS
- [ ] Razorpay / Stripe integration for payments
- [ ] Plan selection page with pricing cards
- [ ] Webhook handler for payment confirmation
- [ ] Feature gating (watermark, daily limits, premium templates)
- [ ] Premium template packs (one-time purchase flow)

## Milestone 9: SEO & Landing Pages

- [ ] Landing page: "IPL Poster Maker"
- [ ] Landing page: "Cricket Meme Generator"
- [ ] Blog/content section for SEO
- [ ] Sitemap generation
- [ ] Structured data (JSON-LD)

## Milestone 10: Testing & Launch

- [ ] Unit tests for core utilities and Zod schemas
- [ ] E2E tests for auth flow, poster creation, sharing
- [ ] Performance audit (Lighthouse, Core Web Vitals)
- [ ] Security audit (RLS, input validation, rate limiting)
- [ ] Production deployment & monitoring setup
