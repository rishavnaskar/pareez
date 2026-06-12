import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  sub,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  /** word(s) rendered in the orange gradient */
  accent?: string;
  sub?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal
      className={cn(
        "mb-14 max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      <p className="mb-3 text-xs font-bold tracking-[0.35em] text-brand uppercase">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl leading-tight font-semibold text-cream md:text-5xl">
        {title} {accent ? <span className="text-gradient-brand italic">{accent}</span> : null}
      </h2>
      {sub ? <p className="mt-5 text-base leading-relaxed text-cream-dim">{sub}</p> : null}
    </Reveal>
  );
}
