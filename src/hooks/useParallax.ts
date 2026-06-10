"use client";

import { useRef } from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Scroll-linked parallax for a single layer.
 *
 * `speed` is the fraction of scroll distance the layer travels:
 *   0     → pinned to the page (no parallax)
 *   0.1   → distant background (slowest)
 *   0.5+  → foreground (fastest)
 * Negative speeds move the layer against the scroll for floating elements.
 *
 * Returns a ref to attach to the layer's container and a springed
 * MotionValue<string> for `y` so motion stays buttery at high velocity.
 */
export function useParallax(speed: number, distance = 320) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [distance * speed, -distance * speed],
  );

  const y = useSpring(raw, { stiffness: 120, damping: 28, mass: 0.6 });

  return { ref, y, scrollYProgress };
}
