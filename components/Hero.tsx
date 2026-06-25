"use client";

import { motion, type Variants } from "framer-motion";
import { profile, stats } from "@/lib/data";
import { useBooted } from "./BootScreen";
import { NeuralCanvas } from "./NeuralCanvas";
import { RetroMonitor } from "./RetroMonitor";
import { Magnetic } from "./ui/Magnetic";

const ease = [0.16, 1, 0.3, 1] as const;

const up: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease, delay: 0.15 + i * 0.08 },
  }),
};

const taglineWords = profile.tagline.split(" ");

export function Hero() {
  // Boot screen flips this true on completion; the hero then "pans out" of the
  // monitor and staggers its content in.
  const booted = useBooted();
  const reveal = booted ? "show" : "hidden";

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-32"
    >
      {/* live neural constellation */}
      <NeuralCanvas className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />

      {/* the boot screen zooms into the monitor; the page fades up behind it */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={booted ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7, ease }}
        className="shell relative"
      >
        {/* status row */}
        <motion.div
          variants={up}
          initial="hidden"
          animate={reveal}
          custom={0}
          className="mb-10 flex flex-wrap items-center gap-3"
        >
          <span className="chip">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for work
          </span>
          <span className="chip">{profile.location}</span>
        </motion.div>

        {/* name + monitor */}
        <div className="grid grid-cols-1 items-center gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.h1
              variants={up}
              initial="hidden"
              animate={reveal}
              custom={1}
              className="display text-[clamp(2.6rem,8vw,7rem)]"
            >
              <span className="block text-foreground">{profile.firstName}</span>
              <span className="block">
                <span className="text-gradient">{profile.lastName}</span>
                <span className="text-primary">.</span>
              </span>
            </motion.h1>

            <motion.div
              variants={up}
              initial="hidden"
              animate={reveal}
              custom={2}
              className="mt-7 flex flex-col gap-4"
            >
              <div className="h-px w-16 bg-primary" />
              <p className="font-display text-2xl leading-tight text-foreground sm:text-3xl">
                Full-Stack <span className="text-muted">&amp;</span> AI Automation
                Engineer
              </p>
              <p className="max-w-md text-sm leading-relaxed text-muted">
                I help small businesses launch complete digital systems —
                frontend, backend, deployment, and AI automation, end to end.
              </p>
            </motion.div>
          </div>

          {/* retro monitor displaying the profile */}
          <div className="lg:col-span-5">
            <RetroMonitor />
          </div>
        </div>

        {/* animated tagline */}
        <div className="mt-14 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-display text-xl sm:text-2xl md:text-3xl">
          {taglineWords.map((word, i) => {
            const highlight = /AI\.?$/.test(word);
            return (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                animate={
                  booted
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 18, filter: "blur(8px)" }
                }
                transition={{ duration: 0.6, ease, delay: 0.4 + i * 0.06 }}
                className={highlight ? "text-gradient" : "text-foreground"}
              >
                {word}
              </motion.span>
            );
          })}
          <motion.span
            aria-hidden
            initial={{ opacity: 0 }}
            animate={booted ? { opacity: [0, 1, 0] } : { opacity: 0 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.4 + taglineWords.length * 0.06,
            }}
            className="inline-block h-6 w-[3px] translate-y-1 bg-accent sm:h-7 md:h-8"
          />
        </div>

        {/* CTAs + stats */}
        <motion.div
          variants={up}
          initial="hidden"
          animate={reveal}
          custom={6}
          className="mt-12 flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-background transition-shadow hover:shadow-[0_0_40px_-8px_rgb(var(--glow))]"
              >
                View the work
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                >
                  <path
                    d="M7 17 17 7M17 7H8M17 7v9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary/60 hover:bg-surface/60"
              >
                Start a project
              </a>
            </Magnetic>
            <a
              href="/resume"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-3.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              Resume
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M7 17 17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl text-foreground">
                  {s.value}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ delay: booted ? 1.2 : 0, duration: 1 }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Scroll
        </span>
        <div className="h-10 w-px overflow-hidden bg-border">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1/2 w-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}
