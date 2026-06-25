"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { projects, type Project } from "@/lib/data";
import { ProjectModal } from "./ProjectModal";
import { ProjectPreview } from "./ProjectPreview";
import { SectionHeading } from "./ui/SectionHeading";

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          index="02"
          eyebrow="Featured work"
          title={
            <>
              Things I&apos;ve <span className="text-gradient">shipped</span>.
            </>
          }
          description="Real systems for real businesses — each one built end to end, from data model to deployment."
        />

        {/* editorial rows */}
        <div className="border-t border-border">
          {projects.map((project, i) => {
            const isHovered = hovered === project.id;
            return (
              <div
                key={project.id}
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setActive(project)}
                className="group relative cursor-pointer border-b border-border"
              >
                {/* hover wash */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-surface/0 via-surface/60 to-surface/0"
                  initial={false}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />

                <div className="relative grid grid-cols-12 items-center gap-4 py-7 md:py-9">
                  <div className="col-span-12 flex items-baseline gap-5 md:col-span-7">
                    <span
                      className={`font-mono text-sm transition-colors ${isHovered ? "text-primary" : "text-muted"}`}
                    >
                      0{i + 1}
                    </span>
                    <div>
                      <h3
                        className={`display text-3xl transition-all duration-500 sm:text-4xl md:text-5xl ${isHovered ? "translate-x-1 text-foreground" : "text-foreground/90"}`}
                      >
                        {project.title}
                      </h3>
                      <p className="mt-2 max-w-md text-sm text-muted">
                        {project.summary}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-12 hidden flex-wrap gap-2 md:col-span-3 md:flex">
                    {project.stack.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="col-span-12 flex items-center justify-between md:col-span-2 md:justify-end md:gap-4">
                    <span className="font-mono text-xs text-muted">
                      {project.year}
                    </span>
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 ${isHovered ? "border-primary bg-primary text-background" : "border-border text-muted"}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M7 17 17 7M17 7H8M17 7v9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* floating preview on hover (desktop only) */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, rotate: -2 }}
                      animate={{ opacity: 1, y: 0, rotate: -3 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="pointer-events-none absolute right-[6%] top-1/2 z-20 hidden h-44 w-72 -translate-y-1/2 lg:block"
                    >
                      <ProjectPreview project={project} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <p className="mt-6 font-mono text-xs text-muted">
          Click any project to open the case study.
        </p>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
