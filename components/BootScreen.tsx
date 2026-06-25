"use client";

import { AnimatePresence, motion, type TargetAndTransition } from "framer-motion";
import { createContext, useContext, useEffect, useRef, useState } from "react";

/**
 * Retro boot sequence shown on every (re)load — a phosphor terminal with a
 * blocky loading bar that fills to 100%, then "pans out" of the hero's CRT.
 * `useBooted()` lets the hero reveal itself the moment boot completes.
 *
 * Progress is driven by a wall-clock setInterval (not requestAnimationFrame,
 * which mobile browsers throttle/pause during initial load — that caused the
 * loader to get stuck at 0% on phones) plus a hard fallback that guarantees
 * completion even if timers are throttled.
 */
const BootCtx = createContext(false);
export const useBooted = () => useContext(BootCtx);

const STEPS = [
  { at: 0.08, text: "> booting adnan-os ........... ok" },
  { at: 0.3, text: "> mounting filesystem ........ ok" },
  { at: 0.52, text: "> loading portfolio.pkg ...... ok" },
  { at: 0.74, text: "> starting interface ......... ok" },
  { at: 0.95, text: "> system ready_" },
];

const SEGMENTS = 28;
const DURATION = 2400;

export function BootProvider({ children }: { children: React.ReactNode }) {
  const [booted, setBooted] = useState(false);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [exitTo, setExitTo] = useState<TargetAndTransition | null>(null);
  const skipRef = useRef(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    // Skip boot on mobile, reduced-motion, or when the page is loading in a
    // background tab (timers get throttled to ≥1 s — the bar would stall at 0%).
    if (isMobile || reduce || document.hidden) {
      setProgress(1);
      setBooted(true);
      setDone(true);
      return;
    }

    // DESKTOP foreground: Show boot animation
    document.body.style.overflow = "hidden";
    const startTs = Date.now();

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;

      // Synchronously read the monitor position — it's always in the DOM
      // (opacity-0, but has full layout), so we don't need to wait for it.
      const el = document.getElementById("hero-crt-screen");
      if (el && window.innerWidth > 0 && window.innerHeight > 0) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          setExitTo({
            x: r.left,
            y: r.top,
            scaleX: r.width / window.innerWidth,
            scaleY: r.height / window.innerHeight,
            opacity: 0,
            transition: { duration: 0.85, ease: [0.7, 0, 0.3, 1] },
          });
        }
      }

      // Commit all state in one batch — no nested callbacks that can race or
      // stale-close over an unmounted component after HMR / hot reloads.
      setProgress(1);
      setBooted(true);
      setDone(true);
      document.body.style.overflow = "";
    };

    const id = setInterval(() => {
      const elapsed = skipRef.current ? DURATION : Date.now() - startTs;
      const p = Math.min(1, elapsed / DURATION);
      setProgress(p);
      if (p >= 1) {
        clearInterval(id);
        finish();
      }
    }, 40);

    // Hard fallback: if timers get throttled mid-animation, force-complete.
    const fallback = setTimeout(() => {
      clearInterval(id);
      finish();
    }, DURATION + 500);

    // If the tab is hidden mid-animation (user switches away), force-complete
    // immediately when they come back — don't make them watch a stalled bar.
    const onVisibilityChange = () => {
      if (!document.hidden && !doneRef.current) {
        clearInterval(id);
        clearTimeout(fallback);
        finish();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const skip = () => { skipRef.current = true; };
    addEventListener("pointerdown", skip);
    addEventListener("keydown", skip);

    return () => {
      clearInterval(id);
      clearTimeout(fallback);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.body.style.overflow = "";
      removeEventListener("pointerdown", skip);
      removeEventListener("keydown", skip);
    };
  }, []);

  const filled = Math.round(progress * SEGMENTS);
  const pct = Math.round(progress * 100);
  const complete = progress >= 1;

  const defaultExit: TargetAndTransition = {
    opacity: 0,
    filter: "brightness(2.2)",
    transition: { duration: 0.55, ease: "easeInOut" },
  };

  return (
    <BootCtx.Provider value={booted}>
      {children}
      <AnimatePresence>
        {!done && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={exitTo ?? defaultExit}
            style={{ transformOrigin: "0 0", willChange: "transform, opacity" }}
            className="crt-screen fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[rgb(6_8_6)] px-6"
          >
            {/* vignette */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 120% at 50% 50%, transparent 45%, rgb(0 0 0 / 0.7) 100%)",
              }}
            />

            <div className="relative w-full max-w-md">
              <div className="mb-6 flex items-end justify-between">
                <span className="font-pixel text-[11px] leading-none text-accent [text-shadow:0_0_10px_rgb(var(--accent)/0.6)]">
                  ADNAN-OS
                </span>
                <span className="font-terminal text-lg text-accent/70">v2.0</span>
              </div>

              {/* boot log */}
              <div className="mb-6 min-h-[120px] font-terminal text-lg leading-relaxed text-accent [text-shadow:0_0_8px_rgb(var(--accent)/0.5)]">
                {STEPS.filter((s) => progress >= s.at).map((s) => (
                  <div key={s.text}>{s.text}</div>
                ))}
              </div>

              {/* blocky loading bar */}
              <div className="flex items-center gap-1">
                {Array.from({ length: SEGMENTS }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-3.5 flex-1 ${i < filled ? "bg-accent" : "bg-accent/12"}`}
                    style={
                      i < filled
                        ? { boxShadow: "0 0 8px rgb(var(--accent) / 0.6)" }
                        : undefined
                    }
                  />
                ))}
              </div>
              <div className="mt-3 flex justify-between font-terminal text-base text-accent/80">
                <span>{complete ? "SYSTEM READY ▸" : "LOADING…"}</span>
                <span>{pct}%</span>
              </div>

              <div className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-accent/30">
                press any key to skip
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </BootCtx.Provider>
  );
}
