# Google Analytics Setup Guide

## Overview
Google Analytics is now integrated into your CricPost application. This guide walks you through setting up your analytics property and using event tracking throughout the app.

## Step 1: Create a Google Analytics Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account (or create one)
3. Click **Start measuring** or **Create property**
4. Fill in the property details:
   - Property name: `CricPost` (or your preferred name)
   - Reporting timezone: India (or your timezone)
   - Currency: INR (or your currency)
5. Accept the terms and create the property
6. Select **Web** as your platform
7. Fill in your website URL: `https://cricpost.in`
8. Copy your **Measurement ID** (looks like `G-XXXXXXXXXX`)

## Step 2: Add the Measurement ID to Your Environment

Add your Measurement ID to `.env.local`:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

## Step 3: Verify Analytics is Working

1. Run your app: `npm run dev`
2. Open http://localhost:3000
3. Go to [Google Analytics](https://analytics.google.com/) > Realtime
4. You should see your session active

## Using Event Tracking

The `src/lib/analytics.ts` file provides a pre-configured set of event tracking functions. Use them throughout your app:

### Import the analytics utility:
```typescript
import { analytics } from "@/lib/analytics";
```

### Pre-defined Events:

#### Poster Events
```typescript
analytics.posterCreated("team_poster"); // Poster type: team_poster, player_card, match_poster, meme, etc.
analytics.posterDownloaded("png");      // Format: png, jpg
analytics.posterShared("instagram");    // Platform: instagram, whatsapp, twitter, facebook
```

#### Team/Player Events
```typescript
analytics.teamSelected("CSK");
analytics.playerSelected("MS Dhoni");
```

#### Match Events
```typescript
analytics.matchViewed("match-001");
```

#### Meme Events
```typescript
analytics.memeViewed("meme-123");
analytics.memeLiked("meme-123");
```

#### Theme/Language Events
```typescript
analytics.themeChanged("violet");
analytics.languageChanged("hi");
```

#### Navigation
```typescript
analytics.pageView("home");
```

#### Search
```typescript
analytics.search("rohit sharma");
```

### Custom Events

For custom events, use the `trackEvent` function directly:

```typescript
import { trackEvent } from "@/lib/analytics";

trackEvent("custom_event_name", {
  parameter_name: "value",
  another_param: 123,
});
```

## Key Metrics to Track

### 1. **User Acquisition**
- Page views
- Geographic distribution
- Device types (mobile/desktop)

### 2. **Feature Usage**
- posterCreated events (which types are most popular)
- posterShared events (which platforms)
- posterDownloaded events (format preferences)

### 3. **Engagement**
- memeViewed / memeLiked ratio
- Theme changes (user engagement with customization)
- Average session duration

### 4. **Conversion** (if monetizing)
- User sign-ups
- Subscription purchases
- Business poster creation

## Integration Examples

### In a React Component

```typescript
import { analytics } from "@/lib/analytics";

export function TeamSelector() {
  const handleTeamSelect = (teamName: string) => {
    analytics.teamSelected(teamName);
    // ... rest of your code
  };

  return (
    <button onClick={() => handleTeamSelect("CSK")}>
      Select CSK
    </button>
  );
}
```

### In a Download Handler

```typescript
const downloadPoster = async (format: "png" | "jpg") => {
  // Download logic here
  analytics.posterDownloaded(format);
};
```

### In a Share Handler

```typescript
const sharePoster = (platform: string) => {
  // Share logic here
  analytics.posterShared(platform);
};
```

## Views & Reports to Check

Once you have data flowing in, check these views in Google Analytics:

1. **Realtime** - See live user activity
2. **Home** - Overall traffic and user metrics
3. **Engagement** > **Events** - See your custom events
4. **Audience** > **Overview** - Demographics and device info
5. **Acquisition** > **Traffic source** - Where users come from

## Privacy Considerations

- Google Analytics respects user privacy settings
- Consider adding a privacy policy mentioning GA usage
- For users in EU, ensure GDPR compliance (consent handling)
- Use GA's anonymization features if needed

## Troubleshooting

### Events not showing in Google Analytics

1. **Clear browser cache** - GA might be cached
2. **Check Measurement ID** - Ensure it's correct in `.env.local`
3. **Use Realtime** - Check Real-time report (not waiting for historical data)
4. **Check console** - Look for JavaScript errors
5. **Wait 24-48 hours** - GA can take time to process historical data

### GA showing only "Direct" traffic

This is normal for localhost/development. Production will show proper traffic sources.

## Next Steps

1. Add event tracking to key user actions in components
2. Set up conversion goals in GA (e.g., poster downloaded = conversion)
3. Monitor analytics weekly to understand user behavior
4. A/B test features based on usage data

---

For more info: [Google Analytics Documentation](https://support.google.com/analytics)
