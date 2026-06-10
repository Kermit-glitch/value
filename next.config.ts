import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // All imagery is procedurally generated (SVG / canvas / WebGL), so the
  // default image loader is never hit with remote URLs. AVIF/WebP stay
  // enabled for any photographic assets dropped into /public/images later.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Three.js and GSAP ship large CJS/ESM bundles — let Next tree-shake them.
  experimental: {
    optimizePackageImports: ["three", "gsap", "framer-motion"],
  },
};

export default nextConfig;
