"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import * as gtag from "@/lib/gtag";

export default function GAClient() {
  const pathname = usePathname();

  useEffect(() => {
    // Only send pageview if GA is configured
    const GA_ID = gtag.getGoogleAnalyticsId();
    if (!GA_ID) return;

    // Wait a tick to ensure gtag script ran
    try {
      gtag.pageview(window.location.pathname + window.location.search);
    } catch (e) {
      // noop
    }
  }, [pathname]);

  return null;
}
