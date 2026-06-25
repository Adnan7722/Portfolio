"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { services, type Service } from "@/lib/data";
import { ServiceGlyph } from "./icons/ServiceGlyph";
import { SectionHeading } from "./ui/SectionHeading";
import { RevealGroup, RevealItem } from "./ui/Reveal";

const spanClass: Record<Service["span"], string> = {
  wide: "lg:col-span-7",
  tall: "lg:col-span-5 lg:row-span-2",
  normal: "lg:col-span-4",
};

function ServiceCard({ service }: { service: Service }) {
  const ref = useRef<HTMLDivElement>(null);

  // spotlight follows the cursor across the card
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const last = service.span === "normal" && service.index === "04";

  return (
    <RevealItem
      className={`${spanClass[service.span]} ${last ? "lg:col-span-3" : ""}`}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        className="card-grad-border group relative flex h-full flex-col justify-between overflow-hidden rounded-4xl border border-border bg-surface/50 p-7 backdrop-blur-sm transition-colors duration-500 hover:bg-surface"
      >
        {/* cursor spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx) var(--my), rgb(var(--primary) / 0.12), transparent 60%)",
          }}
        />

        <div className="relative flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background/60 text-primary transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-105">
            <ServiceGlyph glyph={service.glyph} />
          </div>
          <span className="font-mono text-xs text-muted">{service.index}</span>
        </div>

        <div className="relative mt-8">
          <h3 className="font-display text-2xl text-foreground">
            {service.title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            {service.blurb}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {service.points.map((p) => (
              <span
                key={p}
                className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted transition-colors group-hover:border-primary/40 group-hover:text-foreground"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* animated underline that sweeps in on hover */}
        <motion.div className="relative mt-7 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-primary via-accent to-transparent transition-transform duration-500 group-hover:scale-x-100" />
      </div>
    </RevealItem>
  );
}

export function WhatIDo() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          index="01"
          eyebrow="What I do"
          title={
            <>
              Four ways I turn ideas
              <br className="hidden md:block" /> into{" "}
              <span className="text-gradient">live systems</span>.
            </>
          }
          description="Design, build, automate, ship. I cover the full stack so small teams get one engineer who owns the outcome."
        />

        <RevealGroup
          className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12"
          stagger={0.1}
        >
          {services.map((service) => (
            <ServiceCard key={service.index} service={service} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
