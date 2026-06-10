"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Mounts Lenis smooth scrolling for the whole document and keeps GSAP
 * ScrollTrigger perfectly in sync by driving Lenis from GSAP's ticker.
 * Disabled entirely when the user prefers reduced motion.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    // One clock for everything: GSAP's ticker drives Lenis, and every
    // Lenis scroll event refreshes ScrollTrigger's measurements.
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Route same-page anchor clicks through Lenis so chapter navigation
    // glides instead of jumping.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const target = document.querySelector<HTMLElement>(anchor.hash);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { duration: 1.8 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}
