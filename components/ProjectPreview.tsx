"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/data";

/**
 * Animated, code-drawn "screenshots" — no image assets needed. Each preview is
 * a stylised abstraction of the product, themed to the project's accent.
 */

const accentVar: Record<Project["accent"], string> = {
  primary: "var(--primary)",
  accent: "var(--accent)",
  amber: "var(--amber)",
};

export function ProjectPreview({ project }: { project: Project }) {
  const c = accentVar[project.accent];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-background">
      {/* retro window chrome */}
      <div className="flex items-center gap-1.5 border-b border-border bg-surface/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
        <span className="font-terminal ml-3 text-sm text-accent">
          C:\&gt; run {project.id}.exe
        </span>
      </div>

      <div className="crt-screen relative h-[calc(100%-2.6rem)] p-4">
        {project.preview === "erp" && <ErpPreview color={c} />}
        {project.preview === "extension" && <ExtensionPreview color={c} />}
        {project.preview === "ml" && <MlPreview color={c} />}
      </div>
    </div>
  );
}

/* ---------- ERP: dashboard with animated bars + 3D try-on cube ---------- */
function ErpPreview({ color }: { color: string }) {
  const bars = [40, 65, 50, 80, 60, 90];
  return (
    <div className="grid h-full grid-cols-3 gap-3">
      <div className="col-span-2 flex flex-col gap-3">
        <div className="flex gap-2">
          {["Sales", "Stock", "Orders"].map((t, i) => (
            <div
              key={t}
              className="flex-1 rounded-lg border border-border bg-surface/60 px-2 py-2"
            >
              <div className="font-mono text-[8px] uppercase tracking-wide text-muted">
                {t}
              </div>
              <div
                className="mt-1 font-display text-sm"
                style={{ color: i === 0 ? `rgb(${color})` : undefined }}
              >
                {["$84k", "1.2k", "320"][i]}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-2 rounded-lg border border-border bg-surface/40 p-3">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: "easeOut" }}
              className="flex-1 rounded-sm"
              style={{
                background: `linear-gradient(to top, rgb(${color}), rgb(${color} / 0.3))`,
              }}
            />
          ))}
        </div>
      </div>
      {/* rotating 3D try-on cube */}
      <div className="flex items-center justify-center rounded-lg border border-border bg-surface/40">
        <div className="[perspective:600px]">
          <motion.div
            animate={{ rotateY: 360, rotateX: [0, 12, 0] }}
            transition={{
              rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
              rotateX: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="h-12 w-12 rounded-md border-2 [transform-style:preserve-3d]"
            style={{ borderColor: `rgb(${color})`, color: `rgb(${color})` }}
          >
            <div
              className="absolute inset-0 rounded-md opacity-40"
              style={{ background: `rgb(${color} / 0.25)` }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Extension: Gmail row → arrow → Monday item ---------- */
function ExtensionPreview({ color }: { color: string }) {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-surface/60 px-3 py-2">
            <span className="h-5 w-5 rounded-full bg-border" />
            <div className="flex-1">
              <div className="h-1.5 w-2/3 rounded bg-muted/50" />
              <div className="mt-1 h-1.5 w-1/3 rounded bg-border" />
            </div>
          </div>
          <motion.div
            animate={{ x: [0, 5, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3 }}
            style={{ color: `rgb(${color})` }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14m0 0-5-5m5 5-5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
          <div
            className="h-9 w-9 shrink-0 rounded-lg border"
            style={{
              borderColor: `rgb(${color} / 0.5)`,
              background: `rgb(${color} / 0.15)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* ---------- ML: animated risk gauge + scatter ---------- */
function MlPreview({ color }: { color: string }) {
  return (
    <div className="grid h-full grid-cols-2 gap-3">
      <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-surface/40 p-3">
        <svg viewBox="0 0 100 60" className="w-full">
          <path
            d="M10 55 A40 40 0 0 1 90 55"
            fill="none"
            stroke="rgb(var(--border))"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <motion.path
            d="M10 55 A40 40 0 0 1 90 55"
            fill="none"
            stroke={`rgb(${color})`}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="126"
            initial={{ strokeDashoffset: 126 }}
            whileInView={{ strokeDashoffset: 44 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <div className="-mt-2 font-display text-lg" style={{ color: `rgb(${color})` }}>
          64%
        </div>
        <div className="font-mono text-[8px] uppercase tracking-wide text-muted">
          Risk score
        </div>
      </div>
      <div className="relative rounded-lg border border-border bg-surface/40">
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.05 }}
            className="absolute h-1.5 w-1.5 rounded-full"
            style={{
              left: `${15 + (i * 37) % 70}%`,
              top: `${20 + (i * 53) % 65}%`,
              background: i % 3 === 0 ? `rgb(${color})` : "rgb(var(--muted) / 0.6)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
