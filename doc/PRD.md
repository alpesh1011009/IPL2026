# PRD — IPL 2026 Viral Poster Platform

## Vision
A viral IPL-based poster and meme generation platform where users create shareable cricket content and businesses promote offers tied to live matches.

## Target Users
- **Cricket fans** — create & share IPL posters/memes on WhatsApp/Instagram
- **Small businesses** — promote offers using IPL-themed templates
- **Content creators** — generate viral cricket content quickly

## Core Features

### F1: Poster Generator
- Template library (match-day, celebration, stats, memes)
- Fabric.js canvas editor — drag/drop text, images, stickers, team logos
- Custom branding overlay (business logo, contact info)
- Export as PNG/JPG, optimized for WhatsApp & Instagram Stories

### F2: Live Match Trigger System
- Real-time match events (wicket, six, century, win) via Supabase Realtime
- Auto-generate trending poster templates on key events
- Push notification: "India just hit a century! Create a poster now"
- Trending section sorted by match events

### F3: AI Meme Generator
- Text prompt → IPL meme (AI-generated captions + template matching)
- Trending meme formats pre-loaded
- User can edit AI output on canvas

### F4: Multi-Language Support
- English, Hindi (हिंदी), Gujarati (ગુજરાતી)
- Template text in all 3 languages
- UI fully localized (next-intl or similar)

### F5: WhatsApp Sharing Integration
- One-tap share to WhatsApp (wa.me deep link with image)
- WhatsApp Status-optimized image dimensions
- Share tracking (count, viral coefficient)

### F6: User Accounts & Gallery
- Supabase Auth (email + Google OAuth)
- Save created posters to personal gallery
- Download history

## Monetization

| Tier | Features | Price |
|---|---|---|
| Free | Basic templates, watermarked exports, 5/day limit | ₹0 |
| Pro | All templates, no watermark, unlimited exports | ₹99/mo |
| Business | Pro + custom branding, analytics, priority support | ₹299/mo |

Additional revenue:
- Premium template packs (one-time purchase)
- Ad placements (non-intrusive banner on free tier)
- Sponsored templates from brands

## Marketing Strategy
- **WhatsApp viral loop**: shared posters include subtle branding → new users
- **Instagram Reels**: tutorial + trending meme compilations
- **SEO**: "IPL poster maker", "cricket meme generator" landing pages
- **Match-day push**: notifications during live matches drive engagement spikes

## Non-Functional Requirements
- Mobile-first responsive design
- Image generation < 2s
- Support 10K concurrent users during peak match hours
- GDPR-compliant data handling
- CDN for template/image assets (Vercel Edge / Cloudflare)

## Success Metrics
- DAU during IPL season
- Posters created per day
- Viral coefficient (shares per poster)
- Free → Pro conversion rate
- Revenue per user
