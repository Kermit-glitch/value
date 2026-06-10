import { MaskedLines, Reveal } from "@/components/motion/Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  lines: string[];
  lede?: string;
  align?: "left" | "center";
  /** Tailwind text colour class for the headline */
  tone?: string;
}

/**
 * The standard chapter title block: era eyebrow, massive masked headline,
 * and an optional lede paragraph. Keeps every section's typography identical.
 */
export function SectionHeading({
  eyebrow,
  lines,
  lede,
  align = "left",
  tone = "text-bone-100",
}: SectionHeadingProps) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-5 ${alignCls}`}>
      <Reveal amount={0.6}>
        <p className="heading-eyebrow text-amber-glow">{eyebrow}</p>
      </Reveal>
      <MaskedLines
        lines={lines}
        className={`heading-display text-[clamp(2.6rem,7vw,5.8rem)] ${tone}`}
      />
      {lede ? (
        <Reveal delay={0.25} className={align === "center" ? "max-w-2xl" : "max-w-xl"}>
          <p className="body-lede">{lede}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
