"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { ParticleField } from "@/components/effects/ParticleField";
import { Silhouette } from "@/components/scenery/Silhouette";
import { MOSASAURUS } from "@/components/scenery/paths";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { getSpecies } from "@/lib/dinosaurs";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const WAVE_PATH =
  "M0 60 C 120 20 240 20 360 60 C 480 100 600 100 720 60 C 840 20 960 20 1080 60 C 1200 100 1320 100 1440 60 L 1440 120 L 0 120 Z";

/** One endlessly rolling wave band — duplicated path scrolled with a CSS keyframe. */
function WaveBand({ className, duration, opacity }: { className?: string; duration: number; opacity: number }) {
  return (
    <div aria-hidden="true" className={`absolute inset-x-0 overflow-hidden ${className}`}>
      <div
        className="flex h-full w-[200%]"
        style={{ animation: `wave-roll ${duration}s linear infinite` }}
      >
        {[0, 1].map((i) => (
          <svg key={i} viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-full w-1/2 shrink-0">
            <path d={WAVE_PATH} fill="currentColor" opacity={opacity} />
          </svg>
        ))}
      </div>
    </div>
  );
}

/**
 * Chapter 5 — the Niobrara Sea. The viewport submerges: rolling wave bands
 * at the surface, caustic light shimmer, rising bubbles, and a Mosasaurus
 * cruising the dark mid-water as the page scrolls.
 */
export function OceanMonsters() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const mosasaurus = getSpecies("mosasaurus")!;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const swimX = useTransform(scrollYProgress, [0.1, 0.9], ["104vw", "-65vw"]);
  const swimY = useTransform(scrollYProgress, [0.1, 0.5, 0.9], ["0vh", "7vh", "-4vh"]);
  const lightShaft = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);

  return (
    <section
      ref={ref}
      id="ocean"
      aria-labelledby="ocean-title"
      className="vignette relative overflow-hidden bg-[linear-gradient(to_bottom,#0a1622_0%,#1c3a52_12%,#122638_38%,#0a1622_70%,#050a12_100%)]"
    >
      {/* Surface — two counter-rolling wave bands */}
      <div className="absolute inset-x-0 top-0 h-24 text-mist-700">
        <WaveBand className="top-0 h-full" duration={16} opacity={0.7} />
        <WaveBand className="top-3 h-full text-mist-500" duration={23} opacity={0.35} />
      </div>

      {/* Sun shafts breaking through the surface */}
      <motion.div
        aria-hidden="true"
        style={{ x: reduced ? 0 : lightShaft }}
        className="absolute inset-0 opacity-60"
      >
        <div
          className="h-[70%] w-full"
          style={{
            background:
              "linear-gradient(112deg, transparent 26%, rgba(143,182,201,0.12) 32%, transparent 38%, transparent 50%, rgba(143,182,201,0.09) 57%, transparent 64%, transparent 78%, rgba(143,182,201,0.07) 84%, transparent 90%)",
          }}
        />
      </motion.div>

      {/* Caustic shimmer */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[45%]"
        style={{
          background:
            "radial-gradient(ellipse 30% 20% at 25% 12%, rgba(194,218,230,0.25) 0%, transparent 70%), radial-gradient(ellipse 26% 16% at 62% 8%, rgba(194,218,230,0.2) 0%, transparent 70%), radial-gradient(ellipse 34% 22% at 86% 16%, rgba(194,218,230,0.16) 0%, transparent 70%)",
          animation: "caustic-shimmer 9s ease-in-out infinite",
        }}
      />

      <ParticleField mode="bubbles" density={0.4} className="absolute inset-0 h-full w-full" />

      {/* The leviathan */}
      <motion.div
        style={{ x: reduced ? 0 : swimX, y: reduced ? 0 : swimY }}
        className="absolute top-[42%] w-[80vw] max-w-[900px]"
      >
        <Silhouette
          art={MOSASAURUS}
          title="A Mosasaurus cruising through the deep"
          className="h-auto w-full text-abyss-950/95"
          style={{ filter: "drop-shadow(0 24px 50px rgba(0,0,0,0.5)) blur(0.4px)" }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-5 py-44 sm:px-8 lg:py-60">
        <div id="ocean-title" className="max-w-2xl">
          <SectionHeading
            eyebrow="Chapter V · The Western Interior Seaway"
            lines={["Monsters of", "the Deep"]}
            lede="While tyrannosaurs ruled the shore, an inland sea split North America in two — and nothing in it was safe."
            tone="text-mist-200"
          />
        </div>

        <div className="h-[26vh]" aria-hidden="true" />

        <Reveal className="ml-auto max-w-md rounded-xl border border-mist-500/40 bg-mist-900/60 p-6 backdrop-blur-sm">
          <h3 className="font-display text-lg font-bold tracking-wide text-mist-200">
            {mosasaurus.name}
          </h3>
          <p className="mt-1 text-sm italic text-bone-500">
            “{mosasaurus.meaning}” · up to {mosasaurus.lengthMeters} m
          </p>
          <ul className="mt-4 space-y-3">
            {mosasaurus.facts.slice(0, 3).map((fact) => (
              <li key={fact} className="flex gap-3 text-sm leading-relaxed text-bone-300">
                <span aria-hidden="true" className="mt-[2px] text-mist-300">◆</span>
                {fact}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
