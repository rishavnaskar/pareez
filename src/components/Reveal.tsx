"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  /** slide-in direction */
  from?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  once?: boolean;
};

export default function Reveal({
  children,
  delay = 0,
  from = "up",
  className,
  once = true,
}: Props) {
  const reduce = useReducedMotion();
  const offset = 36;
  const initial = reduce
    ? { opacity: 0 }
    : {
        opacity: 0,
        x: from === "left" ? -offset : from === "right" ? offset : 0,
        y: from === "up" ? offset : from === "down" ? -offset : 0,
      };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.6, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}
