# DECISIONS — IPL 2026 Viral Poster Platform

> Architecture and design decisions with rationale.

---

## D1: Canvas Library — Fabric.js
**Decision**: Use Fabric.js for poster/meme canvas editor.
**Rationale**: Mature library, strong text/image manipulation, client-side export to PNG/JPG, large community.

## D2: Database & Auth — Supabase
**Decision**: Supabase for Postgres, Auth, Realtime, and Storage.
**Rationale**: Single platform for DB + auth + file storage + realtime events. RLS provides row-level security. Free tier sufficient for MVP.

## D3: Multi-Language — 3 Languages at Launch
**Decision**: English, Hindi, Gujarati only at launch.
**Rationale**: Core IPL audience. Hindi covers majority. Gujarati added for Gujarat-based business user segment.

## D4: Sharing Strategy — WhatsApp First
**Decision**: Prioritize WhatsApp sharing over other platforms.
**Rationale**: #1 messaging app in India. Viral loop: shared poster → recipient sees branding → visits platform.

## D5: Monetization — Freemium with Watermark
**Decision**: Free tier with watermark, paid tiers remove watermark + unlock features.
**Rationale**: Watermark serves dual purpose — monetization driver AND free marketing.

## D6: Image Export — Client-Side
**Decision**: Export posters client-side via canvas.toDataURL().
**Rationale**: No server load for image generation. Faster export. Reduces infrastructure cost.

## D7: Payment Provider — Stripe
**Decision**: Use Stripe for payments.
**Rationale**: User confirmed. Free tier first, then very nominal fees. Stripe has good India support with UPI/cards.

## D8: AI Provider — Free Tier (Hugging Face)
**Decision**: Use Hugging Face Inference API (free) for AI meme generation.
**Rationale**: User wants free option. HF provides free inference for text generation models. Can upgrade later.

## D9: Match Data — CricketData.org
**Decision**: Use free third-party cricket API (CricketData.org or similar free API).
**Rationale**: User confirmed free third-party. Will supplement with manual admin panel for reliability.

## D10: UI Theme — Dark Mode Default
**Decision**: Modern dark theme as default and primary design.
**Rationale**: User requested. Dark theme is trendy, reduces eye strain, and makes vibrant IPL team colors pop.
