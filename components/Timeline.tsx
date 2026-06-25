"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/lib/data";
import { SectionHeading } from "./ui/SectionHeading";

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 75%"],
  });
  // the progress line draws itself as you scroll through the section
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="path" className="relative py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          index="04"
          eyebrow="The path"
          title={
            <>
              Where I&apos;ve <span className="text-gradient">built</span>.
            </>
          }
          description="Marketplaces, field-service platforms, and enterprise clients — shipping production software the whole way."
        />

        <div ref={ref} className="relative pl-8 md:pl-0">
          {/* rail */}
          <div className="absolute left-[7px] top-2 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            style={{ height }}
            className="absolute left-[7px] top-2 w-px bg-gradient-to-b from-primary via-primary to-accent md:left-1/2 md:-translate-x-1/2"
          />

          <div className="flex flex-col gap-12 md:gap-2">
            {experience.map((job, i) => {
              const left = i % 2 === 0;
              const isEdu = job.kind === "education";
              return (
                <div
                  key={job.company}
                  className={`relative md:grid md:grid-cols-2 md:gap-12 ${left ? "" : "md:[&>*:first-child]:col-start-2"}`}
                >
                  {/* node */}
                  <span className="absolute -left-[26px] top-1.5 z-10 flex h-4 w-4 items-center justify-center md:left-1/2 md:-translate-x-1/2">
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className={`h-3 w-3 rounded-full border-2 bg-background ${isEdu ? "border-amber" : "border-primary"}`}
                    />
                  </span>

                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`pb-2 md:py-10 ${left ? "md:pr-4 md:text-right" : "md:col-start-2 md:pl-4"}`}
                  >
                    <div
                      className={`group rounded-3xl border border-border bg-surface/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/40 ${left ? "md:items-end" : ""}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`font-mono text-xs ${isEdu ? "text-amber" : "text-primary"}`}
                        >
                          {isEdu ? "EDU · " : ""}
                          {job.period}
                        </span>
                        {job.remote && (
                          <span className="rounded-full bg-primary/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-primary">
                            Remote
                          </span>
                        )}
                      </div>
                      <h3 className="mt-2 font-display text-2xl text-foreground">
                        {job.company}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-foreground/80">
                        {job.role}
                      </p>
                      <p className="mt-1 text-xs text-muted">{job.location}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {job.summary}
                      </p>
                      <div
                        className={`mt-4 flex flex-wrap gap-2 ${left ? "md:justify-end" : ""}`}
                      >
                        {job.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
