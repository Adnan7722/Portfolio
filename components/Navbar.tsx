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
              className="rounded-full px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              Resume ↗
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
                className="block rounded-2xl px-4 py-3 font-mono text-sm uppercase tracking-[0.14em] text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                Resume ↗
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
