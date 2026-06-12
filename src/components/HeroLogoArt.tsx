"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Motion illustration of the Pareez logo mark: a woman's profile drawn in
 * light, with hair flowing into orange swirls, wrapped by the brand's
 * brush-stroke ring. Hair strands shimmer with travelling light; the whole
 * mark floats and parallaxes with the pointer.
 */

// hair: strands rise from the hairline, sweep over the crown and cascade
// down the back of the head, ending in soft curls
const HAIR = [
  { d: "M 318 150 C 350 95, 430 95, 462 165 C 488 222, 478 300, 448 350 C 432 380, 420 420, 432 470", w: 5, dur: 7 },
  { d: "M 312 158 C 345 115, 415 112, 442 172 C 465 222, 455 285, 430 330 C 415 358, 408 395, 418 440", w: 3.5, dur: 8.5 },
  { d: "M 308 166 C 338 132, 395 130, 420 178 C 440 218, 432 268, 412 305", w: 2.5, dur: 6 },
  { d: "M 322 146 C 365 80, 460 85, 492 175 C 515 245, 500 340, 460 405 C 440 437, 437 470, 450 505", w: 3, dur: 9.5 },
  { d: "M 310 162 C 340 142, 380 150, 398 185 C 412 213, 406 248, 388 268", w: 2, dur: 7.5 },
  { d: "M 432 470 C 445 495, 432 515, 412 510 C 396 506, 393 488, 406 480", w: 2.5, dur: 5 },
  { d: "M 450 505 C 468 520, 462 545, 440 543 C 424 541, 420 524, 432 517", w: 2, dur: 5.5 },
  { d: "M 316 148 C 332 176, 332 206, 318 230", w: 2, dur: 6.5 },
];

export default function HeroLogoArt() {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-9, 9]);
  const rotateX = useTransform(sy, [0, 1], [7, -7]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <motion.div
      aria-hidden
      style={{ rotateX, rotateY, perspective: 1200 }}
      className="pointer-events-none absolute top-1/2 right-[-12%] w-[92vw] max-w-175 -translate-y-1/2 opacity-30 sm:opacity-60 lg:right-8 lg:w-[44vw] lg:opacity-100"
    >
      <motion.svg
        viewBox="0 0 600 600"
        fill="none"
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="h-auto w-full drop-shadow-[0_0_60px_rgba(244,103,15,0.25)]"
      >
        <defs>
          <linearGradient id="hairGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffb07a" />
            <stop offset="0.5" stopColor="#f4670f" />
            <stop offset="1" stopColor="#c84b00" />
          </linearGradient>
          <linearGradient id="faceGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#ffd9b8" />
          </linearGradient>
          <linearGradient id="ringGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#c84b00" />
            <stop offset="0.55" stopColor="#f4670f" />
            <stop offset="1" stopColor="#ffb07a" />
          </linearGradient>
          <radialGradient id="haloGrad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#f4670f" stopOpacity="0.22" />
            <stop offset="0.7" stopColor="#f4670f" stopOpacity="0.06" />
            <stop offset="1" stopColor="#f4670f" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* warm halo behind the mark */}
        <circle cx="320" cy="290" r="240" fill="url(#haloGrad)" />

        {/* brush-stroke ring, slowly orbiting — like the logo's swirl circle */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          style={{ transformBox: "view-box", transformOrigin: "50% 50%" }}
        >
          <path
            d="M 78 392 A 250 250 0 1 1 430 528"
            stroke="url(#ringGrad)"
            strokeWidth="17"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M 116 430 A 232 232 0 0 1 92 230"
            stroke="url(#ringGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.45"
          />
        </motion.g>

        {/* soft glow copy of the hair underneath */}
        <g style={{ filter: "blur(10px)" }} opacity="0.5">
          {HAIR.map((s) => (
            <path key={s.d} d={s.d} stroke="url(#hairGrad)" strokeWidth={s.w + 2} strokeLinecap="round" />
          ))}
        </g>

        {/* flowing hair — light travels along each strand forever */}
        {HAIR.map((s, i) => (
          <g key={s.d}>
            <path
              d={s.d}
              stroke="url(#hairGrad)"
              strokeWidth={s.w}
              strokeLinecap="round"
              opacity="0.35"
            />
            <motion.path
              d={s.d}
              pathLength={1}
              stroke="url(#hairGrad)"
              strokeWidth={s.w}
              strokeLinecap="round"
              strokeDasharray="0.45 0.55"
              animate={{ strokeDashoffset: [0, -1] }}
              transition={{
                duration: s.dur,
                delay: i * 0.4,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </g>
        ))}

        {/* the face profile, drawn in once like a stroke of light */}
        <motion.path
          d="M 320 146
             C 302 158, 292 180, 293 204
             C 293 220, 290 230, 282 240
             C 276 247, 271 254, 268 262
             C 266 268, 263 274, 262 279
             C 261.5 282, 266 283.5, 269 285
             C 272 287, 272 290, 269 292
             C 268 295, 270 297, 273 298
             C 278 299.5, 282 301, 283 305
             C 283 308, 279 310, 278 312
             C 284 314, 288 319, 287 326
             C 286 330, 285 333, 286 337
             C 288 346, 294 353, 303 357
             C 316 362, 328 364, 336 369
             C 341 386, 340 412, 335 440"
          pathLength={1}
          stroke="url(#faceGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1 1"
          initial={{ strokeDashoffset: 1, opacity: 0 }}
          animate={{ strokeDashoffset: 0, opacity: 1 }}
          transition={{ duration: 2.2, delay: 0.4, ease: "easeInOut" }}
        />
        {/* closed eye + brow hints */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ delay: 2.2, duration: 1 }}
          stroke="url(#faceGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M 290 246 C 298 241, 308 241, 315 245" />
          <path d="M 292 260 C 298 264, 306 264, 313 261" />
        </motion.g>

        {/* twinkling sparkles */}
        {[
          { x: 150, y: 180, r: 2.5, d: 0 },
          { x: 500, y: 330, r: 3, d: 1.1 },
          { x: 230, y: 480, r: 2, d: 0.6 },
          { x: 470, y: 130, r: 2, d: 1.7 },
          { x: 110, y: 320, r: 1.8, d: 2.3 },
        ].map((p) => (
          <motion.circle
            key={`${p.x}-${p.y}`}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill="#ffb07a"
            animate={{ opacity: [0.1, 0.9, 0.1], scale: [0.7, 1.25, 0.7] }}
            transition={{ duration: 3.2, delay: p.d, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}
      </motion.svg>
    </motion.div>
  );
}
