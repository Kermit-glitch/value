# The Age of Dinosaurs 🦖

**A cinematic parallax storytelling experience — journey through 180 million years, from the Triassic dawn to the Chicxulub impact and the science of discovery.**

Built as a digital museum exhibition: multi-layer parallax landscapes, scroll-scrubbed
cinematic sequences, procedural atmosphere (fog, dust, embers, ash, bubbles, stars),
and scientifically grounded species data.

---

## The Journey (8 Chapters)

| # | Chapter | Experience |
|---|---------|-----------|
| 0 | **Hero** | WebGL star dome, multi-layer parallax mountains, drifting fog, a T. rex silhouette in the valley |
| 1 | **Dawn of the Dinosaurs** | Triassic red-earth Pangaea, sprinting early theropods, an ammonite fossil that draws itself |
| 2 | **Walk Among Giants** | Jurassic jungle in five parallax depths — distant herds, conifer forest, a towering Brachiosaurus |
| 3 | **The Tyrant King** | GSAP-pinned spotlight sequence: T. rex advances out of darkness as you scroll |
| 4 | **Lords of the Air** | Pteranodon wing crossing the screen at three depths through parallax clouds |
| 5 | **Monsters of the Deep** | Submerged viewport — rolling waves, caustic light, bubbles, a cruising Mosasaurus |
| 6 | **The Last Day** | Pinned, scroll-scrubbed asteroid impact: streak, flash, shockwave, burning sky, falling debris, ash |
| 7 | **Written in Stone** | Animated stat counters, interactive discovery timeline, flip-open species dossiers |

## Tech Stack

- **Next.js 16** (App Router, static prerender, Turbopack) + **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first theme: jungle / earth / amber / volcanic / mist palette)
- **Framer Motion** — parallax layers, masked-line title reveals, staggered groups
- **GSAP ScrollTrigger** — pinned, scrubbed cinematic sequences (Predators, Extinction)
- **Lenis** — smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync
- **Three.js / React Three Fiber** — the hero star dome (lazy-loaded, client-only)

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build (also runs TypeScript checks)
npm run start        # serve the production build
npm run typecheck    # tsc --noEmit
npm run preview:art  # render every SVG silhouette to .preview/*.png for proofing
```

## Deploying to Vercel

1. Push this repository to GitHub.
2. In [Vercel](https://vercel.com/new), **Import** the repo — the Next.js preset is detected automatically; no configuration needed.
3. (Recommended) Set the environment variable `NEXT_PUBLIC_SITE_URL` to your production URL (e.g. `https://your-domain.com`) so Open Graph tags, `sitemap.xml` and `robots.txt` emit correct absolute URLs.
4. Deploy. Every route is statically prerendered, so the site is served entirely from the edge cache.

CLI alternative: `npx vercel --prod`.

## Project Structure

```
src/
  app/
    layout.tsx            # fonts, SEO metadata, JSON-LD, smooth-scroll provider
    page.tsx              # the 8-chapter journey
    credits/page.tsx      # attribution page (renders public/credits.json)
    sitemap.ts robots.ts  # SEO endpoints
  components/
    sections/             # one component per chapter
    scenery/              # hand-drawn silhouette artwork + renderer + ridges
    effects/              # ParticleField (canvas), FogLayer
    canvas/               # StarField (React Three Fiber)
    motion/               # ParallaxLayer, Reveal / MaskedLines primitives
    ui/                   # nav, footer, cards, timeline, counters, headings
    providers/            # Lenis + GSAP ScrollTrigger sync
  hooks/                  # useParallax, useCountUp, usePrefersReducedMotion
  lib/                    # species data, eras, discovery timeline
public/credits.json       # single source of truth for asset provenance
scripts/preview-silhouettes.mjs  # dev tool: proofs the SVG artwork as PNGs
```

## Imagery & Licensing

The build environment for this project had **no network route to external image
hosts** (Wikimedia Commons, Unsplash, NASA and Flickr all blocked), so the
entire visual world is **original, hand-drawn vector and procedural artwork** —
nothing here carries a third-party copyright.

To add real photography later:

1. Download only clearly licensed files (see `recommendedSources` in `public/credits.json` — Wikimedia Commons, Smithsonian Open Access CC0, NASA, Unsplash).
2. Optimise to WebP/AVIF and place under `public/images/<section>/`.
3. Render via `next/image` (lazy loading and srcset come free).
4. Register every file in `public/credits.json` — the `/credits` page renders directly from it.

## Performance & Accessibility

- All routes statically prerendered; the WebGL hero is code-split and loaded client-side only.
- Animations are transform/opacity only (GPU-composited); particle canvases pause offscreen via `IntersectionObserver` and cap device-pixel-ratio at 2.
- No layout shifts: every scene layer is absolutely positioned; fonts load with `display: swap`.
- `prefers-reduced-motion` disables smooth scrolling, pinned sequences, parallax and particles — the story remains a fully readable document.
- Semantic landmarks, skip link, keyboard-operable cards, `aria-hidden` decoration, visible focus states.

## Scientific Accuracy

Species statistics (length, mass, age ranges, distribution) follow current
peer-reviewed consensus estimates. Pteranodon and Mosasaurus are deliberately
captioned as *not* dinosaurs — they are a pterosaur and a marine squamate.
