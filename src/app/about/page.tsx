import type { Metadata } from "next";
import { Gem, HeartHandshake, Leaf, Users } from "lucide-react";
import { SITE } from "@/lib/site";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import StatsSection from "@/components/StatsSection";
import CtaSection from "@/components/CtaSection";

export const metadata: Metadata = {
  title: "About Pareez — Kolkata's Premium Unisex Salon",
  description:
    "The story of Pareez Salon: from a single studio on Garfa Main Road to two premium unisex branches in South Kolkata. Our philosophy — luxury salon services made personal, where trends meet tradition.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    icon: Gem,
    title: "Premium, not pricey",
    desc: "International-grade products and techniques at honest neighbourhood prices.",
  },
  {
    icon: HeartHandshake,
    title: "Made personal",
    desc: "Every service starts with a consultation. Your face shape, your hair type, your story.",
  },
  {
    icon: Users,
    title: "Truly unisex",
    desc: "Men, women and kids — dedicated stylists and comfortable spaces for everyone.",
  },
  {
    icon: Leaf,
    title: "Hygiene first",
    desc: "Sanitised stations, single-use kits where it matters, and spotless studios.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-20">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(700px_circle_at_15%_10%,rgba(244,103,15,0.13),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <p className="mb-3 text-xs font-bold tracking-[0.35em] text-brand uppercase">
              Our Story
            </p>
            <h1 className="max-w-3xl font-display text-4xl leading-tight font-semibold text-cream md:text-6xl">
              {SITE.tagline.split(" ").slice(0, 2).join(" ")}{" "}
              <span className="text-gradient-brand italic">
                {SITE.tagline.split(" ").slice(2).join(" ")}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-cream-dim">
              <p>
                Pareez began with a simple belief: South Kolkata deserved a
                salon where world-class technique meets the warmth of a
                neighbourhood studio. From our flagship at Sunny Tower on Garfa
                Main Road, that belief grew into a community of{" "}
                {SITE.rating.count}+ five-star regulars — and a second home in
                Jadavpur.
              </p>
              <p>
                Today, our stylists and artists handle everything from a
                ten-minute trim to a full bridal transformation with the same
                obsession for detail. We train continuously on global trends —
                nanoplastia, balayage, HD makeup — and pair them with the
                traditions of Bengali beauty that never go out of style.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <StatsSection />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <SectionHeading
          eyebrow="What we stand for"
          title="The Pareez"
          accent="promise"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <TiltCard className="group h-full" intensity={7}>
                <div className="h-full rounded-3xl glass-panel p-8 transition-colors duration-300 hover:border-brand/35">
                  <div className="mb-5 grid size-13 place-items-center rounded-2xl bg-brand/10 ring-1 ring-brand/30">
                    <v.icon className="size-6 text-brand" />
                  </div>
                  <h2 className="text-lg font-bold text-cream">{v.title}</h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-cream-dim">{v.desc}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
