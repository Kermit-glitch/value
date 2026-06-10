"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const LINKS = [
  { href: "#dawn", label: "Triassic" },
  { href: "#giants", label: "Jurassic" },
  { href: "#predators", label: "Predators" },
  { href: "#sky", label: "Sky" },
  { href: "#ocean", label: "Ocean" },
  { href: "#extinction", label: "Extinction" },
  { href: "#discovery", label: "Discovery" },
] as const;

/**
 * Fixed header with anchor navigation and the global scroll progress bar.
 * Backdrop appears only after the hero is passed, keeping the opening shot clean.
 */
export function SiteNav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "bg-abyss-950/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Chapters"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
      >
        <a
          href="#hero"
          className="heading-eyebrow text-bone-100 transition-colors hover:text-amber-glow"
        >
          Age of <span className="text-amber-glow">Dinosaurs</span>
        </a>
        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-bone-300 transition-colors hover:text-amber-glow"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#discovery"
          className="heading-eyebrow rounded-full border border-amber-deep/60 px-4 py-2 text-amber-glow transition-colors hover:bg-amber-deep/15 lg:hidden"
        >
          Explore
        </a>
      </nav>
      {/* Global scroll progress bar */}
      <motion.div
        aria-hidden="true"
        className="h-[2px] origin-left bg-gradient-to-r from-amber-deep via-amber-glow to-volcanic-400"
        style={{ scaleX: progress }}
      />
    </header>
  );
}
