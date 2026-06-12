"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import Logo from "./Logo";
import { cn } from "@/lib/utils";
import { BRANCHES } from "@/lib/site";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/locations", label: "Locations" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass-panel py-3 shadow-2xl shadow-black/40" : "bg-transparent py-5",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />

        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={cn(
                  "relative text-sm font-semibold tracking-wide transition-colors hover:text-brand-bright",
                  pathname === l.href ? "text-brand" : "text-cream/80",
                )}
              >
                {l.label}
                {pathname === l.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-brand"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={BRANCHES[0].phoneHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cream/80 transition-colors hover:text-brand-bright"
          >
            <Phone className="size-4 text-brand" />
            {BRANCHES[0].phone}
          </a>
          <Link
            href="/book"
            className="rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-ink transition-all duration-300 hover:bg-brand-bright hover:shadow-[0_0_28px_-4px_var(--color-brand)]"
          >
            Book Appointment
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-lg p-2 text-cream lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-panel overflow-hidden lg:hidden"
          >
            <ul className="space-y-1 px-6 py-5">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-base font-semibold",
                      pathname === l.href ? "bg-brand/10 text-brand" : "text-cream/85",
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <Link
                  href="/book"
                  className="block rounded-full bg-brand px-6 py-3 text-center text-sm font-bold text-ink"
                >
                  Book Appointment
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
