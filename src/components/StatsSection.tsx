"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SITE } from "@/lib/site";

const STATS = [
  { value: SITE.rating.value, suffix: "★", label: "Google rating", decimals: 1 },
  { value: SITE.rating.count, suffix: "+", label: "Happy reviews", decimals: 0 },
  { value: 2, suffix: "", label: "Branches in Kolkata", decimals: 0 },
  { value: new Date().getFullYear() - SITE.foundingYear, suffix: "+", label: "Years of artistry", decimals: 0 },
];

function Counter({
  value,
  suffix,
  decimals,
}: {
  value: number;
  suffix: string;
  decimals: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setDisplay(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      <span className="text-brand">{suffix}</span>
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="border-y border-cream/10 bg-ink-soft">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px lg:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="px-6 py-12 text-center"
          >
            <p className="font-display text-4xl font-bold text-cream md:text-5xl">
              <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
            </p>
            <p className="mt-2 text-xs font-semibold tracking-[0.2em] text-cream-dim uppercase">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
