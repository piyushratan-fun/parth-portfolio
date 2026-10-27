"use client";

import React from "react";
import { BrandLoader } from "@/components/layout/BrandLoader";

const MANDATORY_LOADER_DURATION_MS = 2000;
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
  const [showLoader, setShowLoader] = React.useState(true);

  React.useEffect(() => {
    setRootAppReady(true);

    const timer = window.setTimeout(() => {
      setShowLoader(false);
    }, MANDATORY_LOADER_DURATION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <BrandLoader visible={showLoader} />
      <div
        data-route-shell
        className="w-full min-h-screen transition-opacity duration-300"
        style={{
          opacity: 1,
          pointerEvents: showLoader ? "none" : "auto",
        }}
      >
        {children}
      </div>
    </>
  );
}
