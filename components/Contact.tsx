"use client";

import { profile } from "@/lib/data";
import { Magnetic } from "./ui/Magnetic";
import { Reveal } from "./ui/Reveal";

const links = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    label: "LinkedIn",
    value: "in/muhammadadnan111",
    href: profile.linkedin,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: profile.phoneHref,
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-36">
      {/* focused glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]" />

      <div className="shell relative text-center">
        <Reveal>
          <span className="eyebrow">Contact · 05</span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="display mx-auto mt-6 max-w-4xl text-[clamp(2.6rem,9vw,7rem)] text-foreground">
            Let&apos;s build
            <br />
            something{" "}
            <span className="text-gradient">fast</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted">
            Have a system to launch or a workflow to automate? I turn ideas into
            shipped, business-ready products.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex justify-center">
            <Magnetic strength={0.4}>
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 text-base font-medium text-background transition-shadow hover:shadow-[0_0_50px_-10px_rgb(var(--glow))]"
              >
                Start a conversation
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background/10 transition-transform group-hover:rotate-45">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 17 17 7M17 7H8M17 7v9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label === "LinkedIn" ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface/40 px-6 py-8 text-center backdrop-blur transition-all hover:border-primary/50 hover:bg-surface/80"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  {link.label}
                </span>
                <span className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                  {link.label === "Email" ? (
                    <span className="block break-words">{link.value}</span>
                  ) : (
                    link.value
                  )}
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
