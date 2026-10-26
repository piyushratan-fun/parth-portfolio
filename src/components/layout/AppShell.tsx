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

  React.useEffect(() => {
    const hasSeen = window.sessionStorage.getItem(BRAND_LOADER_SEEN_KEY);
    if (hasSeen) {
      setShowLoader(false);
      setRootAppReady(true);
    } else {
      setShowLoader(true);
      const timer = window.setTimeout(() => {
        setShowLoader(false);
        window.sessionStorage.setItem(BRAND_LOADER_SEEN_KEY, "true");
        setRootAppReady(true);
      }, 2300);
      return () => window.clearTimeout(timer);
    }
    setIsHydrated(true);
  }, []);

  return (
    <>
      <BrandLoader visible={showLoader} />
      <div
        data-route-shell
        className="w-full min-h-screen transition-opacity duration-300"
        style={{
          opacity: isHydrated ? 1 : 0,
        }}
      >
        {children}
      </div>
    </>
  );
}
