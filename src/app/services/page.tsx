import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/services";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CtaSection from "@/components/CtaSection";

export const metadata: Metadata = {
  title: "Salon Services — Hair, Skin, Bridal, Nails",
  description:
    "Explore Pareez Salon's full service menu in Kolkata: haircuts and styling, hair colour & balayage, keratin, nanoplastia, hair botox, bridal & party makeup, facials, manicure, pedicure and nail art. Garfa & Jadavpur branches.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-10">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(700px_circle_at_80%_0%,rgba(244,103,15,0.13),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="Service Menu"
            title="Everything your look needs,"
            accent="under one roof"
            sub="Unisex services across hair, skin, makeup, nails and grooming — delivered with premium professional product lines at honest Kolkata prices."
          />
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-10 px-6 pb-24 lg:px-8">
        {SERVICES.map((s, i) => (
          <Reveal key={s.slug}>
            <article
              id={s.slug}
              className="grid scroll-mt-28 gap-8 rounded-[2rem] glass-panel p-8 transition-colors duration-300 hover:border-brand/30 md:grid-cols-[1fr_1.4fr] md:p-12"
            >
              <div>
                <div className="mb-6 grid size-16 place-items-center rounded-2xl bg-brand/10 ring-1 ring-brand/30">
                  <s.icon className="size-8 text-brand" />
                </div>
                <p className="mb-2 text-xs font-bold tracking-[0.3em] text-brand uppercase">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="font-display text-3xl font-semibold text-cream md:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-cream-dim">
                  {s.description}
                </p>
                <Link
                  href="/book"
                  className="group mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand transition-colors hover:text-brand-bright"
                >
                  Book this service
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <ul className="grid content-start gap-3 sm:grid-cols-2">
                {s.items.map((item) => (
                  <li
                    key={item.name}
                    className="rounded-xl border border-cream/10 bg-ink-soft px-5 py-4"
                  >
                    <span className="text-sm font-semibold text-cream/90">{item.name}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}

        <p className="text-center text-xs text-cream-dim">
          Every service begins with a personal consultation — message us on
          WhatsApp to discuss what&apos;s right for you and to check current offers.
        </p>
      </div>

      <CtaSection />
    </>
  );
}
