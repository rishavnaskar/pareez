import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, MapPin, Navigation, Phone, Sparkle } from "lucide-react";
import { BRANCHES } from "@/lib/site";
import Reveal from "@/components/Reveal";
import CtaSection from "@/components/CtaSection";

/**
 * Dedicated landing page per branch — the workhorse of local SEO
 * ("salon in Garfa", "salon in Jadavpur" searches).
 */

type Params = { branch: string };

export function generateStaticParams(): Params[] {
  return BRANCHES.map((b) => ({ branch: b.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { branch } = await params;
  const b = BRANCHES.find((x) => x.id === branch);
  if (!b) return {};
  const area = b.id === "garfa" ? "Garfa" : "Jadavpur";
  return {
    title: `${b.name} — Best Salon in ${area}, Kolkata`,
    description: `${b.name}: premium unisex salon in ${area}, South Kolkata at ${b.addressLine1}. Haircuts, hair colour, keratin, bridal makeup, skin & nails. ${b.hours}. Call ${b.phone} or book online.`,
    alternates: { canonical: `/locations/${b.id}` },
  };
}

export default async function BranchPage({ params }: { params: Promise<Params> }) {
  const { branch } = await params;
  const b = BRANCHES.find((x) => x.id === branch);
  if (!b) notFound();

  const area = b.id === "garfa" ? "Garfa" : "Jadavpur";

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-16">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(700px_circle_at_75%_10%,rgba(244,103,15,0.13),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <p className="mb-3 text-xs font-bold tracking-[0.35em] text-brand uppercase">
              Pareez · {b.shortName}
            </p>
            <h1 className="max-w-3xl font-display text-4xl leading-tight font-semibold text-cream md:text-6xl">
              Your premium salon in{" "}
              <span className="text-gradient-brand italic">{area}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream-dim">
              {b.name} brings the complete Pareez experience to {area} — expert
              unisex haircuts, hair colour, keratin &amp; nanoplastia rituals,
              bridal makeup, skin, and nail artistry, all in a luxurious studio.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div className="overflow-hidden rounded-3xl border border-cream/10">
                <iframe
                  src={b.mapsEmbedUrl}
                  title={`Map — ${b.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-105 w-full border-0"
                  allowFullScreen
                />
              </div>

              <div className="rounded-3xl glass-panel p-8">
                <h2 className="font-display text-2xl font-semibold text-cream">
                  Visit us
                </h2>
                <ul className="mt-6 space-y-4 text-sm text-cream-dim">
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-brand" />
                    {b.addressLine1}, {b.addressLine2}, {b.locality} {b.postalCode}
                  </li>
                  <li className="flex gap-3">
                    <Phone className="mt-0.5 size-5 shrink-0 text-brand" />
                    <a href={b.phoneHref} className="hover:text-brand-bright">
                      {b.phone}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <Clock className="mt-0.5 size-5 shrink-0 text-brand" />
                    {b.hours}
                  </li>
                </ul>

                <ul className="mt-6 space-y-2.5">
                  {b.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2 text-sm font-semibold text-brand-bright"
                    >
                      <Sparkle className="size-3.5" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3">
                  <Link
                    href={`/book?branch=${b.id}`}
                    className="rounded-full bg-brand px-6 py-3.5 text-center text-sm font-bold text-ink transition-all hover:bg-brand-bright"
                  >
                    Book at {b.shortName}
                  </Link>
                  <a
                    href={b.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/20 px-6 py-3.5 text-sm font-semibold text-cream transition-all hover:border-brand hover:text-brand-bright"
                  >
                    <Navigation className="size-4" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
