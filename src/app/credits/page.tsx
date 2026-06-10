import type { Metadata } from "next";
import Link from "next/link";

import credits from "../../../public/credits.json";

export const metadata: Metadata = {
  title: "Imagery & Credits",
  description:
    "Every visual asset in The Age of Dinosaurs, its author and its license — plus recommended sources for legally usable dinosaur photography.",
};

interface CreditAsset {
  id: string;
  title: string;
  type: string;
  source: string;
  author: string;
  license: string;
}

interface RecommendedSource {
  name: string;
  url: string;
  licenses: string;
}

/**
 * The attribution page. Reads from /public/credits.json — the single source
 * of truth for asset provenance — so the JSON and this page can never drift.
 */
export default function CreditsPage() {
  const assets = credits.assets as CreditAsset[];
  const sources = credits.recommendedSources as RecommendedSource[];

  return (
    <main className="min-h-screen bg-abyss-950">
      <div className="mx-auto max-w-4xl px-5 py-24 sm:px-8">
        <Link
          href="/"
          className="heading-eyebrow text-bone-500 transition-colors hover:text-amber-glow"
        >
          ← The Age of Dinosaurs
        </Link>

        <h1 className="heading-display text-ember mt-8 text-5xl sm:text-6xl">
          Imagery & Credits
        </h1>

        <p className="body-lede mt-8">
          Every visual in this experience is original artwork created for the
          project — hand-drawn SVG silhouettes, gradient scenery, and procedural
          particle systems. No third-party photography is used, so nothing here
          carries an external copyright.
        </p>

        <section aria-labelledby="assets-heading" className="mt-16">
          <h2 id="assets-heading" className="heading-display text-2xl text-bone-100">
            Assets in This Build
          </h2>
          <ul className="mt-6 space-y-4">
            {assets.map((asset) => (
              <li
                key={asset.id}
                className="rounded-lg border border-earth-700/60 bg-abyss-900/60 p-5"
              >
                <h3 className="font-display font-semibold tracking-wide text-bone-100">
                  {asset.title}
                </h3>
                <dl className="mt-3 grid gap-x-8 gap-y-1 text-sm text-bone-300 sm:grid-cols-2">
                  <div className="flex gap-2">
                    <dt className="text-bone-500">Type:</dt>
                    <dd>{asset.type}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-bone-500">Author:</dt>
                    <dd>{asset.author}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-bone-500">Source:</dt>
                    <dd className="break-all">{asset.source}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-bone-500">License:</dt>
                    <dd>{asset.license}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="sources-heading" className="mt-16">
          <h2 id="sources-heading" className="heading-display text-2xl text-bone-100">
            Adding Real Photography
          </h2>
          <p className="mt-4 leading-relaxed text-bone-300">
            The build machine for this site had no route to external image hosts,
            so photographic plates were intentionally replaced with original
            vector art. To add photographs, use sources with clear usage rights,
            place optimised files under <code className="text-amber-pale">public/images/</code>,
            and register each one in{" "}
            <code className="text-amber-pale">public/credits.json</code> — this page
            renders directly from that file.
          </p>
          <ul className="mt-6 space-y-3">
            {sources.map((source) => (
              <li
                key={source.name}
                className="flex flex-col gap-1 rounded-lg border border-earth-800 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <a
                  href={source.url}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-bone-100 underline-offset-4 hover:text-amber-glow hover:underline"
                >
                  {source.name}
                </a>
                <span className="text-sm text-bone-500">{source.licenses}</span>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-16 text-sm text-bone-500">
          Species statistics follow published palaeontological consensus
          estimates. This site is an educational work of science communication.
        </p>
      </div>
    </main>
  );
}
