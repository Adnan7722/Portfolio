"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { chapters } from "@/lib/data";

/**
 * The journey indicator: a scroll-progress bar pinned to the very top, plus a
 * retro chapter readout that updates as each section comes into view — so the
 * scroll reads like a guided story from intro to contact.
 */
export function ScrollHUD() {
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const marker = window.scrollY + window.innerHeight * 0.35;
      let idx = 0;
      chapters.forEach((c, i) => {
        const el = document.getElementById(c.id);
        if (el && el.offsetTop <= marker) idx = i;
      });
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const chapter = chapters[active];

  return (
    <>
      {/* progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-primary via-amber to-accent"
      />

      {/* chapter readout */}
      <div className="pointer-events-none fixed bottom-4 left-4 z-40 hidden items-center gap-2.5 rounded-full border border-border bg-surface/70 px-3.5 py-2 backdrop-blur-md sm:flex">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <span className="font-mono text-[10px] tracking-[0.18em] text-primary">
          {chapter.index}
          <span className="text-muted">/0{chapters.length}</span>
        </span>
        <span className="font-pixel text-[8px] uppercase tracking-wider text-foreground">
          {chapter.label}
        </span>
      </div>
    </>
  );
}
