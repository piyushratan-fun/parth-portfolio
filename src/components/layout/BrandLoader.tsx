"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMobileMotionSafety } from "@/hooks/useMobileMotionSafety";
import { PARTH_PROFILE } from "@/content/parthContent";

type BrandLoaderProps = {
  visible: boolean;
};

export function BrandLoader({ visible }: BrandLoaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMobileSafe = useMobileMotionSafety();
  const noMotion = prefersReducedMotion || isMobileSafe;

  const [count, setCount] = React.useState(0);
  const rafRef = React.useRef<number | null>(null);
  const startRef = React.useRef<number | null>(null);
  const DURATION = 2100;

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
        <motion.div
          key="brand-loader"
          className="fixed inset-0 z-[200] flex flex-col bg-[#090909] text-white overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          {/* Subtle grid overlay */}
          <div
            aria-hidden="true"
            className="premium-grid absolute inset-0 opacity-[0.06] pointer-events-none"
          />

          {/* Top-left label */}
          <div className="relative z-10 px-8 pt-8 md:px-14 md:pt-12 flex justify-between items-center">
            <motion.p
              className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {PARTH_PROFILE.domain}
            </motion.p>
            <motion.span
              className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              PCB STREAM • CLASS 12
            </motion.span>
          </div>

          {/* Centre — PK monogram + tagline */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
            {/* Monogram */}
            <motion.div
              className="relative mb-8 select-none"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Glow */}
              <div
                aria-hidden="true"
                className="absolute inset-0 scale-[1.35] rounded-full bg-primary/20 blur-3xl"
              />
              {/* Letters */}
              <p
                className="font-display text-[clamp(80px,18vw,180px)] font-bold uppercase leading-none tracking-[-0.05em] text-white"
                style={{ textShadow: "0 0 80px rgba(43,79,255,0.45)" }}
              >
                {PARTH_PROFILE.monogram}
              </p>
            </motion.div>

            {/* Subtitle / Name */}
            <motion.h2
              className="font-display text-lg md:text-2xl font-bold uppercase tracking-wider text-white mb-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {PARTH_PROFILE.name}
            </motion.h2>

            {/* Tagline */}
            <motion.p
              className="max-w-md text-sm font-medium leading-relaxed text-white/50 md:text-base"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22, ease: "easeOut" }}
            >
              Physics • Chemistry • Biology — Science of Living Systems
            </motion.p>
          </div>

          {/* Bottom bar — counter + progress */}
          <div className="relative z-10 px-8 pb-10 md:px-14 md:pb-14">
            <div className="flex items-end justify-between mb-3">
              <motion.p
                className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Initialising Profile
              </motion.p>
              <motion.p
                className="font-display text-[clamp(28px,5vw,48px)] font-bold tabular-nums leading-none text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {count}
                <span className="text-primary">%</span>
              </motion.p>
            </div>

            {/* Track */}
            <div className="h-px w-full bg-white/10">
              <motion.div
                className="h-px bg-primary origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: count / 100 }}
                style={{ transformOrigin: "left" }}
                transition={{ ease: "linear", duration: 0.05 }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
