"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { FogLayer } from "@/components/effects/FogLayer";
import { MaskedLines } from "@/components/motion/Reveal";
import { MountainRidge } from "@/components/scenery/MountainRidge";
import { Silhouette } from "@/components/scenery/Silhouette";
import { TREX } from "@/components/scenery/paths";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// WebGL stars are decorative — load them after everything else, client-only.
const StarField = dynamic(() => import("@/components/canvas/StarField"), { ssr: false });

/**
 * Chapter 0 — the opening shot. A star-dome night over multi-layer
 * parallax mountains, drifting fog, and a tyrannosaur turning to face
 * the valley. Layers scroll at different rates against a pinned sky.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Camera-style departure: title drifts up and fades as the journey begins
  const titleY = useTransform(scrollYProgress, [0, 0.6], [0, reduced ? 0 : -140]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const skyY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120]);
  const farY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 60]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 140]);
  const rexY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 220]);
  const nearY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 320]);

  return (
    <section
      ref={ref}
      id="hero"
      aria-label="The Age of Dinosaurs — introduction"
      className="vignette relative h-[110svh] overflow-hidden bg-abyss-950"
    >
      {/* Sky — slowest layer */}
      <motion.div style={{ y: skyY }} className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#050a12_0%,#0a1622_38%,#122638_62%,#0b2418_88%,#060d0a_100%)]" />
        <StarField className="absolute inset-x-0 top-0 h-[70%]" />
        {/* Low amber moon haze on the horizon */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[46%] h-[40vh] w-[70vw] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(ellipse, #ffb84d 0%, transparent 65%)" }}
        />
      </motion.div>

      {/* Far ridge */}
      <motion.div style={{ y: farY }} className="absolute inset-x-0 bottom-[16%]">
        <MountainRidge variant="far" className="h-[34vh] w-full text-mist-800" />
      </motion.div>

      <FogLayer className="bottom-[24%] h-[26vh]" tint="rgba(143,182,201,0.34)" opacity={0.7} />

      {/* Mid ridge */}
      <motion.div style={{ y: midY }} className="absolute inset-x-0 bottom-[6%]">
        <MountainRidge variant="mid" className="h-[36vh] w-full text-mist-900" />
      </motion.div>

      <FogLayer
        className="bottom-[10%] h-[22vh]"
        tint="rgba(94,130,150,0.4)"
        opacity={0.8}
        reverse
      />

      {/* The tyrant — between mid and near ridges */}
      <motion.div
        style={{ y: rexY }}
        initial={{ opacity: 0, x: reduced ? 0 : 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-[2%] right-[-6%] w-[88vw] max-w-[1000px] sm:w-[62vw]"
      >
        <Silhouette
          art={TREX}
          flip
          title="A Tyrannosaurus rex silhouetted against the night sky"
          className="h-auto w-full text-abyss-900 drop-shadow-[0_0_60px_rgba(0,0,0,0.9)]"
        />
      </motion.div>

      {/* Near ground — fastest layer */}
      <motion.div style={{ y: nearY }} className="absolute inset-x-0 bottom-[-2%]">
        <MountainRidge variant="near" className="h-[24vh] w-full text-abyss-950" />
      </motion.div>

      <FogLayer className="bottom-0 h-[16vh]" tint="rgba(60,86,100,0.5)" opacity={0.9} />

      {/* Title block */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pt-10 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="heading-eyebrow mb-6 text-amber-glow"
        >
          A Cinematic Natural History
        </motion.p>
        <MaskedLines
          as="h1"
          lines={["The Age of", "Dinosaurs"]}
          className="heading-display text-ember text-[clamp(3.2rem,11vw,9rem)]"
          delay={0.5}
        />
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.4 }}
          className="body-lede mt-7 max-w-xl"
        >
          Journey Through 180 Million Years
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#dawn"
        aria-label="Begin the journey — scroll to the Triassic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        style={{ opacity: titleOpacity }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-bone-300 transition-colors hover:text-amber-glow"
      >
        <span className="heading-eyebrow !tracking-[0.34em]">Begin</span>
        <motion.span
          aria-hidden="true"
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="block h-10 w-px bg-gradient-to-b from-amber-glow to-transparent"
        />
      </motion.a>
    </section>
  );
}
