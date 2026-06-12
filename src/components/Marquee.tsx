import { SERVICE_MARQUEE } from "@/lib/services";

/** Infinite scrolling service ticker dividing hero from content. */
export default function Marquee() {
  const row = [...SERVICE_MARQUEE, ...SERVICE_MARQUEE];
  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-cream/10 bg-ink-soft py-4"
    >
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {row.map((s, i) => (
          <span
            key={`${s}-${i}`}
            className="flex items-center gap-10 text-sm font-bold tracking-[0.25em] text-cream/55 uppercase"
          >
            {s}
            <span className="text-brand">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
