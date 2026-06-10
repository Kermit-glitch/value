import type { Metadata, Viewport } from "next";
import { Cinzel, EB_Garamond } from "next/font/google";

import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700"],
  display: "swap",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://age-of-dinosaurs.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Age of Dinosaurs — Journey Through 180 Million Years",
    template: "%s · The Age of Dinosaurs",
  },
  description:
    "A cinematic, museum-quality scrolling journey through the Mesozoic — from the first Triassic hunters to Jurassic giants, tyrant kings, sea monsters, and the asteroid that ended it all.",
  keywords: [
    "dinosaurs",
    "Mesozoic",
    "Tyrannosaurus rex",
    "Triassic",
    "Jurassic",
    "Cretaceous",
    "extinction event",
    "palaeontology",
    "interactive museum",
  ],
  openGraph: {
    title: "The Age of Dinosaurs",
    description: "Journey Through 180 Million Years — a cinematic scrolling natural history.",
    url: SITE_URL,
    siteName: "The Age of Dinosaurs",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Age of Dinosaurs",
    description: "Journey Through 180 Million Years — a cinematic scrolling natural history.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#030605",
  width: "device-width",
  initialScale: 1,
};

/** Structured data: the experience is an educational exhibition page. */
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "The Age of Dinosaurs",
  url: SITE_URL,
  description:
    "A cinematic scrolling journey through the Mesozoic era — Triassic, Jurassic and Cretaceous periods, the K–Pg extinction, and the science of dinosaur discovery.",
  about: { "@type": "Thing", name: "Dinosaurs and the Mesozoic Era" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${garamond.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
