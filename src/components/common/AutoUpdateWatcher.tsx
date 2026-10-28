"use client";

import * as React from "react";
import { BUILD_VERSION } from "@/lib/buildVersion";

const CHECK_INTERVAL_MS = 30_000; // Check every 30 seconds

export function AutoUpdateWatcher() {
  const [updating, setUpdating] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Purge stray Service Workers and browser CacheStorage to prevent hydration freezes
    try {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister();
          }
        });
      }
      if ("caches" in window) {
        caches.keys().then((keys) => {
          for (const key of keys) {
            caches.delete(key);
          }
        });
      }
    } catch {
      // Ignore background cache cleanup errors
    }

    let isChecking = false;

    async function checkForUpdates() {
      if (isChecking || updating) return;
      isChecking = true;

      try {
        const url = `/version.json?t=${Date.now()}`;
        const res = await fetch(url, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
          },
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.version && data.version !== BUILD_VERSION) {
            const alreadyReloaded = sessionStorage.getItem("last_auto_reloaded_version");
            if (alreadyReloaded !== data.version) {
              sessionStorage.setItem("last_auto_reloaded_version", data.version);
              setUpdating(true);

              // If tab is currently hidden/backgrounded, refresh immediately.
              // If active, give 800ms for user to see smooth notification.
              const delay = document.visibilityState === "hidden" ? 50 : 800;
              setTimeout(() => {
                window.location.reload();
              }, delay);
            }
          }
        }
      } catch {
        // Silently ignore network check failures
      } finally {
        isChecking = false;
      }
    }

    // Check shortly after initial load
    const initialTimer = setTimeout(checkForUpdates, 3000);

    // Periodic check
    const intervalTimer = setInterval(checkForUpdates, CHECK_INTERVAL_MS);

    // Check when user returns to tab or window gains focus
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkForUpdates();
      }
    };
    const onFocus = () => {
      checkForUpdates();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("focus", onFocus);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("focus", onFocus);
    };
  }, [updating]);

  if (!updating) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-[9999] flex items-center gap-3 rounded-md border border-primary/50 bg-[#090909]/95 px-4 py-2.5 text-xs text-white shadow-2xl backdrop-blur-md"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
      </span>
      <span className="font-mono font-medium tracking-wide">
        New update available. Updating...
      </span>
    </div>
  );
}
