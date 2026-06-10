"use client";

import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type ParticleMode = "dust" | "embers" | "bubbles" | "ash" | "stars";

interface ParticleFieldProps {
  mode: ParticleMode;
  /** Particles per 10,000 px² of canvas — tuned low for GPU headroom. */
  density?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
}

/** Per-mode physics + palette. Velocities are px/s at 1x DPR. */
const MODES: Record<
  ParticleMode,
  { color: [number, number, number]; vy: [number, number]; vx: [number, number]; size: [number, number]; flicker: boolean }
> = {
  dust: { color: [255, 214, 150], vy: [-6, 4], vx: [4, 14], size: [0.6, 2.2], flicker: true },
  embers: { color: [255, 122, 40], vy: [-60, -18], vx: [-12, 18], size: [1, 3], flicker: true },
  bubbles: { color: [170, 220, 240], vy: [-40, -12], vx: [-6, 6], size: [0.8, 3.2], flicker: false },
  ash: { color: [216, 206, 192], vy: [18, 60], vx: [-20, -4], size: [0.8, 2.6], flicker: false },
  stars: { color: [255, 244, 220], vy: [0, 0], vx: [0, 0], size: [0.4, 1.6], flicker: true },
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);

/**
 * Lightweight 2D-canvas particle system used for dust motes, rising embers,
 * ocean bubbles, falling ash and star fields. A single rAF loop, no
 * allocations per frame, and automatic teardown when offscreen keeps the
 * cost far below a WebGL context per section.
 */
export function ParticleField({ mode, density = 0.6, className }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const conf = MODES[mode];
    let particles: Particle[] = [];
    let raf = 0;
    let last = performance.now();
    let running = false;
    let width = 0;
    let height = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const seed = () => {
      const count = Math.round(((width * height) / 10_000) * density);
      particles = Array.from({ length: count }, () => ({
        x: rand(0, width),
        y: rand(0, height),
        vx: rand(conf.vx[0], conf.vx[1]),
        vy: rand(conf.vy[0], conf.vy[1]),
        size: rand(conf.size[0], conf.size[1]),
        alpha: rand(0.25, 0.9),
        phase: rand(0, Math.PI * 2),
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, width, height);

      const [r, g, b] = conf.color;
      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.phase += dt * 1.4;

        // Wrap around edges so the field never empties
        if (p.x > width + 8) p.x = -8;
        if (p.x < -8) p.x = width + 8;
        if (p.y > height + 8) p.y = -8;
        if (p.y < -8) p.y = height + 8;

        const flicker = conf.flicker ? 0.55 + 0.45 * Math.sin(p.phase) : 1;
        ctx.globalAlpha = p.alpha * flicker;
        ctx.fillStyle = `rgb(${r} ${g} ${b})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Only burn frames while the canvas is actually on screen
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "20%" },
    );
    io.observe(canvas);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, [mode, density, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    />
  );
}
