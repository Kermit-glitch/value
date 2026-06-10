import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-earth-800 bg-abyss-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 py-12 text-center sm:px-8">
        <p className="heading-eyebrow text-bone-500">
          The Age of <span className="text-amber-deep">Dinosaurs</span>
        </p>
        <p className="max-w-xl text-sm leading-relaxed text-bone-500">
          An educational, cinematic journey through the Mesozoic. All artwork is
          original vector illustration; species data follows published
          palaeontological estimates.
        </p>
        <nav aria-label="Footer" className="flex gap-8">
          <Link
            href="/credits"
            className="text-sm text-bone-300 underline-offset-4 transition-colors hover:text-amber-glow hover:underline"
          >
            Imagery & Credits
          </Link>
          <a
            href="#hero"
            className="text-sm text-bone-300 underline-offset-4 transition-colors hover:text-amber-glow hover:underline"
          >
            Back to the beginning ↑
          </a>
        </nav>
      </div>
    </footer>
  );
}
