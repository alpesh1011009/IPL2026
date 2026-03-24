# Analytics Integration Examples

This file shows concrete examples of how to integrate Google Analytics tracking into your CricPost components.

## 1. Team Selector Component

**Location:** `src/components/teams/team-selector.tsx` (example)

```typescript
import { analytics } from "@/lib/analytics";

interface TeamSelectorProps {
  onSelect: (teamId: string, teamName: string) => void;
}

export function TeamSelector({ onSelect }: TeamSelectorProps) {
  const teams = [
    { id: "csk", name: "Chennai Super Kings" },
    { id: "mi", name: "Mumbai Indians" },
    { id: "kkr", name: "Kolkata Knight Riders" },
    // ... more teams
  ];

  const handleTeamSelect = (teamId: string, teamName: string) => {
    // Track the selection
    analytics.teamSelected(teamName);

    // Call parent handler
    onSelect(teamId, teamName);
  };

  return (
    <div className="team-grid">
      {teams.map((team) => (
        <button
          key={team.id}
          onClick={() => handleTeamSelect(team.id, team.name)}
          className="team-card"
        >
          {team.name}
        </button>
      ))}
    </div>
  );
}
```

## 2. Poster Download Component

**Location:** `src/components/poster/download-button.tsx` (example)

```typescript
import { analytics } from "@/lib/analytics";

interface DownloadButtonProps {
  posterData: CanvasElement;
  format: "png" | "jpg";
}

export function DownloadButton({ posterData, format }: DownloadButtonProps) {
  const handleDownload = async () => {
    try {
      // Download logic
      const canvas = posterData;
      const link = document.createElement("a");
      link.href = canvas.toDataURL(`image/${format}`);
      link.download = `cricpost-${Date.now()}.${format}`;
      link.click();

      // Track the download
      analytics.posterDownloaded(format);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <button onClick={handleDownload} className="btn-primary">
      Download {format.toUpperCase()}
    </button>
  );
}
```

## 3. Share Button Component

**Location:** `src/components/poster/share-button.tsx` (example)

```typescript
import { analytics } from "@/lib/analytics";

interface ShareButtonProps {
  posterImage: string;
  title: string;
}

export function ShareButton({ posterImage, title }: ShareButtonProps) {
  const handleShare = async (platform: "instagram" | "whatsapp" | "twitter" | "facebook") => {
    try {
      // Share logic for each platform
      const shareData = {
        title: title,
        text: "Created on CricPost - Free Cricket Poster Maker",
        url: window.location.href,
      };

      switch (platform) {
        case "whatsapp":
          window.open(
            `https://wa.me/?text=${encodeURIComponent(shareData.text + " " + shareData.url)}`
          );
          break;
        case "instagram":
          // Instagram share via QR or save to clipboard
          navigator.clipboard.writeText(window.location.href);
          alert("Link copied! Share on Instagram");
          break;
        case "twitter":
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${shareData.url}`
          );
          break;
        case "facebook":
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`
          );
          break;
      }

      // Track the share
      analytics.posterShared(platform);
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  return (
    <div className="share-buttons">
      <button onClick={() => handleShare("whatsapp")} title="Share on WhatsApp">
        <WhatsAppIcon />
      </button>
      <button onClick={() => handleShare("instagram")} title="Share on Instagram">
        <InstagramIcon />
      </button>
      <button onClick={() => handleShare("twitter")} title="Share on Twitter">
        <TwitterIcon />
      </button>
      <button onClick={() => handleShare("facebook")} title="Share on Facebook">
        <FacebookIcon />
      </button>
    </div>
  );
}
```

## 4. Player Card Creator

**Location:** `src/components/player/player-card-creator.tsx` (example)

```typescript
import { analytics } from "@/lib/analytics";

interface PlayerCardCreatorProps {
  player: Player;
}

