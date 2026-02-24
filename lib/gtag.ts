/* Helper utilities for Google Analytics (gtag.js)
   - Uses NEXT_PUBLIC_GA_ID
   - Exposes `pageview` and `event` helpers
*/
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export function getGoogleAnalyticsId() {
  return GA_ID;
}

export const pageview = (url: string) => {
  if (!GA_ID || typeof window === "undefined") return;
  try {
    window.gtag?.("config", GA_ID, {
      page_path: url,
    });
  } catch (e) {
    // noop
  }
};

export const event = ({ action, params }: { action: string; params?: Record<string, any> }) => {
  if (!GA_ID || typeof window === "undefined") return;
  try {
    window.gtag?.("event", action, params);
  } catch (e) {
    // noop
  }
};

export default {
  getGoogleAnalyticsId,
  pageview,
  event,
};
