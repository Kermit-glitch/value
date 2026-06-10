"use client";

import { ERA_STATS } from "@/lib/dinosaurs";
import { useCountUp } from "@/hooks/useCountUp";

function Counter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: shown } = useCountUp(value);

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span
        ref={ref}
        className="text-ember font-display text-5xl font-bold tabular-nums sm:text-6xl"
      >
        {shown}
        {suffix}
      </span>
      <span className="heading-eyebrow !tracking-[0.26em] text-bone-500">{label}</span>
    </div>
  );
}

/** The animated statistics band — counts up the first time it scrolls into view. */
export function FactCounters() {
  return (
    <ul className="grid list-none grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
      {ERA_STATS.map((stat) => (
        <li key={stat.label}>
          <Counter value={stat.value} suffix={stat.suffix} label={stat.label} />
        </li>
      ))}
    </ul>
  );
}
