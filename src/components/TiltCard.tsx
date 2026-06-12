"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 3D perspective tilt-on-hover card with a moving specular highlight —
 * the signature interaction across the site.
 */
export default function TiltCard({
  children,
  className,
  intensity = 10,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 180, damping: 22 });
  const sy = useSpring(my, { stiffness: 180, damping: 22 });

  const rotateX = useTransform(sy, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(sx, [0, 1], [-intensity, intensity]);
  const glowX = useTransform(sx, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(sy, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      className={cn("relative [transform-style:preserve-3d]", className)}
      style={{ rotateX, rotateY, perspective: 900 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ scale: { duration: 0.3 } }}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(420px circle at ${x} ${y}, rgba(255,138,61,0.14), transparent 65%)`,
          ),
        }}
      />
    </motion.div>
  );
}
