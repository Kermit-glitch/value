"use client";

import Link from "next/link";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import {
  BRACHIOSAURUS,
  MOSASAURUS,
  PTERANODON,
  STEGOSAURUS,
  TREX,
  TRICERATOPS,
  VELOCIRAPTOR,
  type SilhouetteArt,
} from "@/components/scenery/paths";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpeciesCard } from "@/components/ui/SpeciesCard";
import { DiscoveryTimeline } from "@/components/ui/DiscoveryTimeline";
import { FactCounters } from "@/components/ui/FactCounters";
import { SPECIES } from "@/lib/dinosaurs";

const ART: Record<string, SilhouetteArt> = {
  tyrannosaurus: TREX,
  triceratops: TRICERATOPS,
  velociraptor: VELOCIRAPTOR,
  brachiosaurus: BRACHIOSAURUS,
  stegosaurus: STEGOSAURUS,
  pteranodon: PTERANODON,
  mosasaurus: MOSASAURUS,
};

/**
 * Chapter 7 — back in the present. The mood lifts to bone-and-amber museum
 * light: animated statistics, the history of discovery as an interactive
 * timeline, and a dossier gallery of every species in the story.
 */
export function Discovery() {
  return (
    <section
      id="discovery"
      aria-labelledby="discovery-title"
      className="relative overflow-hidden bg-[linear-gradient(to_bottom,#030605_0%,#0a1410_12%,#1d130b_50%,#0a1410_88%,#030605_100%)]"
    >
      <div className="relative mx-auto max-w-7xl px-5 py-36 sm:px-8 lg:py-48">
        <div id="discovery-title" className="mx-auto max-w-3xl">
          <SectionHeading
            align="center"
            eyebrow="Chapter VII · The Present"
            lines={["Written in", "Stone"]}
            lede="Sixty-six million years later, we found them. Every mounted skeleton, every feather impression, every healed bite mark is a sentence in the longest story ever told."
          />
        </div>

        <div className="mt-24">
          <FactCounters />
        </div>

        {/* Discovery timeline */}
        <div className="mt-32">
          <Reveal className="mb-16 text-center">
            <h3 className="heading-display text-3xl text-bone-100 sm:text-4xl">
              Two Centuries of Discovery
            </h3>
          </Reveal>
          <DiscoveryTimeline />
        </div>

        {/* Species dossier gallery */}
        <div className="mt-32">
          <Reveal className="mb-12 text-center">
            <h3 className="heading-display text-3xl text-bone-100 sm:text-4xl">
              The Cast, Recovered
            </h3>
            <p className="body-lede mx-auto mt-4 max-w-2xl">
              Open a dossier to read the field notes — every figure here follows
              current peer-reviewed estimates.
            </p>
          </Reveal>

          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SPECIES.map((species) => (
              <RevealItem key={species.id}>
                <SpeciesCard species={species} art={ART[species.id]} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="mt-28 text-center">
          <p className="body-lede mx-auto max-w-2xl">
            And the story never ended — look up. Every sparrow and swift is a
            living theropod dinosaur, still writing the next chapter.
          </p>
          <Link
            href="/credits"
            className="heading-eyebrow mt-10 inline-block rounded-full border border-amber-deep/60 px-6 py-3 text-amber-glow transition-colors hover:bg-amber-deep/15"
          >
            Imagery & Sources
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
