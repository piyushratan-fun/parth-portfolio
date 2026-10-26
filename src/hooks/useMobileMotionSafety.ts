"use client";

import * as React from "react";

const MOBILE_MOTION_SAFETY_QUERY = "(max-width: 767px), (hover: none), (pointer: coarse)";

export function useMobileMotionSafety() {
  const [shouldUseStaticMotion, setShouldUseStaticMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MOTION_SAFETY_QUERY);
    const updateMotionMode = () => setShouldUseStaticMotion(mediaQuery.matches);

    updateMotionMode();
    mediaQuery.addEventListener("change", updateMotionMode);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionMode);
    };
  }, []);

  return shouldUseStaticMotion;
}
