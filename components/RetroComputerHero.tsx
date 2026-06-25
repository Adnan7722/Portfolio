"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import { useBooted } from "./BootScreen";

/**
 * A CSS/SVG retro all-in-one computer (Commodore-PET inspired) whose phosphor
 * screen displays the owner's info. On boot completion the whole machine
 * "pans out" — scaling back from a screen-filling close-up to its resting size.
 */

const line: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.9 + i * 0.18, duration: 0.3 },
  }),
};

const screenLines = [
  { t: "adnan-os // whoami", dim: true },
  { t: profile.name, name: true },
  { t: "role : full-stack & ai automation engineer" },
  { t: "loc  : united states · remote" },
  { t: "stat : ● AVAILABLE_FOR_WORK", hot: true },
  { t: "sys  : 5M+ users · 40+ apis · +25–45%" },
];

export function RetroComputerHero() {
  const booted = useBooted();
  const [reduce, setReduce] = useState(false);
  // `intro` flips true once the boot pan-out finishes — then scroll takes over.
  const [intro, setIntro] = useState(false);

  useEffect(() => {
    const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduce(r);
    if (r) setIntro(true);
  }, []);

  // Scroll-linked zoom-out: the machine recedes as you scroll down the hero,
  // and zooms back in if you scroll up. Reversible, clamped.
  const { scrollY } = useScroll();
  const sScale = useTransform(scrollY, [0, 760], [1, 0.46], { clamp: true });
  const sOpacity = useTransform(scrollY, [0, 700], [1, 0], { clamp: true });
  const sY = useTransform(scrollY, [0, 760], [0, -90], { clamp: true });

  const zoomed = !reduce && !booted;
  const scrollDriven = intro && !reduce;

  return (
    <motion.div
      className="mx-auto w-full max-w-[660px]"
      style={
        scrollDriven
          ? { scale: sScale, opacity: sOpacity, y: sY, transformOrigin: "50% 42%" }
          : { transformOrigin: "50% 40%" }
      }
      initial={false}
      animate={scrollDriven ? undefined : { scale: zoomed ? 1.9 : 1, opacity: zoomed ? 0.4 : 1 }}
      transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={() => {
        if (booted && !reduce) setIntro(true);
      }}
    >
      {/* monitor case */}
      <div className="relative rounded-[26px] border border-black/25 bg-gradient-to-b from-[#d8c9a9] to-[#b5a47f] p-4 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85),inset_0_2px_0_rgba(255,255,255,0.45),inset_0_-3px_8px_rgba(0,0,0,0.25)] sm:p-5">
        {/* brand row */}
        <div className="mb-3 flex items-center justify-between px-1.5">
          <span className="font-pixel text-[8px] tracking-wider text-[#5d4d34]">
            ADNAN &#9656; PET-2026
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-[#5d4d34]">
            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_rgb(var(--accent))]" />
            pwr
          </span>
        </div>

        {/* screen bezel */}
        <div className="relative rounded-2xl bg-[#0c0f0b] p-3 shadow-[inset_0_0_40px_rgba(0,0,0,0.95)] sm:p-4">
          {/* screen */}
          <div className="crt-screen relative min-h-[240px] overflow-hidden rounded-lg bg-[#08140d] px-5 py-5 sm:min-h-[260px]">
            {/* curvature glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(130% 100% at 50% 0%, rgb(var(--accent) / 0.12), transparent 62%)",
              }}
            />
            <motion.div
              initial="hidden"
              animate={booted ? "show" : "hidden"}
              className="relative font-terminal text-[19px] leading-[1.5] text-accent [text-shadow:0_0_8px_rgb(var(--accent)/0.55)] sm:text-xl"
            >
              {screenLines.map((l, i) =>
                l.name ? (
                  <motion.h1
                    key={l.t}
                    custom={i}
                    variants={line}
                    className="text-[26px] font-normal leading-tight text-[#d7ffe6] [text-shadow:0_0_12px_rgb(var(--accent)/0.7)] sm:text-3xl"
                  >
                    &gt; {l.t}
                  </motion.h1>
                ) : (
                  <motion.div
                    key={l.t}
                    custom={i}
                    variants={line}
                    className={
                      l.dim
                        ? "text-accent/55"
                        : l.hot
                          ? "text-[#d7ffe6]"
                          : "text-accent"
                    }
                  >
                    {l.dim ? "" : "> "}
                    {l.t}
                  </motion.div>
                )
              )}
              <motion.span
                custom={screenLines.length}
                variants={line}
                className="mt-1 inline-block h-4 w-2.5 translate-y-0.5 bg-accent blink"
              />
            </motion.div>
          </div>
        </div>

        {/* vents + label */}
        <div className="mt-3.5 flex items-center justify-between px-1.5">
          <div className="flex gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="h-1 w-7 rounded-full bg-[#5d4d34]/40"
              />
            ))}
          </div>
          <span className="font-pixel text-[7px] tracking-wider text-[#5d4d34]">
            64K RAM
          </span>
        </div>
      </div>

      {/* keyboard wedge */}
      <div
        className="mx-auto mt-2.5 w-[94%] border border-black/25 bg-gradient-to-b from-[#cbbc99] to-[#a99876] p-3 shadow-[0_22px_45px_-26px_rgba(0,0,0,0.85)]"
        style={{ clipPath: "polygon(2.5% 0, 97.5% 0, 100% 100%, 0 100%)" }}
      >
        <div className="grid grid-cols-12 gap-1">
          {Array.from({ length: 36 }).map((_, i) => (
            <span
              key={i}
              className="h-3.5 rounded-[3px] bg-[#8c7b5a]/70 shadow-[inset_0_-2px_0_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.25)]"
            />
          ))}
          <span className="col-span-12 mt-1 h-3.5 rounded-[3px] bg-[#8c7b5a]/70 shadow-[inset_0_-2px_0_rgba(0,0,0,0.25)]" />
        </div>
      </div>
    </motion.div>
  );
}
