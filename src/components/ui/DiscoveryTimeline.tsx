"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import { DISCOVERY_TIMELINE } from "@/lib/timeline";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Interactive discovery timeline. A central amber rail draws itself in as
 * the user scrolls; entries alternate sides on desktop and reveal with a
 * fade-rise. Semantically an ordered list for screen readers.
 */
export function DiscoveryTimeline() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 75%", "end 60%"],
  });
  const drawn = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  return (
    <div ref={railRef} className="relative">
      {/* Static rail + animated fill */}
      <div
        aria-hidden="true"
        className="absolute left-4 top-0 h-full w-px bg-earth-700/70 md:left-1/2"
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-amber-glow to-volcanic-400 md:left-1/2"
        style={{ scaleY: drawn }}
      />

      <ol className="space-y-14">
        {DISCOVERY_TIMELINE.map((item, i) => {
          const left = i % 2 === 0;
          return (
            <li key={item.year} className="relative md:grid md:grid-cols-2 md:gap-16">
              {/* Node */}
              <span
                aria-hidden="true"
                className="absolute left-4 top-2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-amber-glow bg-abyss-950 md:left-1/2"
              />
              <Reveal
                amount={0.5}
                className={`pl-12 md:pl-0 ${
                  left ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"
                }`}
              >
                <time className="text-ember font-display text-3xl font-bold">{item.year}</time>
                <h3 className="mt-2 font-display text-lg font-semibold tracking-wide text-bone-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-bone-300">{item.detail}</p>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
