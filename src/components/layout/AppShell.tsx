"use client";

import React from "react";
import { BrandLoader } from "@/components/layout/BrandLoader";

const BRAND_LOADER_SEEN_KEY = "parth-brand-loader-seen-v1";
const ROOT_APP_READY_ATTRIBUTE = "data-app-ready";

function setRootAppReady(isReady: boolean) {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  if (isReady) {
    root.setAttribute(ROOT_APP_READY_ATTRIBUTE, "true");
  } else {
    root.removeAttribute(ROOT_APP_READY_ATTRIBUTE);
  }
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [showLoader, setShowLoader] = React.useState(true);

  // Guarantee instant hydration and root readiness
  React.useEffect(() => {
    setIsHydrated(true);
    setRootAppReady(true);
  }, []);

  // Brand loader lifecycle with fallback failsafe
  React.useEffect(() => {
    let mainTimer: number | null = null;
    let failsafeTimer: number | null = null;

    try {
      const hasSeen = window.sessionStorage.getItem(BRAND_LOADER_SEEN_KEY);
      if (hasSeen) {
        setShowLoader(false);
        setRootAppReady(true);
        return;
      }
    } catch {
      // Storage access safety
    }

    setShowLoader(true);

    const finishLoading = () => {
      setShowLoader(false);
      try {
        window.sessionStorage.setItem(BRAND_LOADER_SEEN_KEY, "true");
      } catch {
        // Storage access safety
      }
      setRootAppReady(true);
    };

    mainTimer = window.setTimeout(finishLoading, 2300);
    // Failsafe timeout ensuring loader never blocks content indefinitely
    failsafeTimer = window.setTimeout(finishLoading, 2600);

    return () => {
      if (mainTimer) window.clearTimeout(mainTimer);
      if (failsafeTimer) window.clearTimeout(failsafeTimer);
    };
  }, []);

  return (
    <>
      <BrandLoader visible={showLoader} />
      <div
        data-route-shell
        className="w-full min-h-screen transition-opacity duration-300"
        style={{
          opacity: isHydrated ? 1 : 0,
          pointerEvents: isHydrated ? "auto" : "none",
        }}
      >
        {children}
      </div>
    </>
  );
}
