/**
 * Google Analytics event tracking utility
 * Events are tracked using the gtag.js library
 */

declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: Record<string, string | number | boolean>
    ) => void;
  }
}

export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, string | number | boolean>
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
};

// Pre-defined events for common user actions
export const analytics = {
  // Poster creation events
  posterCreated: (type: string) =>
    trackEvent("poster_created", { poster_type: type }),
  posterDownloaded: (format: string) =>
    trackEvent("poster_downloaded", { format }),
  posterShared: (platform: string) =>
    trackEvent("poster_shared", { platform }),

  // Team/Player selection
  teamSelected: (teamName: string) =>
    trackEvent("team_selected", { team_name: teamName }),
  playerSelected: (playerName: string) =>
    trackEvent("player_selected", { player_name: playerName }),

  // Match interaction
  matchViewed: (matchId: string) =>
    trackEvent("match_viewed", { match_id: matchId }),

  // Meme interaction
  memeViewed: (memeId: string) =>
    trackEvent("meme_viewed", { meme_id: memeId }),
  memeLiked: (memeId: string) =>
    trackEvent("meme_liked", { meme_id: memeId }),

  // Theme changes
  themeChanged: (themeName: string) =>
    trackEvent("theme_changed", { theme_name: themeName }),

  // Language changes
  languageChanged: (language: string) =>
    trackEvent("language_changed", { language }),

  // Navigation
  pageView: (pageName: string) =>
    trackEvent("page_view", { page_name: pageName }),

  // Search
  search: (query: string) =>
    trackEvent("search", { search_query: query }),
};
