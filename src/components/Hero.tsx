"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { SITE } from "@/lib/site";
import HeroLogoArt from "./HeroLogoArt";

// Three.js scene loads after hydration so first paint & SEO stay instant.
const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.15 * i, ease: [0.21, 0.6, 0.35, 1] as const },
  }),
};

export default function Hero() {
  const { scrollY } = useScroll();
  const yCopy = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden">
      {/* layered glow backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(900px_circle_at_70%_30%,rgba(244,103,15,0.16),transparent_60%),radial-gradient(700px_circle_at_15%_80%,rgba(244,103,15,0.08),transparent_55%)]"
      />
      <Hero3D />
      <HeroLogoArt />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent"
      />

      <motion.div
        style={{ y: yCopy, opacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 pb-20 lg:px-8"
      >
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-6 inline-flex items-center gap-2 rounded-full glass-panel px-4 py-2"
        >
          <Star className="size-4 fill-brand text-brand" />
          <span className="text-xs font-semibold tracking-wide text-cream/90">
            {SITE.rating.value}★ rated · {SITE.rating.count}+ Google reviews
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="max-w-4xl font-display text-5xl leading-[1.05] font-semibold text-cream sm:text-7xl lg:text-8xl"
        >
          Where <span className="text-gradient-brand italic">Trends</span>
          <br />
          Meet Tradition
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-7 max-w-xl text-lg leading-relaxed text-cream-dim"
        >
          Kolkata&apos;s premium unisex salon for hair, skin, bridal &amp;
          self-care. Luxury salon services made personal — now at two branches,{" "}
          <strong className="font-semibold text-cream">Garfa</strong> and{" "}
          <strong className="font-semibold text-cream">Jadavpur</strong>.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/book"
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-base font-bold text-ink transition-all duration-300 hover:bg-brand-bright hover:shadow-[0_0_40px_-6px_var(--color-brand)]"
          >
            Book an Appointment
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/locations"
            className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-8 py-4 text-base font-semibold text-cream transition-all duration-300 hover:border-brand hover:text-brand-bright"
          >
            <MapPin className="size-5" />
            Find a Branch
          </Link>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-12 w-7 items-start justify-center rounded-full border border-cream/25 p-1.5">
          <motion.div
            className="size-1.5 rounded-full bg-brand"
            animate={{ y: [0, 18, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
