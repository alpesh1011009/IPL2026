# Analytics Quick Reference

## Setup (One-time)

1. Get your GA Measurement ID from [Google Analytics](https://analytics.google.com/)
2. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
3. Restart your dev server

## Import in Any Component

```typescript
import { analytics } from "@/lib/analytics";
```

## Quick Event List

| Event | Usage | Example |
|-------|-------|---------|
| `posterCreated(type)` | When user creates a poster | `analytics.posterCreated("team_poster")` |
| `posterDownloaded(format)` | When poster is downloaded | `analytics.posterDownloaded("png")` |
| `posterShared(platform)` | When poster is shared | `analytics.posterShared("instagram")` |
| `teamSelected(name)` | When team is selected | `analytics.teamSelected("CSK")` |
| `playerSelected(name)` | When player is selected | `analytics.playerSelected("Dhoni")` |
| `matchViewed(id)` | When match is viewed | `analytics.matchViewed("match-001")` |
| `memeViewed(id)` | When meme is viewed | `analytics.memeViewed("meme-123")` |
| `memeLiked(id)` | When meme is liked | `analytics.memeLiked("meme-123")` |
| `themeChanged(name)` | When theme is changed | `analytics.themeChanged("violet")` |
| `languageChanged(lang)` | When language is changed | `analytics.languageChanged("hi")` |
| `search(query)` | When user searches | `analytics.search("rohit")` |

## Custom Event

For events not in the list:

```typescript
import { trackEvent } from "@/lib/analytics";

trackEvent("event_name", {
  param1: "value",
  param2: 123,
});
```

## Common Integration Patterns

### In Click Handler
```typescript
const handleClick = () => {
  analytics.posterDownloaded("jpg");
  // ... do the action
};
```

### In Form Submit
```typescript
const handleSubmit = (e) => {
  e.preventDefault();
  analytics.search(query);
  performSearch(query);
};
```

### In Route Change (Client Component)
```typescript
'use client';
import { useRouter } from "next/navigation";
import { analytics } from "@/lib/analytics";

const router = useRouter();
analytics.posterViewed(id);
router.push(`/poster/${id}`);
```

## Verify It's Working

1. Open your app in Chrome DevTools
2. Go to **Network** tab
3. Search for `analytics.google.com` requests
4. You should see POST requests to Google Analytics
5. Check [Google Analytics](https://analytics.google.com/) > **Realtime** to see live events

## Data in Google Analytics

After 24-48 hours, you can view:

- **Reports** → **Realtime** → See live events
- **Reports** → **Engagement** → **Events** → See all custom events
- **Reports** → **Audience** → User demographics & devices
- **Acquisition** → See traffic sources

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-ABC123XYZ    # Your measurement ID
```

## Files Added/Modified

- ✅ `src/lib/analytics.ts` - Analytics utility (NEW)
- ✅ `src/app/layout.tsx` - GA integration (MODIFIED)
- ✅ `.env.example` - GA_ID config (MODIFIED)
- ✅ `ANALYTICS_SETUP.md` - Full setup guide (NEW)
- ✅ `ANALYTICS_INTEGRATION_EXAMPLES.md` - Code examples (NEW)

---

**Next Step:** Start adding tracking to your components using the patterns in `ANALYTICS_INTEGRATION_EXAMPLES.md`
