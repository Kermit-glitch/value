"use client";

import { FogLayer } from "@/components/effects/FogLayer";
import { ParticleField } from "@/components/effects/ParticleField";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { MountainRidge } from "@/components/scenery/MountainRidge";
import { Silhouette } from "@/components/scenery/Silhouette";
import {
  BRACHIOSAURUS,
  CONIFER,
  FERN,
  SAUROPOD_DISTANT,
  STEGOSAURUS,
} from "@/components/scenery/paths";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ERAS } from "@/lib/eras";

const GIANT_FACTS = [
  { name: "Brachiosaurus", stat: "13 m tall", note: "browsed the canopy like a living crane" },
  { name: "Stegosaurus", stat: "17 plates", note: "and a four-spiked tail palaeontologists call the thagomizer" },
  { name: "Sauropod herds", stat: "40+ tonnes", note: "shook the floodplains of the Morrison Formation" },
] as const;

/**
 * Chapter 2 — the Jurassic. Five parallax depths: misted ridges, a distant
 * herd, the conifer forest, a towering Brachiosaurus, and foreground ferns,
 * with dust motes drifting through the canopy light.
 */
export function JurassicGiants() {
  const jurassic = ERAS[1];

  return (
    <section
      id="giants"
      aria-labelledby="giants-title"
      className="vignette relative overflow-hidden bg-[linear-gradient(to_bottom,#060d0a_0%,#0b2418_22%,#103223_55%,#0b2418_82%,#060d0a_100%)]"
    >
      <ParticleField mode="dust" density={0.5} className="absolute inset-0 h-full w-full" />

      {/* Layer 1 — far ridge under mist */}
      <ParallaxLayer speed={0.1} className="absolute inset-x-0 top-[10%]">
        <MountainRidge variant="far" className="h-[28vh] w-full text-jungle-900/90" />
      </ParallaxLayer>
      <FogLayer className="top-[20%] h-[22vh]" tint="rgba(143,182,201,0.22)" opacity={0.9} />

      {/* Layer 2 — distant herd on the plain */}
      <ParallaxLayer speed={0.18} className="absolute inset-x-0 top-[30%]">
        <div className="relative h-[24vh]">
          <Silhouette
            art={SAUROPOD_DISTANT}
            title="A herd of sauropods on the misty plain"
            className="absolute bottom-0 left-[12%] h-[80%] w-auto text-jungle-900"
          />
          <Silhouette art={SAUROPOD_DISTANT} flip className="absolute bottom-0 left-[30%] h-[55%] w-auto text-jungle-900/80" />
          <Silhouette art={SAUROPOD_DISTANT} className="absolute bottom-[4%] right-[18%] h-[48%] w-auto text-jungle-900/70" />
        </div>
      </ParallaxLayer>

      {/* Layer 3 — conifer forest */}
      <ParallaxLayer speed={0.32} className="absolute inset-x-0 bottom-[14%]">
        <div className="relative h-[40vh]">
          <Silhouette art={CONIFER} className="absolute bottom-0 left-[2%] h-[88%] w-auto text-abyss-900" />
          <Silhouette art={CONIFER} className="absolute bottom-0 left-[12%] h-[64%] w-auto text-abyss-900/90" />
          <Silhouette art={CONIFER} flip className="absolute bottom-0 right-[26%] h-[72%] w-auto text-abyss-900/90" />
          <Silhouette art={CONIFER} className="absolute bottom-0 right-[14%] h-[95%] w-auto text-abyss-900" />
        </div>
      </ParallaxLayer>

      <FogLayer className="bottom-[16%] h-[18vh]" tint="rgba(62,138,100,0.18)" opacity={0.9} reverse />

      {/* Layer 4 — the giants themselves */}
      <ParallaxLayer speed={0.46} className="absolute inset-x-0 bottom-[2%]">
        <div className="relative h-[58vh]">
          <Silhouette
            art={BRACHIOSAURUS}
            title="A Brachiosaurus reaching into the treetops"
            className="absolute bottom-0 right-[-2%] h-full w-auto text-abyss-950"
          />
          <Silhouette
            art={STEGOSAURUS}
            title="A Stegosaurus grazing"
            className="absolute bottom-0 left-[4%] hidden h-[34%] w-auto text-abyss-950 md:block"
          />
        </div>
      </ParallaxLayer>

      {/* Layer 5 — foreground ferns, fastest */}
      <ParallaxLayer speed={0.7} className="absolute inset-x-0 bottom-[-2%]">
        <div className="relative h-[12vh]">
          <Silhouette art={FERN} className="absolute bottom-0 left-[6%] h-full w-auto text-abyss-950" />
          <Silhouette art={FERN} flip className="absolute bottom-0 right-[2%] h-[80%] w-auto text-abyss-950" />
        </div>
      </ParallaxLayer>

      <div className="relative mx-auto max-w-7xl px-5 py-40 sm:px-8 lg:py-56">
        <div id="giants-title" className="max-w-2xl">
          <SectionHeading
            eyebrow={`Chapter II · ${jurassic.name} · ${jurassic.span}`}
            lines={["Walk Among", "Giants"]}
            lede={jurassic.summary}
          />
        </div>

        <RevealGroup className="mt-16 grid max-w-3xl gap-4 sm:grid-cols-3">
          {GIANT_FACTS.map((fact) => (
            <RevealItem
              key={fact.name}
              className="rounded-lg border border-jungle-700/60 bg-abyss-900/50 p-5 backdrop-blur-sm"
            >
              <p className="font-display text-2xl font-bold text-amber-glow">{fact.stat}</p>
              <p className="mt-2 text-sm leading-relaxed text-bone-300">
                <span className="font-semibold text-bone-100">{fact.name}</span> — {fact.note}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Spacer so the giants own the lower viewport */}
        <div className="h-[44vh]" aria-hidden="true" />

        <Reveal className="max-w-md">
          <p className="border-l-2 border-amber-deep/70 pl-6 text-lg italic leading-relaxed text-bone-300">
            A single Brachiosaurus heart pumped roughly 400 litres of blood —
            two metres uphill — with every beat.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
