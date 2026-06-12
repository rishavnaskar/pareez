import Link from "next/link";
import { Clock, Instagram, Facebook, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { BRANCHES, SITE, waLink, DEFAULT_WA_MESSAGE } from "@/lib/site";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/locations", label: "Locations" },
  { href: "/about", label: "About Us" },
  { href: "/book", label: "Book Appointment" },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-cream/10 bg-ink-soft">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent"
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo />
          <p className="mt-5 text-sm leading-relaxed text-cream-dim">
            {SITE.tagline}. Kolkata&apos;s premium unisex salon — luxury hair,
            skin, bridal and grooming services made personal, since{" "}
            {SITE.foundingYear}.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={SITE.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pareez on Instagram"
              className="grid size-10 place-items-center rounded-full border border-cream/15 text-cream/80 transition-all hover:border-brand hover:text-brand"
            >
              <Instagram className="size-4.5" />
            </a>
            <a
              href={SITE.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pareez on Facebook"
              className="grid size-10 place-items-center rounded-full border border-cream/15 text-cream/80 transition-all hover:border-brand hover:text-brand"
            >
              <Facebook className="size-4.5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-xs font-bold tracking-[0.3em] text-brand uppercase">
            Explore
          </h3>
          <ul className="space-y-3">
            {NAV.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-cream-dim transition-colors hover:text-brand-bright"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {BRANCHES.map((b) => (
          <div key={b.id}>
            <h3 className="mb-5 text-xs font-bold tracking-[0.3em] text-brand uppercase">
              {b.shortName}
            </h3>
            <ul className="space-y-3 text-sm text-cream-dim">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
                <a
                  href={b.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand-bright"
                >
                  {b.addressLine1}, {b.addressLine2}, {b.locality} {b.postalCode}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand" />
                <a href={b.phoneHref} className="transition-colors hover:text-brand-bright">
                  {b.phone}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-brand" />
                <span>{b.hours}</span>
              </li>
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-cream/10 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-xs text-cream-dim/70 sm:flex-row lg:px-8">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}, Kolkata. All rights reserved.
          </p>
          <a
            href={waLink(DEFAULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand transition-colors hover:text-brand-bright"
          >
            Book on WhatsApp →
          </a>
        </div>
      </div>
    </footer>
  );
}
