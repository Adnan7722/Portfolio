"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";

/**
 * A 2D retro CRT monitor that displays Muhammad's profile as a phosphor-green
 * terminal readout. Replaces the old WebGL computer — same retro spirit, far
 * lighter. The boot intro "pans out" of a screen like this one.
 */

const rows: { k: string; v: string }[] = [
  { k: "NAME", v: profile.name },
  { k: "ROLE", v: "Full-Stack & AI Engineer" },
  { k: "BASE", v: "United States / Remote" },
  { k: "STACK", v: "React·Next·Laravel·AI" },
  { k: "CERT", v: "Anthropic Certified" },
];

export function RetroMonitor() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="relative mx-auto w-full max-w-[440px]"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-accent/10 blur-3xl" />

      {/* monitor body */}
      <div className="crt-flicker rounded-[1.6rem] border border-border bg-gradient-to-b from-surface-2 to-surface p-3.5 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)]">
        {/* top bar */}
        <div className="mb-3 flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          </div>
          <span className="font-pixel text-[8px] uppercase tracking-wider text-muted">
            ADNAN-OS
          </span>
        </div>

        {/* screen */}
        <div
          id="hero-crt-screen"
          className="crt-screen relative overflow-hidden rounded-xl border border-border bg-[#06120b] p-5"
        >
          {/* inner curvature shadow */}
          <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_70px_rgba(0,0,0,0.65)]" />
          {/* sweeping scanline */}
          <motion.div
            aria-hidden
            initial={{ y: "-100%" }}
            animate={{ y: "120%" }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-transparent via-accent/10 to-transparent"
          />

          <div className="font-terminal relative text-[1.05rem] leading-relaxed text-accent [text-shadow:0_0_8px_rgb(var(--accent)/0.45)]">
            <div className="mb-2 flex items-center justify-between border-b border-accent/25 pb-1 text-[#c7ffe0]">
              <span>USER.PROFILE</span>
              <span className="text-accent/70">v2.0</span>
            </div>

            {rows.map((r) => (
              <div key={r.k} className="flex gap-2">
                <span className="w-14 shrink-0 text-accent/60">&gt; {r.k}</span>
                <span className="text-accent">{r.v}</span>
              </div>
            ))}

            <div className="mt-2 flex items-center gap-2 border-t border-accent/25 pt-2">
              <span className="w-14 shrink-0 text-accent/60">&gt; STAT</span>
              <span className="flex items-center gap-2 text-[#c7ffe0]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                AVAILABLE_FOR_WORK
                <span className="blink inline-block h-4 w-2 translate-y-0.5 bg-accent" />
              </span>
            </div>
          </div>
        </div>

        {/* controls */}
        <div className="mt-3 flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5">
            <span className="h-3.5 w-3.5 rounded-full border border-border bg-amber/30" />
            <span className="h-3.5 w-3.5 rounded-full border border-border bg-primary/30" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            <span className="font-pixel text-[7px] uppercase tracking-wider text-muted">
              PWR
            </span>
          </div>
        </div>
      </div>

      {/* stand */}
      <div className="mx-auto h-4 w-24 rounded-b-md border-x border-b border-border bg-surface-2" />
      <div className="mx-auto h-1.5 w-44 rounded-full border border-border bg-surface" />
    </motion.div>
  );
}