export function PlayerCardCreator({ player }: PlayerCardCreatorProps) {
  const handleCreateCard = () => {
    // Track that a player card was selected/created
    analytics.playerSelected(player.name);

    // Show card creation interface
    // ...
  };

  const handleCreatePoster = (type: "player_card") => {
    // Track poster creation
    analytics.posterCreated("player_card");

    // Generate and display poster
    // ...
  };

  return (
    <div className="player-card-creator">
      <div onClick={handleCreateCard} className="player-preview">
        <img src={player.image} alt={player.name} />
        <h3>{player.name}</h3>
        <p>{player.role}</p>
      </div>

      <button onClick={() => handleCreatePoster("player_card")}>
        Create Card
      </button>
    </div>
  );
}
```

## 5. Theme Selector

**Location:** `src/components/theme/theme-selector.tsx` (example)

```typescript
import { useTheme } from "@/context/theme-context";
import { analytics } from "@/lib/analytics";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const themes = ["orange", "violet", "cyan", "rose", "green", "gold"];

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);

    // Track theme change
    analytics.themeChanged(newTheme);
  };

  return (
    <div className="theme-selector">
      {themes.map((t) => (
        <button
          key={t}
          className={`theme-btn ${theme === t ? "active" : ""}`}
          onClick={() => handleThemeChange(t)}
          aria-label={`Switch to ${t} theme`}
        >
          <span className={`theme-preview theme-${t}`} />
        </button>
      ))}
    </div>
  );
}
```

## 6. Match View Component

**Location:** `src/app/matches/page.tsx` (example)

```typescript
import { analytics } from "@/lib/analytics";
import { useEffect } from "react";

export default function MatchesPage() {
  const matches = useMatches(); // Your data fetching

  const handleMatchClick = (matchId: string) => {
    // Track match view
    analytics.matchViewed(matchId);

    // Navigate or show match details
    // ...
  };

  return (
    <div className="matches-grid">
      {matches.map((match) => (
        <div
          key={match.id}
          onClick={() => handleMatchClick(match.id)}
          className="match-card"
        >
          {/* Match details */}
        </div>
      ))}
    </div>
  );
}
```

## 7. Meme Gallery Component

**Location:** `src/components/memes/meme-gallery.tsx` (example)

```typescript
import { analytics } from "@/lib/analytics";
import { useState } from "react";

export function MemeGallery() {
  const memes = useMemes();
  const [likedMemes, setLikedMemes] = useState<Set<string>>(new Set());

  const handleMemeView = (memeId: string) => {
    // Track meme view
    analytics.memeViewed(memeId);

    // Show meme details or expand
    // ...
  };

  const handleMemeLike = (memeId: string) => {
    const newLiked = new Set(likedMemes);
    newLiked.add(memeId);
    setLikedMemes(newLiked);

    // Track meme like
    analytics.memeLiked(memeId);
  };

  return (
    <div className="meme-gallery">
      {memes.map((meme) => (
        <div
          key={meme.id}
          className="meme-card"
          onClick={() => handleMemeView(meme.id)}
        >
          <img src={meme.image} alt={meme.title} />
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMemeLike(meme.id);
            }}
            className={`like-btn ${likedMemes.has(meme.id) ? "liked" : ""}`}
          >
            ❤️ {meme.likes}
          </button>
        </div>
      ))}
    </div>
  );
}
```

## 8. Language Switcher

**Location:** `src/components/language/language-switcher.tsx` (example)

```typescript
import { useLanguage } from "@/context/language-context";
import { analytics } from "@/lib/analytics";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "gu", name: "ગુજરાતી" },
  ];

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);

    // Track language change
    analytics.languageChanged(lang);
  };

  return (
    <select
      value={language}
      onChange={(e) => handleLanguageChange(e.target.value)}
      className="language-selector"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}
```

## 9. Search Component

**Location:** `src/components/search/search-bar.tsx` (example)

```typescript
import { analytics } from "@/lib/analytics";
import { useState } from "react";

export function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (query.trim()) {
      // Track search
      analytics.search(query);

      // Perform search
      performSearch(query);

      // Clear input
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="search"
        placeholder="Search teams, players, memes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button type="submit">Search</button>
    </form>
  );
}
```

## 10. Route-based Page View Tracking

**Location:** `src/app/layout.tsx` or with a custom hook

```typescript
'use client';

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { analytics } from "@/lib/analytics";

export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view when route changes
    const pageName = pathname.split("/")[1] || "home";
    analytics.pageView(pageName);
  }, [pathname]);

  return null;
}
```

Then add to layout:
```typescript
import { PageViewTracker } from "@/components/analytics/page-view-tracker";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <PageViewTracker />
        {children}
      </body>
    </html>
  );
}
```

---

## Summary

The key pattern is:
1. Import the analytics utility
2. Call the appropriate tracking function at the right time
3. Continue with your normal logic

This keeps analytics separate from your business logic and makes it easy to add tracking to any component.
