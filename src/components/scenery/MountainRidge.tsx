/**
 * Three pre-drawn mountain ridge profiles used as stacked parallax layers.
 * Each fills the full width and fades into the layer below via the scene's
 * own gradient; colour comes from `currentColor`.
 */

const RIDGES = {
  far: `M0 220 L70 160 L130 196 L210 110 L268 168 L340 96 L420 170 L470 140
        L560 200 L640 120 L700 168 L780 90 L850 160 L920 130 L1000 190
        L1080 140 L1160 200 L1200 180 L1200 320 L0 320 Z`,
  mid: `M0 250 L90 170 L150 220 L240 130 L330 230 L390 180 L480 250 L570 150
        L660 240 L730 190 L820 260 L900 160 L990 240 L1080 190 L1200 260
        L1200 320 L0 320 Z`,
  near: `M0 290 L110 200 L200 260 L310 170 L420 270 L520 210 L640 290
         L760 190 L880 280 L990 230 L1100 300 L1200 250 L1200 320 L0 320 Z`,
} as const;

export function MountainRidge({
  variant,
  className,
}: {
  variant: keyof typeof RIDGES;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1200 320"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={RIDGES[variant]} fill="currentColor" />
    </svg>
  );
}
