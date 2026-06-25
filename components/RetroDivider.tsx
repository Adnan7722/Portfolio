"use client";

import { motion } from "framer-motion";

/**
 * An OS-style divider that chapters the journey between sections: a dashed
 * data-bus line with a terminal label and a scanning pulse that sweeps across
 * as it enters view.
 */
export function RetroDivider({ label }: { label: string }) {
  return (
    <div className="shell py-2">
      <div className="relative flex items-center gap-4 overflow-hidden">
        <span className="font-pixel text-[8px] uppercase tracking-wider text-muted">
          ◄
        </span>
        <div className="relative h-px flex-1 bg-[repeating-linear-gradient(90deg,rgb(var(--border))_0_8px,transparent_8px_16px)]">
          <motion.span
            initial={{ x: "-20%", opacity: 0 }}
            whileInView={{ x: "120%", opacity: [0, 1, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="absolute -top-px left-0 h-[3px] w-24 bg-gradient-to-r from-transparent via-accent to-transparent"
          />
        </div>
        <span className="whitespace-nowrap font-terminal text-base text-accent">
          {label}
        </span>
        <div className="hidden h-px flex-1 bg-[repeating-linear-gradient(90deg,rgb(var(--border))_0_8px,transparent_8px_16px)] sm:block" />
        <span className="font-pixel text-[8px] uppercase tracking-wider text-muted">
          ►
        </span>
      </div>
    </div>
  );
}
