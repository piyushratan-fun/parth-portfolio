"use client";

import * as React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useMobileMotionSafety } from "@/hooks/useMobileMotionSafety";
import { cn } from "@/lib/utils";

type MagneticButtonProps = React.ComponentPropsWithoutRef<typeof motion.div> & {
  disabled?: boolean;
  radius?: number;
  strength?: number;
};

export function MagneticButton({
  children,
  className,
  disabled = false,
  radius = 120,
  strength = 0.22,
  style,
  onPointerLeave,
  onPointerMove,
  ...props
}: MagneticButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const shouldUseStaticMotion = useMobileMotionSafety();
  const isDisabled = disabled || shouldReduceMotion || shouldUseStaticMotion;
  const xValue = useMotionValue(0);
  const yValue = useMotionValue(0);
  const x = useSpring(xValue, { stiffness: 190, damping: 18, mass: 0.35 });
  const y = useSpring(yValue, { stiffness: 190, damping: 18, mass: 0.35 });

  const reset = React.useCallback(() => {
    xValue.set(0);
    yValue.set(0);
  }, [xValue, yValue]);

  return (
    <motion.div
      {...props}
      className={cn("inline-flex transform-gpu will-change-transform", className)}
      style={isDisabled ? style : { ...style, x, y }}
      onPointerMove={(event) => {
        onPointerMove?.(event);

        if (isDisabled || event.pointerType !== "mouse") {
          return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - (rect.left + rect.width / 2);
        const offsetY = event.clientY - (rect.top + rect.height / 2);
        const distance = Math.hypot(offsetX, offsetY);
        const pull = Math.max(0, 1 - distance / radius);

        xValue.set(offsetX * strength * pull);
        yValue.set(offsetY * strength * pull);
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        reset();
      }}
    >
      {children}
    </motion.div>
  );
}
