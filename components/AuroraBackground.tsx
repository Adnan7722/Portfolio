/**
 * Drifting gradient-mesh "aurora" blobs. Pure CSS + Tailwind keyframes,
 * GPU-friendly (transform/opacity only). Sits behind everything.
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />

      {/* clay glow, top-left */}
      <div className="absolute -left-[10%] -top-[15%] h-[55vh] w-[55vh] animate-aurora-drift rounded-full bg-primary/25 blur-[110px]" />
      {/* amber glow, right */}
      <div
        className="absolute right-[-12%] top-[18%] h-[50vh] w-[50vh] animate-aurora-drift rounded-full bg-amber/20 blur-[120px]"
        style={{ animationDelay: "-6s" }}
      />
      {/* phosphor-green signal, lower-center */}
      <div
        className="absolute bottom-[-18%] left-[30%] h-[45vh] w-[45vh] animate-aurora-drift rounded-full bg-accent/12 blur-[120px]"
        style={{ animationDelay: "-11s" }}
      />

      {/* fine engineer's grid, fading out downward */}
      <div className="dotted-grid mask-fade-b absolute inset-0 opacity-60" />

      {/* CRT screen vignette — darkens the corners like a curved tube */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 45%, transparent 55%, rgb(0 0 0 / var(--vignette)) 100%)",
        }}
      />
    </div>
  );
}
