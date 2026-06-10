"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Fraction of the element that must be visible before revealing */
  amount?: number;
}

/** Fade-and-rise reveal triggered the first time the block enters the viewport. */
export function Reveal({ children, className, delay = 0, amount = 0.35 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Parent/child pair for staggered group reveals. */
export function RevealGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/**
 * Text-mask reveal: each line rises out of an overflow-hidden sleeve,
 * the signature cinematic title treatment used on section headings.
 */
export function MaskedLines({
  lines,
  className,
  as: Tag = "h2",
  delay = 0,
}: {
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, delay: delay + i * 0.14, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
