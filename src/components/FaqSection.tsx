"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { HOME_FAQS } from "@/lib/jsonld";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
      <SectionHeading
        eyebrow="Good to know"
        title="Frequently asked"
        accent="questions"
      />

      <div className="space-y-4">
        {HOME_FAQS.map((f, i) => {
          const open = openIdx === i;
          return (
            <Reveal key={f.q} delay={i * 0.05}>
              <div
                className={cn(
                  "overflow-hidden rounded-2xl glass-panel transition-colors duration-300",
                  open && "border-brand/35",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-semibold text-cream">{f.q}</span>
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-brand/12 text-brand"
                  >
                    <Plus className="size-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-cream-dim">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
