"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ParticleField } from "@/components/effects/ParticleField";
import { Silhouette } from "@/components/scenery/Silhouette";
import { TRICERATOPS } from "@/components/scenery/paths";
import { MountainRidge } from "@/components/scenery/MountainRidge";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const DEBRIS = [
  { left: "12%", size: 10, delay: 0 },
  { left: "28%", size: 6, delay: 0.05 },
  { left: "46%", size: 12, delay: 0.02 },
  { left: "63%", size: 7, delay: 0.08 },
  { left: "78%", size: 14, delay: 0.04 },
  { left: "90%", size: 8, delay: 0.1 },
] as const;

/**
 * Chapter 6 — the Chicxulub impact, scrubbed by scroll while pinned:
 * a quiet dusk · the asteroid streaks in · white flash · shockwave ring ·
 * the sky turns volcanic, embers rise, debris falls · silence and ash.
 */
export function Extinction() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return;
    const stage = stageRef.current;
    if (!stage) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: "+=340%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
        defaults: { ease: "none" },
      });

      // Beat 1 — the last quiet evening (title fades in, then out)
      tl.fromTo("[data-omen]", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.1 }, 0);
      tl.to("[data-omen]", { opacity: 0, duration: 0.08 }, 0.22);

      // Beat 2 — the asteroid crosses the sky
      tl.fromTo(
        "[data-asteroid]",
        { xPercent: 0, yPercent: 0, opacity: 0 },
        { opacity: 1, duration: 0.02 },
        0.14,
      );
      tl.to(
        "[data-asteroid]",
        {
          left: "26%",
          top: "62%",
          scale: 2.1,
          duration: 0.26,
          ease: "power1.in",
        },
        0.16,
      );

      // Beat 3 — impact: flash, shockwave, the sky catches fire
      tl.set("[data-asteroid]", { opacity: 0 }, 0.42);
      tl.fromTo("[data-flash]", { opacity: 0 }, { opacity: 1, duration: 0.03 }, 0.42);
      tl.to("[data-flash]", { opacity: 0, duration: 0.1 }, 0.46);
      tl.fromTo(
        "[data-shockwave]",
        { scale: 0, opacity: 0.9 },
        { scale: 14, opacity: 0, duration: 0.3, ease: "power2.out" },
        0.43,
      );
      tl.fromTo("[data-burnsky]", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.44);
      tl.fromTo("[data-embers]", { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.46);

      // The witness rears against the light, then is swallowed
      tl.to("[data-witness]", { xPercent: -6, duration: 0.2 }, 0.42);
      tl.to("[data-witness]", { opacity: 0.12, filter: "blur(2px)", duration: 0.3 }, 0.6);

      // Beat 4 — debris rains down
      for (const [i, d] of DEBRIS.entries()) {
        tl.fromTo(
          `[data-debris="${i}"]`,
          { top: "-6%", rotation: 0, opacity: 0 },
          { top: "104%", rotation: 240 + i * 40, opacity: 1, duration: 0.34, ease: "power1.in" },
          0.46 + d.delay,
        );
      }

      // Beat 5 — ash, silence, epitaph
      tl.fromTo("[data-ash]", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.66);
      tl.to("[data-burnsky]", { opacity: 0.45, duration: 0.25 }, 0.72);
      tl.fromTo(
        "[data-epitaph] > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.18, ease: "power2.out" },
        0.74,
      );
    }, stage);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="extinction" aria-labelledby="extinction-title" className="relative bg-abyss-950">
      <div ref={stageRef} className="relative h-svh overflow-hidden">
        {/* Dusk sky of the final day */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0a1622_0%,#36506b_40%,#593d20_75%,#1d130b_100%)]" />

        {/* Volcanic sky revealed at impact */}
        <div
          data-burnsky
          className={`absolute inset-0 bg-[linear-gradient(to_bottom,#1d0805_0%,#7a1f0e_38%,#c2401c_68%,#2c1d10_100%)] ${reduced ? "opacity-60" : "opacity-0"}`}
        />

        {/* Horizon */}
        <div className="absolute inset-x-0 bottom-0">
          <MountainRidge variant="mid" className="h-[30vh] w-full text-abyss-950" />
        </div>

        {/* The witness — a lone Triceratops */}
        <div data-witness className="absolute bottom-[4%] left-[6%] w-[42vw] max-w-[480px]">
          <Silhouette
            art={TRICERATOPS}
            title="A lone Triceratops watching the sky"
            className="h-auto w-full text-abyss-950"
          />
        </div>

        {/* The asteroid */}
        <div
          data-asteroid
          aria-hidden="true"
          className="absolute left-[86%] top-[-4%] h-7 w-7 opacity-0"
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 35%, #fff5e0 0%, #ffb84d 45%, #c2401c 100%)",
              boxShadow:
                "0 0 24px 8px rgba(255,184,77,0.85), -38px -30px 46px 6px rgba(255,90,46,0.4), -80px -64px 90px 10px rgba(194,64,28,0.25)",
            }}
          />
        </div>

        {/* Impact flash + shockwave */}
        <div data-flash aria-hidden="true" className="absolute inset-0 bg-bone-100 opacity-0" />
        <div
          data-shockwave
          aria-hidden="true"
          className="absolute left-[26%] top-[62%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber-pale opacity-0"
        />

        {/* Fire + ash atmospheres */}
        <div data-embers className={reduced ? "" : "opacity-0"}>
          <ParticleField mode="embers" density={0.7} className="absolute inset-0 h-full w-full" />
        </div>
        <div data-ash className={reduced ? "" : "opacity-0"}>
          <ParticleField mode="ash" density={0.8} className="absolute inset-0 h-full w-full" />
        </div>

        {/* Falling debris */}
        {!reduced &&
          DEBRIS.map((d, i) => (
            <div
              key={i}
              data-debris={i}
              aria-hidden="true"
              className="absolute opacity-0"
              style={{ left: d.left, top: "-6%" }}
            >
              <div
                style={{
                  width: d.size,
                  height: d.size,
                  background: "#1d130b",
                  boxShadow: "0 0 12px 2px rgba(255,90,46,0.55)",
                  borderRadius: "30% 60% 45% 55%",
                }}
              />
            </div>
          ))}

        {/* Copy beats */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
          <div data-omen className="max-w-xl" id="extinction-title">
            <p className="heading-eyebrow mb-5 text-volcanic-300">
              Chapter VI · 66 Million Years Ago · Chicxulub
            </p>
            <h2 className="heading-display text-[clamp(2.8rem,8vw,6.5rem)] text-bone-100">
              The Last Day
            </h2>
            <p className="body-lede mt-6">
              An asteroid eleven kilometres wide is about to strike the shallow sea
              off the Yucatán coast at twenty kilometres per second.
            </p>
          </div>

          <div
            data-epitaph
            className={`absolute inset-x-5 bottom-[14%] mx-auto max-w-2xl text-center sm:inset-x-8 ${reduced ? "" : "[&>*]:opacity-0"}`}
          >
            <p className="heading-display text-ember text-[clamp(2rem,5vw,3.8rem)]">
              In one afternoon,
            </p>
            <p className="heading-display text-[clamp(2rem,5vw,3.8rem)] text-bone-100">
              180 million years ended.
            </p>
            <p className="body-lede mx-auto mt-6 max-w-xl">
              Wildfires, tsunamis, and a decade of impact winter erased three of
              every four species on Earth. The non-avian dinosaurs never saw the sun return.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
