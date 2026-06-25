import { profile } from "@/lib/data";
import { Marquee } from "./ui/Marquee";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border pt-16">
      {/* synthwave perspective grid floor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 overflow-hidden opacity-[0.18] [mask-image:linear-gradient(to_top,#000_10%,transparent)]"
      >
        <div
          className="absolute inset-x-[-50%] bottom-0 top-0 [transform:perspective(260px)_rotateX(62deg)] [transform-origin:bottom]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* oversized name marquee */}
      <Marquee className="select-none border-b border-border py-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="display mx-6 text-[clamp(3rem,10vw,8rem)] text-foreground/10"
          >
            {profile.name}
            <span className="text-primary/40"> · </span>
          </span>
        ))}
      </Marquee>

      <div className="shell flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-display text-sm font-bold text-background">
            A
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            Built different. Shipped with purpose.
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-foreground"
          >
            Email
          </a>
        </div>

        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          © {year} {profile.name}
        </p>
      </div>
    </footer>
  );
}
