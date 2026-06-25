"use client";

import type { ReactNode } from "react";

/** Seamless infinite marquee (duplicated track + 50% translate). */
export function Marquee({
  children,
  className,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
}) {
  return (
    <div className={`group flex overflow-hidden ${className ?? ""}`}>
      <div
        className="flex shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
