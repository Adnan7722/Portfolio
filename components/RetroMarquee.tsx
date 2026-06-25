import { pixelHardware } from "./icons/PixelIcons";
import { Marquee } from "./ui/Marquee";

/**
 * A scrolling band of pixel-art hardware — the retro motif as a transition
 * between sections. Alternates clay/amber/phosphor accents.
 */
const accentCycle = ["text-primary", "text-amber", "text-accent"];

export function RetroMarquee() {
  return (
    <div className="relative border-y border-border bg-surface/30 py-6">
      <Marquee>
        {[...pixelHardware, ...pixelHardware].map(({ Icon, label }, i) => (
          <div
            key={`${label}-${i}`}
            className="mx-8 flex items-center gap-3 opacity-70 transition-opacity hover:opacity-100"
          >
            <Icon
              size={34}
              className={accentCycle[i % accentCycle.length]}
            />
            <span className="font-pixel text-[9px] uppercase tracking-wider text-muted">
              {label}
            </span>
            <span className="ml-6 font-terminal text-2xl text-border">/</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
