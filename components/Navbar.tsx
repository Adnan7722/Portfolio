"use client";

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { nav, profile } from "@/lib/data";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240 && !open);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -90 : 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav className="shell mt-4">
        <div className="flex items-center justify-between rounded-full border border-border bg-surface/70 px-4 py-2.5 backdrop-blur-xl">
          {/* monogram */}
          <a href="#top" className="group flex items-center gap-2.5 pl-1">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-display text-sm font-bold text-background">
              MA
            </span>
            <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-foreground sm:block">
              {profile.firstName}
              <span className="text-primary">.</span>
            </span>
          </a>

          {/* desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/resume"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-accent transition-all hover:border-accent hover:bg-accent/10"
            >
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none" className="shrink-0">
                <rect x="1" y="1" width="12" height="12" rx="1.2" stroke="currentColor" strokeWidth="1.2"/>
                <rect x="3" y="1" width="6" height="4.5" fill="currentColor" opacity="0.3" rx="0.4"/>
                <rect x="9.5" y="1.5" width="1.2" height="3" rx="0.3" fill="currentColor"/>
                <rect x="3.5" y="7.5" width="7" height="4.5" rx="0.5" stroke="currentColor" strokeWidth="1"/>
                <rect x="5.5" y="7.5" width="2" height="4.5" fill="currentColor" opacity="0.25"/>
              </svg>
              Resume
            </a>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#contact"
              className="hidden rounded-full bg-foreground px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-background transition-transform hover:scale-[1.03] sm:block"
            >
              Let&apos;s talk
            </a>
            {/* mobile menu button */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface/60 text-foreground md:hidden"
            >
              <div className="flex flex-col gap-[5px]">
                <span
                  className={`h-[1.5px] w-4 bg-current transition-transform ${open ? "translate-y-[6.5px] rotate-45" : ""}`}
                />
                <span className={`h-[1.5px] w-4 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
                <span
                  className={`h-[1.5px] w-4 bg-current transition-transform ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* mobile dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 overflow-hidden rounded-3xl border border-border bg-surface/90 p-3 backdrop-blur-xl md:hidden"
            >
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 font-mono text-sm uppercase tracking-[0.14em] text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/resume"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-2xl border border-accent/30 px-4 py-3 font-mono text-sm uppercase tracking-[0.14em] text-accent transition-all hover:border-accent hover:bg-accent/10"
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="shrink-0">
                  <rect x="1" y="1" width="12" height="12" rx="1.2" stroke="currentColor" strokeWidth="1.2"/>
                  <rect x="3" y="1" width="6" height="4.5" fill="currentColor" opacity="0.3" rx="0.4"/>
                  <rect x="9.5" y="1.5" width="1.2" height="3" rx="0.3" fill="currentColor"/>
                  <rect x="3.5" y="7.5" width="7" height="4.5" rx="0.5" stroke="currentColor" strokeWidth="1"/>
                  <rect x="5.5" y="7.5" width="2" height="4.5" fill="currentColor" opacity="0.25"/>
                </svg>
                Resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
