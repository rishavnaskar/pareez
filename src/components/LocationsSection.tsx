import Link from "next/link";
import { Clock, MapPin, Navigation, Phone, Sparkle } from "lucide-react";
import { BRANCHES } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function LocationsSection({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8" id="locations">
      {withHeading && (
        <SectionHeading
          eyebrow="Visit Us"
          title="Two branches,"
          accent="one standard"
          sub="Find us in the heart of South Kolkata — walk in, call, or book ahead on WhatsApp."
        />
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        {BRANCHES.map((b, i) => (
          <Reveal key={b.id} delay={i * 0.12} from={i === 0 ? "left" : "right"}>
            <article className="group overflow-hidden rounded-3xl glass-panel transition-colors duration-300 hover:border-brand/35">
              <div className="relative h-72 overflow-hidden">
                <iframe
                  src={b.mapsEmbedUrl}
                  title={`Map — ${b.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0 opacity-90 grayscale-[35%] transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                  allowFullScreen
                />
                <span className="absolute top-4 left-4 rounded-full bg-ink/85 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand uppercase backdrop-blur">
                  {b.shortName}
                </span>
              </div>

              <div className="p-8">
                <h3 className="font-display text-2xl font-semibold text-cream">
                  {b.name}
                </h3>

                <ul className="mt-5 space-y-3 text-sm text-cream-dim">
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 size-4.5 shrink-0 text-brand" />
                    {b.addressLine1}, {b.addressLine2}, {b.locality} {b.postalCode}
                  </li>
                  <li className="flex gap-3">
                    <Phone className="mt-0.5 size-4.5 shrink-0 text-brand" />
                    <a href={b.phoneHref} className="transition-colors hover:text-brand-bright">
                      {b.phone}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <Clock className="mt-0.5 size-4.5 shrink-0 text-brand" />
                    {b.hours}
                  </li>
                </ul>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {b.highlights.map((h) => (
                    <li
                      key={h}
                      className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand-bright ring-1 ring-brand/25"
                    >
                      <Sparkle className="size-3" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={b.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-ink transition-all duration-300 hover:bg-brand-bright"
                  >
                    <Navigation className="size-4" />
                    Get Directions
                  </a>
                  <Link
                    href={`/book?branch=${b.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-6 py-3 text-sm font-semibold text-cream transition-all duration-300 hover:border-brand hover:text-brand-bright"
                  >
                    Book at this branch
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
