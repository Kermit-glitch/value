"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Silhouette } from "@/components/scenery/Silhouette";
import type { SilhouetteArt } from "@/components/scenery/paths";
import type { Species } from "@/lib/dinosaurs";

interface SpeciesCardProps {
  species: Species;
  art: SilhouetteArt;
}

const DIET_TONE: Record<Species["diet"], string> = {
  Carnivore: "text-volcanic-300 border-volcanic-500/50",
  Herbivore: "text-jungle-400 border-jungle-600/60",
  Piscivore: "text-mist-300 border-mist-500/60",
};

/**
 * Interactive species dossier. The face shows the silhouette and vital
 * statistics; activating the card flips it open to reveal field notes.
 * Fully keyboard operable — the whole card is a real <button>.
 */
export function SpeciesCard({ species, art }: SpeciesCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative overflow-hidden rounded-xl border border-earth-700/60 bg-gradient-to-b from-abyss-800 to-abyss-900 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.8)]"
    >
      {/* Amber rim light on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 60% at 50% 0%, rgba(255,184,77,0.12) 0%, transparent 60%)",
        }}
      />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="block w-full cursor-pointer p-6 text-left"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-bold tracking-wide text-bone-100">
              {species.name}
            </h3>
            <p className="mt-1 text-sm italic text-bone-500">
              “{species.meaning}” · {species.pronunciation}
            </p>
          </div>
          <span
            className={`shrink-0 rounded-full border px-3 py-1 font-display text-[0.6rem] font-semibold uppercase tracking-[0.2em] ${DIET_TONE[species.diet]}`}
          >
            {species.diet}
          </span>
        </div>

        <div className="relative mt-4 h-28">
          <Silhouette
            art={art}
            title={`${species.name} silhouette`}
            className="h-full w-full text-earth-400/90 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>

        <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-earth-700/50 pt-4 text-center">
          {[
            ["Era", `${species.era}`],
            ["Length", `${species.lengthMeters} m`],
            [
              "Mass",
              species.weightTonnes < 1
                ? `${Math.round(species.weightTonnes * 1000)} kg`
                : `${species.weightTonnes} t`,
            ],
          ].map(([dt, dd]) => (
            <div key={dt}>
              <dt className="heading-eyebrow !tracking-[0.2em] text-bone-500">{dt}</dt>
              <dd className="mt-1 font-display text-sm font-semibold text-amber-pale">{dd}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-4 text-sm leading-relaxed text-bone-300">{species.tagline}</p>

        <span className="mt-4 inline-block font-display text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-amber-glow">
          {open ? "− Close field notes" : "+ Field notes"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="space-y-3 border-t border-earth-700/50 px-6 pb-6 pt-4">
              {species.facts.map((fact) => (
                <li key={fact} className="flex gap-3 text-sm leading-relaxed text-bone-300">
                  <span aria-hidden="true" className="mt-[2px] text-amber-deep">
                    ◆
                  </span>
                  {fact}
                </li>
              ))}
              <li className="pt-1 text-xs uppercase tracking-[0.2em] text-bone-500">
                {species.livedMya[0]}–{species.livedMya[1]} million years ago · {species.region}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
