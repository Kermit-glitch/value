interface FogLayerProps {
  /** CSS colour of the fog body */
  tint?: string;
  opacity?: number;
  className?: string;
  /** Drift direction — alternate per layer for believable depth */
  reverse?: boolean;
}

/**
 * A wide, blurred bank of fog that drifts horizontally forever.
 * Built from stacked radial gradients on an oversized strip so the drift
 * animation (pure transform, GPU-composited) never reveals an edge.
 */
export function FogLayer({
  tint = "rgba(143, 182, 201, 0.5)",
  opacity = 0.5,
  className = "",
  reverse = false,
}: FogLayerProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-[-30%] ${className}`}
      style={{ opacity }}
    >
      <div
        className={`h-full w-full ${reverse ? "fog-layer-reverse" : "fog-layer"}`}
        style={{
          background: `
            radial-gradient(ellipse 42% 58% at 18% 52%, ${tint} 0%, transparent 70%),
            radial-gradient(ellipse 36% 48% at 46% 38%, ${tint} 0%, transparent 70%),
            radial-gradient(ellipse 48% 64% at 74% 58%, ${tint} 0%, transparent 70%),
            radial-gradient(ellipse 30% 42% at 94% 44%, ${tint} 0%, transparent 70%)`,
          filter: "blur(14px)",
        }}
      />
    </div>
  );
}
