import type { Metadata } from "next";
import { Suspense } from "react";
import { Phone, MessageCircle, Footprints } from "lucide-react";
import BookingForm from "@/components/BookingForm";
import Reveal from "@/components/Reveal";
import { BRANCHES, DEFAULT_WA_MESSAGE, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book an Appointment Online",
  description:
    "Book your salon appointment at Pareez Kolkata in under a minute — choose your branch (Garfa or Jadavpur), service, date and time. Instant confirmation on WhatsApp, or call us directly.",
  alternates: { canonical: "/book" },
};

const OTHER_WAYS = [
  {
    icon: MessageCircle,
    title: "WhatsApp us",
    desc: "Fastest — DM us anytime and we'll confirm your slot.",
    href: waLink(DEFAULT_WA_MESSAGE),
    cta: "Open WhatsApp",
  },
  {
    icon: Phone,
    title: "Call the salon",
    desc: `Both branches: ${BRANCHES[0].phone}`,
    href: BRANCHES[0].phoneHref,
    cta: "Call now",
  },
  {
    icon: Footprints,
    title: "Walk in",
    desc: "Both branches welcome walk-ins every day from 10 AM.",
    href: "/locations",
    cta: "See locations",
  },
];

export default function BookPage() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(800px_circle_at_20%_0%,rgba(244,103,15,0.12),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="mb-3 text-center text-xs font-bold tracking-[0.35em] text-brand uppercase">
            Reserve your chair
          </p>
          <h1 className="mx-auto max-w-2xl text-center font-display text-4xl leading-tight font-semibold text-cream md:text-6xl">
            Book your <span className="text-gradient-brand italic">appointment</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-center text-base text-cream-dim">
            Pick a branch, service and time — your request goes straight to our
            team on WhatsApp and we confirm within minutes.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <Suspense fallback={<div className="h-150 rounded-[2rem] glass-panel" />}>
            <BookingForm />
          </Suspense>

          <div className="space-y-5">
            {OTHER_WAYS.map((w, i) => (
              <Reveal key={w.title} delay={0.1 + i * 0.1} from="right">
                <a
                  href={w.href}
                  target={w.href.startsWith("http") ? "_blank" : undefined}
                  rel={w.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-start gap-5 rounded-3xl glass-panel p-7 transition-colors duration-300 hover:border-brand/40"
                >
                  <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand/10 ring-1 ring-brand/30">
                    <w.icon className="size-6 text-brand" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-cream">{w.title}</h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-cream-dim">{w.desc}</p>
                    <span className="mt-3 inline-block text-sm font-bold text-brand transition-colors group-hover:text-brand-bright">
                      {w.cta} →
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
