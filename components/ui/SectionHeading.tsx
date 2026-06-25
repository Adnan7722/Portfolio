import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <Reveal>
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-xs text-primary">{index}</span>
            <span className="h-px w-8 bg-border" />
            <span className="eyebrow">{eyebrow}</span>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display text-[clamp(2.2rem,6vw,4.2rem)] text-foreground">
            {title}
          </h2>
        </Reveal>
      </div>
      {description && (
        <Reveal delay={0.1}>
          <p className="max-w-sm text-sm leading-relaxed text-muted md:text-right">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
