"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { FogLayer } from "@/components/effects/FogLayer";
import { Silhouette } from "@/components/scenery/Silhouette";
import { PTERANODON } from "@/components/scenery/paths";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { getSpecies } from "@/lib/dinosaurs";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** A soft, blurred cumulus built from layered radial gradients. */
function Cloud({ className, scale = 1 }: { className?: string; scale?: number }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{
        width: `${340 * scale}px`,
        height: `${110 * scale}px`,
        background:
          "radial-gradient(ellipse 60% 70% at 35% 60%, rgba(194,218,230,0.5) 0%, transparent 70%), radial-gradient(ellipse 50% 80% at 65% 45%, rgba(194,218,230,0.38) 0%, transparent 70%)",
        filter: "blur(18px)",
      }}
    />
  );
}

/**
 * Chapter 4 — the coastal sky over the Western Interior Seaway.
 * A wing of Pteranodon crosses the entire screen at three different
 * depths/speeds while cloud banks parallax beneath them.
 */
export function FlyingReptiles() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const pteranodon = getSpecies("pteranodon")!;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Three flight paths — nearer fliers cross faster and dip as they go
  const flightA = useTransform(scrollYProgress, [0, 1], ["-25vw", "115vw"]);
  const flightB = useTransform(scrollYProgress, [0.05, 1], ["110vw", "-35vw"]);
  const flightC = useTransform(scrollYProgress, [0.1, 0.95], ["-30vw", "105vw"]);
  const bobA = useTransform(scrollYProgress, [0, 0.5, 1], ["0vh", "-6vh", "2vh"]);
  const bobC = useTransform(scrollYProgress, [0, 0.5, 1], ["0vh", "5vh", "-3vh"]);
  const cloudNear = useTransform(scrollYProgress, [0, 1], ["6vh", "-14vh"]);
  const cloudFar = useTransform(scrollYProgress, [0, 1], ["2vh", "-5vh"]);

  return (
    <section
      ref={ref}
      id="sky"
      aria-labelledby="sky-title"
      className="vignette relative overflow-hidden bg-[linear-gradient(to_bottom,#060d0a_0%,#122638_25%,#1c3a52_55%,#36506b_80%,#0a1622_100%)]"
    >
      {/* Far cloud bank */}
      <motion.div style={{ y: reduced ? 0 : cloudFar }} className="absolute inset-0">
        <Cloud className="left-[8%] top-[18%]" scale={1.4} />
        <Cloud className="right-[12%] top-[30%]" scale={1.1} />
        <Cloud className="left-[40%] top-[52%]" scale={1.8} />
      </motion.div>

      {/* The wing — three depths */}
      {!reduced && (
        <>
          <motion.div
            aria-hidden="true"
            style={{ x: flightB }}
            className="absolute top-[16%] w-[10vw] min-w-[90px] opacity-50"
          >
            <Silhouette art={PTERANODON} flip className="h-auto w-full text-mist-900" />
          </motion.div>
          <motion.div
            aria-hidden="true"
            style={{ x: flightC, y: bobC }}
            className="absolute top-[34%] w-[16vw] min-w-[140px] opacity-75"
          >
            <Silhouette art={PTERANODON} className="h-auto w-full text-mist-900" />
          </motion.div>
          <motion.div
            style={{ x: flightA, y: bobA }}
            className="absolute top-[46%] w-[26vw] min-w-[220px]"
          >
            <Silhouette
              art={PTERANODON}
              title="A Pteranodon soaring across the seaway"
              className="h-auto w-full text-abyss-900 drop-shadow-[0_18px_30px_rgba(0,0,0,0.35)]"
            />
          </motion.div>
        </>
      )}

      {/* Near clouds sweep past faster */}
      <motion.div style={{ y: reduced ? 0 : cloudNear }} className="absolute inset-0">
        <Cloud className="left-[-4%] top-[64%]" scale={2.4} />
        <Cloud className="right-[-6%] top-[74%]" scale={2.8} />
      </motion.div>

      <FogLayer className="bottom-0 h-[24vh]" tint="rgba(143,182,201,0.3)" opacity={0.9} />

      <div className="relative mx-auto max-w-7xl px-5 py-44 sm:px-8 lg:py-60">
        <div id="sky-title" className="max-w-2xl">
          <SectionHeading
            eyebrow="Chapter IV · Late Cretaceous Skies"
            lines={["Lords of", "the Air"]}
            lede="They were not dinosaurs, nor birds — pterosaurs were a third experiment in flight, on wings of skin stretched over a single colossal finger."
          />
        </div>

        <Reveal className="mt-14 max-w-md rounded-xl border border-mist-500/40 bg-mist-900/50 p-6 backdrop-blur-sm">
          <h3 className="font-display text-lg font-bold tracking-wide text-mist-200">
            {pteranodon.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-bone-300">{pteranodon.facts[0]}</p>
          <p className="mt-2 text-sm leading-relaxed text-bone-300">{pteranodon.facts[2]}</p>
        </Reveal>

        <div className="h-[18vh]" aria-hidden="true" />
      </div>
    </section>
  );
}
