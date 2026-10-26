"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Activity,
  Atom,
  Dna,
  FlaskConical,
  HeartPulse,
  Microscope,
  Sparkles,
  Stethoscope,
  Plus,
} from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { RevealText } from "@/components/motion/RevealText";
import { Button } from "@/components/ui/button";
import { useMobileMotionSafety } from "@/hooks/useMobileMotionSafety";
import { PARTH_PROFILE } from "@/content/parthContent";

const heroSilhouette = "/hero-silhouette.png";

export function Hero() {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const shouldUseStaticMotion = useMobileMotionSafety();
  const useStaticMotion = shouldReduceMotion || shouldUseStaticMotion;
  const y1 = useTransform(scrollY, [0, 600], [0, 120]);
  const y2 = useTransform(scrollY, [0, 600], [0, -60]);

  const pointerXValue = useMotionValue(0);
  const pointerYValue = useMotionValue(0);
  const pointerX = useSpring(pointerXValue, { stiffness: 80, damping: 18, mass: 0.7 });
  const pointerY = useSpring(pointerYValue, { stiffness: 80, damping: 18, mass: 0.7 });
  const letterX = useTransform(pointerX, [-1, 1], [-18, 18]);
  const letterReverseX = useTransform(pointerX, [-1, 1], [14, -14]);
  const figureX = useTransform(pointerX, [-1, 1], [14, -14]);
  const figureY = useTransform(pointerY, [-1, 1], [8, -8]);
  const iconsX = useTransform(pointerX, [-1, 1], [-24, 24]);
  const iconsY = useTransform(pointerY, [-1, 1], [-16, 16]);

  const resetHeroPointer = React.useCallback(() => {
    pointerXValue.set(0);
    pointerYValue.set(0);
  }, [pointerXValue, pointerYValue]);

  const handleHeroPointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (useStaticMotion || event.pointerType !== "mouse") {
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      pointerXValue.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
      pointerYValue.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
    },
    [pointerXValue, pointerYValue, useStaticMotion],
  );

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-background pt-20"
      onPointerLeave={useStaticMotion ? undefined : resetHeroPointer}
      onPointerMove={useStaticMotion ? undefined : handleHeroPointerMove}
    >
      {/* Background Big Monogram Letter P */}
      <motion.div
        aria-hidden="true"
        className="absolute top-[8%] right-[16%] z-0 select-none font-display font-bold leading-none text-foreground/[0.04] pointer-events-none"
        style={{
          fontSize: "clamp(200px, 35vw, 500px)",
          x: useStaticMotion ? 0 : letterX,
          y: useStaticMotion ? 0 : y1,
        }}
      >
        P
      </motion.div>

      {/* Background Big Monogram Letter K */}
      <motion.div
        aria-hidden="true"
        className="absolute top-[8%] right-[0%] z-0 select-none font-display font-bold leading-none text-foreground/[0.024] pointer-events-none"
        style={{
          fontSize: "clamp(200px, 35vw, 500px)",
          x: useStaticMotion ? 0 : letterReverseX,
          y: useStaticMotion ? 0 : y1,
        }}
      >
        K
      </motion.div>

      {/* Floating PCB Stream Icons */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        style={{ x: useStaticMotion ? 0 : iconsX, y: useStaticMotion ? 0 : iconsY }}
      >
        <Dna className="floating-icon top-[12%] left-[30%] text-emerald-500/20" />
        <Microscope className="floating-icon top-[32%] right-[32%] text-blue-500/20" />
        <Atom className="floating-icon top-[56%] left-[16%] text-purple-500/20" />
        <Plus className="floating-icon top-[20%] right-[38%] text-primary/30" strokeWidth={1.5} />
        <FlaskConical className="floating-icon top-[62%] left-[38%] text-amber-500/20" strokeWidth={1.5} />
        <HeartPulse className="floating-icon top-[40%] left-[5%] text-rose-500/20" />
        <Stethoscope className="floating-icon top-[62%] right-[22%] text-teal-500/20" />
        <Activity className="floating-icon top-[48%] right-[5%] text-indigo-500/20" />
      </motion.div>

      <div className="relative z-10 mx-auto min-h-[100svh] w-full max-w-[1600px] px-6 md:h-screen md:px-12">
        {/* PARTH Text Header */}
        <motion.div
          data-mobile-static-motion="true"
          className="absolute left-6 top-[8%] z-20 md:left-12"
          initial={useStaticMotion ? false : { opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
              PCB Stream • Medical Aspirant
            </p>
          </div>
          <h1
            className="font-display font-bold uppercase leading-none tracking-normal text-display-tone"
            style={{ fontSize: "clamp(55px, 14vw, 260px)" }}
          >
            <RevealText text="PARTH" split="chars" stagger={0.035} />
          </h1>
        </motion.div>

        {/* Center Parth Silhouette / Cutout ("Sliver") */}
        <div
          className="absolute left-[55%] top-[50%] z-10 -translate-x-[31%] -translate-y-[58%] pointer-events-none"
          style={{ height: "clamp(340px, 84vh, 1280px)", width: "clamp(340px, 84vh, 1280px)" }}
        >
          <motion.div
            data-mobile-static-motion="true"
            className="h-full w-full flex items-center justify-center"
            initial={useStaticMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ x: useStaticMotion ? 0 : figureX, y: useStaticMotion ? 0 : figureY }}
          >
            <img
              src={heroSilhouette}
              alt="Parth Kashyap silhouette cutout"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              style={{
                height: "100%",
                width: "auto",
                mixBlendMode: "multiply",
                objectFit: "contain",
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.12))",
              }}
            />
          </motion.div>
        </div>

        {/* KASHYAP Text Header */}
        <motion.div
          data-mobile-static-motion="true"
          className="absolute bottom-[24%] right-6 z-20 text-right md:right-28"
          initial={useStaticMotion ? false : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: useStaticMotion ? 0 : y2 }}
        >
          <h1
            className="font-display font-bold uppercase tracking-normal text-display-tone"
            style={{ fontSize: "clamp(50px, 9vw, 200px)" }}
          >
            <RevealText text="KASHYAP" split="chars" delay={0.2} stagger={0.04} />
          </h1>
        </motion.div>

        {/* Hero Bottom Controls & Details */}
        <motion.div
          data-mobile-static-motion="true"
          className="absolute bottom-22 left-6 right-6 z-30 md:left-12 md:right-12"
          initial={useStaticMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex w-full flex-row items-stretch justify-center gap-3 md:gap-[8vw]">
            <MagneticButton className="min-w-0 flex-1 sm:flex-none">
              <Button
                asChild
                size="hero"
                className="premium-soft-hover w-full font-bold uppercase tracking-[0.12em] sm:min-w-[14rem] sm:tracking-[0.24em]"
              >
                <a href="#about">About Parth</a>
              </Button>
            </MagneticButton>

            <MagneticButton className="min-w-0 flex-1 sm:flex-none" strength={0.16}>
              <Button
                asChild
                variant="outline"
                size="hero"
                className="premium-soft-hover w-full border-foreground font-bold uppercase tracking-[0.12em] hover:text-background sm:min-w-[18rem] sm:tracking-[0.18em]"
              >
                <a href="#pcb-curriculum">PCB Curriculum</a>
              </Button>
            </MagneticButton>
          </div>

          <div className="flex items-end justify-between gap-6 border-t border-foreground/10 pt-4 md:pt-6">
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Academic Focus
              </p>
              <p className="text-sm font-medium uppercase tracking-wide text-foreground">
                Physics • Chemistry • Biology • Pre-Med
              </p>
            </div>
            <div className="text-right">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Academic Year
              </p>
              <p className="text-sm font-medium uppercase tracking-wide text-foreground">
                Class 12 • 2026
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
