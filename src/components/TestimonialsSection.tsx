import { Quote, Star } from "lucide-react";
import { BRANCHES, SITE } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

/**
 * TODO: Replace these with your favourite real Google reviews
 * (copy text + first name from your Google Business profile).
 */
const TESTIMONIALS = [
  {
    name: "Priyanka S.",
    service: "Keratin Treatment",
    text: "My frizzy hair turned glass-smooth after the keratin ritual. The stylists explain everything before they start — truly premium experience at local prices.",
  },
  {
    name: "Arjun M.",
    service: "Haircut & Beard Styling",
    text: "Best men's grooming in the Garfa–Jadavpur belt. Consistent quality every single visit, and the new branch interior is gorgeous.",
  },
  {
    name: "Sreya D.",
    service: "Bridal Makeup",
    text: "Pareez did my wedding and reception looks. The HD makeup lasted the entire night and photographed beautifully. My whole family booked with them after.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(800px_circle_at_50%_0%,rgba(244,103,15,0.09),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Client Love"
          title="Rated"
          accent={`${SITE.rating.value}★ by ${SITE.rating.count}+ clients`}
          sub="Real words from the people who trust us with their look — on Google, Instagram and Facebook."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <TiltCard className="group h-full" intensity={6}>
                <blockquote className="flex h-full flex-col rounded-3xl glass-panel p-8">
                  <Quote className="mb-5 size-8 text-brand/60" />
                  <p className="grow text-sm leading-relaxed text-cream/90">
                    “{t.text}”
                  </p>
                  <footer className="mt-6 flex items-center justify-between border-t border-cream/10 pt-5">
                    <div>
                      <p className="text-sm font-bold text-cream">{t.name}</p>
                      <p className="text-xs text-cream-dim">{t.service}</p>
                    </div>
                    <div className="flex gap-0.5" aria-label="5 star rating">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className="size-3.5 fill-brand text-brand" />
                      ))}
                    </div>
                  </footer>
                </blockquote>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <a
            href={BRANCHES[0].mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-brand transition-colors hover:text-brand-bright"
          >
            Read all {SITE.rating.count}+ reviews on Google →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
