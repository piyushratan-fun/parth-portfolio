"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMobileMotionSafety } from "@/hooks/useMobileMotionSafety";
import { PARTH_PROFILE } from "@/content/parthContent";

type BrandLoaderProps = {
  visible: boolean;
};

// Precise cubic-bezier curve for cinematic split opening
const splitEase = [0.77, 0, 0.175, 1] as const;

export function BrandLoader({ visible }: BrandLoaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMobileSafe = useMobileMotionSafety();
  const noMotion = prefersReducedMotion || isMobileSafe;

  const [count, setCount] = React.useState(0);
  const rafRef = React.useRef<number | null>(null);
  const startRef = React.useRef<number | null>(null);
  const DURATION = 2000;

  React.useEffect(() => {
    if (!visible) {
      setCount(0);
      startRef.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    if (noMotion) {
      setCount(100);
      return;
    }

    function tick(now: number) {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * 100));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible, noMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <div
          key="brand-loader-root"
          className="fixed inset-0 z-[200] pointer-events-auto select-none overflow-hidden"
        >
          {/* Top Half Split Shutter (Slides UP on Exit) */}
          <motion.div
            key="shutter-top"
            className="absolute top-0 inset-x-0 h-1/2 bg-[#090909] border-b border-white/10 z-10"
            initial={{ y: 0 }}
            exit={{
              y: "-100%",
              transition: { duration: 0.75, ease: splitEase },
            }}
          />

          {/* Bottom Half Split Shutter (Slides DOWN on Exit) */}
          <motion.div
            key="shutter-bottom"
            className="absolute bottom-0 inset-x-0 h-1/2 bg-[#090909] border-t border-white/10 z-10"
            initial={{ y: 0 }}
            exit={{
              y: "100%",
              transition: { duration: 0.75, ease: splitEase },
            }}
          />

          {/* Center Dividing Split Line Accent */}
          <motion.div
            key="shutter-center-line"
            className="absolute top-1/2 inset-x-0 h-px bg-primary/40 -translate-y-1/2 z-20 pointer-events-none"
            initial={{ opacity: 1, scaleX: 1 }}
            exit={{
              opacity: 0,
              scaleX: 0,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
          />

          {/* Foreground Content Container (Fades out cleanly right before shutters split) */}
          <motion.div
            key="loader-content"
            className="relative z-30 flex h-full w-full flex-col justify-between text-white"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 0.98,
              transition: { duration: 0.35, ease: "easeIn" },
            }}
          >
            {/* Top Bar */}
            <div className="px-8 pt-8 md:px-14 md:pt-12 flex justify-between items-center">
              <motion.p
                className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {PARTH_PROFILE.domain}
              </motion.p>
              <motion.div
                className="border border-white/15 px-3 py-1 bg-white/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                  PCB STREAM • CLASS 12
                </p>
              </motion.div>
            </div>

            {/* Center — Monogram & Bio (Stark, Clean, Sharp - NO GLOW) */}
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
              {/* Sharp Monogram */}
              <motion.div
                className="relative mb-6 select-none"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-display text-[clamp(80px,18vw,160px)] font-bold uppercase leading-none tracking-[-0.05em] text-white">
                  {PARTH_PROFILE.monogram}
                </p>
              </motion.div>

              {/* Subtitle Name */}
              <motion.h2
                className="font-display text-lg md:text-2xl font-bold uppercase tracking-[0.2em] text-white mb-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                {PARTH_PROFILE.name}
              </motion.h2>

              {/* Sharp Tagline */}
              <motion.p
                className="max-w-md text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-white/45"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22 }}
              >
                Physics • Chemistry • Biology — Science of Living Systems
              </motion.p>
            </div>

            {/* Bottom Bar — Counter & Sharp Progress Track */}
            <div className="px-8 pb-10 md:px-14 md:pb-14">
              <div className="flex items-end justify-between mb-3">
                <motion.p
                  className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  System Initialisation
                </motion.p>
                <motion.p
                  className="font-display text-[clamp(28px,5vw,48px)] font-bold tabular-nums leading-none text-white tracking-tight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {count}
                  <span className="text-primary font-normal">%</span>
                </motion.p>
              </div>

              {/* Sharp Track */}
              <div className="h-0.5 w-full bg-white/10">
                <motion.div
                  className="h-full bg-primary origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: count / 100 }}
                  style={{ transformOrigin: "left" }}
                  transition={{ ease: "linear", duration: 0.05 }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
