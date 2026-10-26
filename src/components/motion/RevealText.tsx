"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMobileMotionSafety } from "@/hooks/useMobileMotionSafety";
import { cn } from "@/lib/utils";

type RevealTextProps = {
  className?: string;
  delay?: number;
  mode?: "load" | "view";
  split?: "chars" | "words";
  stagger?: number;
  text: string;
};

const smoothEase = [0.22, 1, 0.36, 1] as const;

export function RevealText({
  className,
  delay = 0,
  mode = "load",
  split = "words",
  stagger = 0.045,
  text,
}: RevealTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const shouldUseStaticMotion = useMobileMotionSafety();

  if (shouldReduceMotion || shouldUseStaticMotion) {
    return <span className={className}>{text}</span>;
  }

  const units = split === "chars" ? Array.from(text) : text.split(" ");
  const motionProps =
    mode === "view"
      ? {
          initial: "hidden",
          viewport: { once: true, margin: "-80px" },
          whileInView: "show",
        }
      : {
          animate: "show",
          initial: "hidden",
        };

  return (
    <motion.span
      {...motionProps}
      data-reveal-text
      aria-label={text}
      className={cn("inline-flex flex-wrap overflow-hidden", className)}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
    >
      {units.map((unit, index) => (
        <span
          aria-hidden="true"
          className={cn("inline-block overflow-hidden", split === "words" && "mr-[0.22em] last:mr-0")}
          key={`${unit}-${index}`}
        >
          <motion.span
            className="reveal-text-unit inline-block"
            variants={{
              hidden: { opacity: 0, y: "105%" },
              show: {
                opacity: 1,
                y: "0%",
                transition: { duration: 0.78, ease: smoothEase },
              },
            }}
          >
            {unit}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
