import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DEFAULT_WA_MESSAGE, waLink } from "@/lib/site";
import Reveal from "./Reveal";

export default function CtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-brand/25 bg-gradient-to-br from-brand-deep/30 via-ink-card to-ink px-8 py-16 text-center md:py-24">
          <div
            aria-hidden
            className="absolute -top-32 left-1/2 size-96 -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]"
          />
          <div
            aria-hidden
            className="absolute -right-20 -bottom-24 size-72 rounded-full bg-brand/10 blur-[100px] animate-float"
          />
          <p className="relative mb-4 text-xs font-bold tracking-[0.35em] text-brand uppercase">
            Your chair is waiting
          </p>
          <h2 className="relative mx-auto max-w-2xl font-display text-4xl leading-tight font-semibold text-cream md:text-6xl">
            Ready for your next <span className="text-shimmer italic">transformation?</span>
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-base text-cream-dim">
            Book in under a minute on WhatsApp, or reserve your slot with the
            online appointment form. Walk-ins welcome at both branches.
          </p>
          <div className="relative mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/book"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-base font-bold text-ink transition-all duration-300 hover:bg-brand-bright hover:shadow-[0_0_40px_-6px_var(--color-brand)]"
            >
              Book an Appointment
              <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={waLink(DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-8 py-4 text-base font-semibold text-cream transition-all duration-300 hover:border-brand hover:text-brand-bright"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
