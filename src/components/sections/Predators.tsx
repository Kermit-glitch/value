"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ParticleField } from "@/components/effects/ParticleField";
import { Silhouette } from "@/components/scenery/Silhouette";
import { TREX, VELOCIRAPTOR } from "@/components/scenery/paths";
import { getSpecies } from "@/lib/dinosaurs";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Chapter 3 — Predators. A pinned, scroll-scrubbed sequence: the arena
 * darkens, an amber spotlight ignites, and the tyrant king advances from
 * the gloom while its dossier types itself in. Velociraptor gets a cameo
 * in the closing beat.
 */
export function Predators() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const rex = getSpecies("tyrannosaurus")!;

  useLayoutEffect(() => {
    if (reduced) return;
    const stage = stageRef.current;
    if (!stage) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
        defaults: { ease: "none" },
      });

      // Beat 1 — the spotlight ignites
      tl.fromTo("[data-spotlight]", { opacity: 0 }, { opacity: 1, duration: 0.18 }, 0);

      // Beat 2 — the king advances out of the dark
      tl.fromTo(
        "[data-rex]",
        { xPercent: 24, scale: 0.62, opacity: 0.35, filter: "blur(6px)" },
        { xPercent: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.5 },
        0.05,
      );

      // Beat 3 — title slams in, then the dossier lines stagger up
      tl.fromTo(
        "[data-predator-title] > *",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.22, ease: "power2.out" },
        0.18,
      );
      tl.fromTo(
        "[data-dossier] li",
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.2, ease: "power2.out" },
        0.42,
      );

      // Beat 4 — raptor cameo streaks across the foreground
      tl.fromTo(
        "[data-raptor]",
        { xPercent: 130, opacity: 0 },
        { xPercent: -30, opacity: 0.9, duration: 0.3, ease: "power1.in" },
        0.7,
      );
    }, stage);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="predators" aria-labelledby="predators-title" className="relative bg-abyss-950">
      <div ref={stageRef} className="vignette relative h-svh overflow-hidden">
        {/* Arena floor gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#030605_0%,#0a1410_45%,#1d130b_78%,#030605_100%)]" />

        {/* Amber hunting spotlight */}
        <div
          data-spotlight
          aria-hidden="true"
          className={`absolute inset-0 ${reduced ? "" : "opacity-0"}`}
          style={{
            background:
              "radial-gradient(ellipse 46% 64% at 64% 56%, rgba(255,184,77,0.2) 0%, rgba(217,138,43,0.08) 45%, transparent 72%)",
          }}
        />

        <ParticleField mode="dust" density={0.7} className="absolute inset-0 h-full w-full" />

        {/* The king */}
        <div
          data-rex
          className="absolute bottom-[6%] right-[-4%] w-[96vw] max-w-[1100px] sm:w-[70vw]"
        >
          <Silhouette
            art={TREX}
            flip
            title="Tyrannosaurus rex stepping into the spotlight"
            className="h-auto w-full text-abyss-900"
            style={{ filter: "drop-shadow(-14px 0 28px rgba(255,140,60,0.14))" }}
          />
        </div>

        {/* Raptor cameo */}
        <div data-raptor className="absolute bottom-[3%] left-0 w-[34vw] max-w-[360px] opacity-0">
          <Silhouette art={VELOCIRAPTOR} className="h-auto w-full text-abyss-900" />
        </div>

        {/* Copy */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 sm:px-8">
          <div data-predator-title id="predators-title" className="max-w-xl">
            <p className="heading-eyebrow mb-5 text-volcanic-300">
              Chapter III · Late Cretaceous · 68–66 MYA
            </p>
            <h2 className="heading-display text-[clamp(2.8rem,8vw,6.5rem)]">
              <span className="block text-bone-100">The Tyrant</span>
              <span className="text-ember block">King</span>
            </h2>
            <p className="body-lede mt-6 max-w-md">{rex.tagline}</p>
          </div>

          <ul data-dossier className="mt-10 max-w-md space-y-4">
            {rex.facts.slice(0, 3).map((fact) => (
              <li
                key={fact}
                className="flex gap-3 border-l border-volcanic-500/60 pl-4 text-sm leading-relaxed text-bone-300"
              >
                <span aria-hidden="true" className="text-volcanic-400">▸</span>
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
