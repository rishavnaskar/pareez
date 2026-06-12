import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/services";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

export default function ServicesSection({ compact = false }: { compact?: boolean }) {
  const list = compact ? SERVICES.slice(0, 6) : SERVICES;

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8" id="services">
      <SectionHeading
        eyebrow="Our Services"
        title="Crafted rituals for"
        accent="every look"
        sub="From precision haircuts to bridal transformations — every service at Pareez is delivered by trained professionals using premium products."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.08}>
            <TiltCard className="group h-full">
              <Link
                href={`/services#${s.slug}`}
                className="flex h-full flex-col rounded-3xl glass-panel p-8 transition-colors duration-300 hover:border-brand/40"
              >
                <div className="mb-6 grid size-14 place-items-center rounded-2xl bg-brand/10 ring-1 ring-brand/30 transition-all duration-300 group-hover:bg-brand/20 group-hover:ring-glow">
                  <s.icon className="size-7 text-brand" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-cream">
                  {s.title}
                </h3>
                <p className="mt-3 grow text-sm leading-relaxed text-cream-dim">
                  {s.blurb}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand">
                  Explore
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
