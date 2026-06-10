import type { CSSProperties } from "react";

import type { SilhouetteArt } from "@/components/scenery/paths";

interface SilhouetteProps {
  art: SilhouetteArt;
  className?: string;
  style?: CSSProperties;
  /** Provide a title to expose the artwork to assistive tech; omitted = decorative. */
  title?: string;
  flip?: boolean;
}

/**
 * Renders one of the hand-drawn silhouettes from `paths.ts`.
 * Colour is inherited (`fill: currentColor`) so scenes can tint creatures
 * with Tailwind text utilities, and `flip` mirrors the artwork horizontally.
 */
export function Silhouette({ art, className, style, title, flip }: SilhouetteProps) {
  return (
    <svg
      viewBox={art.viewBox}
      className={className}
      style={style}
      preserveAspectRatio="xMidYMax meet"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <g transform={flip ? `translate(${art.viewBox.split(" ")[2]}, 0) scale(-1, 1)` : undefined}>
        {art.paths.map((d, i) => (
          <path key={i} d={d} fill="currentColor" />
        ))}
      </g>
    </svg>
  );
}
