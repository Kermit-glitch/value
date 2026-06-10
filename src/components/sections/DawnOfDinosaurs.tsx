"use client";

import { motion } from "framer-motion";

import { FogLayer } from "@/components/effects/FogLayer";
import { ParticleField } from "@/components/effects/ParticleField";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { Reveal } from "@/components/motion/Reveal";
import { MountainRidge } from "@/components/scenery/MountainRidge";
import { Silhouette } from "@/components/scenery/Silhouette";
import { CYCAD, FERN, VELOCIRAPTOR } from "@/components/scenery/paths";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ERAS } from "@/lib/eras";

/** Logarithmic spiral for the ammonite fossil motif, generated once. */
function ammonitePath(): string {
  const pts: string[] = [];
  for (let t = 0; t <= Math.PI * 7; t += 0.12) {
    const r = 4 * Math.exp(0.115 * t);
    const x = 100 + r * Math.cos(t);
    const y = 100 + r * Math.sin(t);
    pts.push(`${pts.length === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}
const AMMONITE = ammonitePath();

/**
 * Chapter 1 — the Triassic. Iron-red Pangaean desert, the first small
 * theropods sprinting across the floodplain, and an ammonite that draws
 * itself like an excavated fossil.
 */
export function DawnOfDinosaurs() {
  const triassic = ERAS[0];

  return (
    <section
      id="dawn"
      aria-labelledby="dawn-title"
      className="vignette relative overflow-hidden bg-[linear-gradient(to_bottom,#060d0a_0%,#1d130b_18%,#3e2a17_55%,#2c1d10_85%,#060d0a_100%)]"
    >
      {/* Dust motes hang in the dry air */}
      <ParticleField mode="dust" density={0.45} className="absolute inset-0 h-full w-full" />

      {/* Distant red mesas */}
      <ParallaxLayer speed={0.12} className="absolute inset-x-0 top-[16%]">
        <MountainRidge variant="far" className="h-[30vh] w-full text-earth-800/80" />
      </ParallaxLayer>
      <FogLayer className="top-[28%] h-[20vh]" tint="rgba(194,64,28,0.16)" opacity={0.8} />

      {/* Mid vegetation band */}
      <ParallaxLayer speed={0.3} className="absolute inset-x-0 bottom-[8%]">
        <div className="relative h-[26vh]">
          <Silhouette art={CYCAD} className="absolute bottom-0 left-[4%] h-[55%] w-auto text-earth-900" />
          <Silhouette art={CYCAD} flip className="absolute bottom-0 left-[16%] h-[38%] w-auto text-earth-900/80" />
          <Silhouette art={CYCAD} className="absolute bottom-0 right-[8%] h-[48%] w-auto text-earth-900/90" />
        </div>
      </ParallaxLayer>

      {/* Early theropods sprinting — fastest scenery layer */}
      <ParallaxLayer speed={0.5} className="absolute inset-x-0 bottom-[5%]">
        <div className="relative h-[20vh]">
          <motion.div
            initial={{ x: "16vw", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-[6%] h-[70%]"
          >
            <Silhouette
              art={VELOCIRAPTOR}
              title="A small early theropod dinosaur sprinting"
              className="h-full w-auto text-earth-900"
            />
          </motion.div>
          <motion.div
            initial={{ x: "22vw", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-[28%] h-[48%]"
          >
            <Silhouette art={VELOCIRAPTOR} className="h-full w-auto text-earth-900/80" />
          </motion.div>
        </div>
      </ParallaxLayer>

      {/* Foreground ferns */}
      <ParallaxLayer speed={0.65} className="absolute inset-x-0 bottom-[-2%]">
        <div className="relative h-[14vh]">
          <Silhouette art={FERN} className="absolute bottom-0 left-[-2%] h-[90%] w-auto text-abyss-950" />
          <Silhouette art={FERN} flip className="absolute bottom-0 right-[-3%] h-[110%] w-auto text-abyss-950" />
        </div>
      </ParallaxLayer>

      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 py-36 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:py-48">
        <div id="dawn-title">
          <SectionHeading
            eyebrow={`Chapter I · ${triassic.name} · ${triassic.span}`}
            lines={["Dawn of", "the Dinosaurs"]}
            lede={triassic.summary}
          />

          <Reveal delay={0.2} className="mt-10 max-w-xl">
            <blockquote className="border-l-2 border-amber-deep/70 pl-6 text-lg italic leading-relaxed text-bone-300">
              On a single supercontinent scorched by monsoons, a quiet lineage of
              slender hunters waited two-legged in the ferns — and inherited the Earth.
            </blockquote>
          </Reveal>
        </div>

        {/* Fossil panel — the ammonite inscribes itself on scroll */}
        <Reveal amount={0.4} className="self-center">
          <figure className="rounded-xl border border-earth-700/60 bg-earth-900/40 p-8 backdrop-blur-sm">
            <svg viewBox="0 0 200 200" className="mx-auto h-56 w-56" role="img" aria-label="Ammonite fossil spiral">
              <motion.path
                d={AMMONITE}
                fill="none"
                stroke="#d9cbb0"
                strokeWidth="1.6"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.4 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
            </svg>
            <figcaption className="mt-6 text-center text-sm leading-relaxed text-bone-500">
              Ammonites — spiral-shelled relatives of squid — flourished through the
              entire Mesozoic and perished alongside the dinosaurs, making them
              perfect geological clocks for dating fossil beds.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
