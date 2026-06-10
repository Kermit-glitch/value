"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { useParallax } from "@/hooks/useParallax";

interface ParallaxLayerProps {
  /**
   * Layer depth. Convention used across every scene:
   *   0.05–0.12  sky / distant background (slowest)
   *   0.15–0.25  mountains
   *   0.3–0.45   trees / mid-ground
   *   0.5–0.8    foreground (fastest)
   * Negative values float against the scroll (particles, clouds).
   */
  speed: number;
  className?: string;
  children: ReactNode;
  /** Total parallax travel in px (default 320). */
  distance?: number;
}

/**
 * Wraps content in a scroll-linked, spring-smoothed transform.
 * Only `transform` is animated, so layers stay on the compositor
 * and never trigger layout or paint.
 */
export function ParallaxLayer({ speed, className, children, distance }: ParallaxLayerProps) {
  const { ref, y } = useParallax(speed, distance);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, willChange: "transform" }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
