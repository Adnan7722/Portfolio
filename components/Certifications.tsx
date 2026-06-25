"use client";

import { certifications } from "@/lib/data";
import { SectionHeading } from "./ui/SectionHeading";
import { RevealGroup, RevealItem } from "./ui/Reveal";

export function Certifications() {
  return (
    <section id="certs" className="relative py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow="AI Certifications"
          title={
            <>
              Certified by{" "}
              <span className="text-gradient">Anthropic</span>.
            </>
          }
          description="Formal training in agentic coding and building production apps on Claude — the same AI I build with."
        />

        <RevealGroup
          className="grid gap-4 md:grid-cols-2"
          stagger={0.12}
        >
          {certifications.map((cert) => (
            <RevealItem key={cert.title}>
              <article className="group relative h-full overflow-hidden rounded-4xl border border-border bg-surface/50 p-7 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_60px_-20px_rgb(var(--glow))]">
                {/* glow wash */}
                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-primary/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-50" />

                <div className="relative flex items-start justify-between">
                  {/* Anthropic-style seal */}
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/40 bg-background/60">
                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                      <div className="shimmer-line absolute inset-0 animate-shimmer" />
                    </div>
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="relative text-primary"
                    >
                      {/* abstract spark / seal mark */}
                      <path
                        d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        opacity="0.5"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="4"
                        fill="currentColor"
                        opacity="0.9"
                      />
                    </svg>
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path
                        d="m5 13 4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {cert.badge}
                  </span>
                </div>

                <div className="relative mt-10">
                  <h3 className="font-display text-2xl text-foreground sm:text-3xl">
                    {cert.title}
                  </h3>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-primary">
                    {cert.issuer} · Verified
                  </p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                    {cert.note}
                  </p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
