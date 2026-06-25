/**
 * Blocky pixel-art icons drawn with crisp-edge rects. Themed via currentColor.
 * 16x16 logical grid scaled up.
 */

type IconProps = { size?: number; className?: string };

const base = (size: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 16 16",
  shapeRendering: "crispEdges" as const,
  fill: "currentColor",
  className,
});

export function PixelMonitor({ size = 40, className }: IconProps) {
  return (
    <svg {...base(size, className)} aria-hidden>
      <path d="M1 2h14v9H1z" opacity="0.18" />
      <path d="M1 2h14v1H1zM1 2h1v9H1zM14 2h1v9h-1zM1 10h14v1H1z" />
      <path d="M3 4h10v5H3z" opacity="0.5" />
      <path d="M4 5h3v1H4zM4 7h6v1H4z" />
      <path d="M6 11h4v2H6zM4 13h8v1H4z" />
    </svg>
  );
}

export function PixelFloppy({ size = 40, className }: IconProps) {
  return (
    <svg {...base(size, className)} aria-hidden>
      <path d="M2 2h10l2 2v10H2z" opacity="0.18" />
      <path d="M2 2h10v1H2zM2 2h1v12H2zM13 14h-1V4h1zM2 13h12v1H2zM12 2l2 2h-1V3h-1z" />
      <path d="M5 2h4v4H5z" />
      <path d="M7 3h1v2H7z" opacity="0.4" />
      <path d="M4 9h8v4H4z" opacity="0.5" />
      <path d="M5 10h6v1H5zM5 12h6v1H5z" />
    </svg>
  );
}

export function PixelMouse({ size = 40, className }: IconProps) {
  return (
    <svg {...base(size, className)} aria-hidden>
      <path d="M4 3h8v10H4z" opacity="0.18" />
      <path d="M5 2h6v1H5zM4 3h1v10h1V3h4v10h1V3h1v10H4zM4 13h8v1H4z" />
      <path d="M7 4h2v3H7z" />
      <path d="M8 1h1v2H8z" opacity="0.5" />
    </svg>
  );
}

export function PixelJoystick({ size = 40, className }: IconProps) {
  return (
    <svg {...base(size, className)} aria-hidden>
      <path d="M3 9h10v5H3z" opacity="0.18" />
      <path d="M7 2h2v6H7z" />
      <path d="M6 1h4v2H6z" />
      <path d="M3 9h10v1H3zM3 9h1v5H3zM12 9h1v5h-1zM3 13h10v1H3z" />
      <path d="M5 11h2v2H5z" opacity="0.6" />
      <path d="M10 11h1v1h-1z" />
    </svg>
  );
}

export function PixelTerminal({ size = 40, className }: IconProps) {
  return (
    <svg {...base(size, className)} aria-hidden>
      <path d="M2 3h12v10H2z" opacity="0.18" />
      <path d="M2 3h12v1H2zM2 3h1v10H2zM13 3h1v10h-1zM2 12h12v1H2z" />
      <path d="M4 6l2 2-2 2V9l1-1-1-1z" />
      <path d="M8 9h4v1H8z" />
    </svg>
  );
}

export function PixelCassette({ size = 40, className }: IconProps) {
  return (
    <svg {...base(size, className)} aria-hidden>
      <path d="M2 4h12v8H2z" opacity="0.18" />
      <path d="M2 4h12v1H2zM2 4h1v8H2zM13 4h1v8h-1zM2 11h12v1H2z" />
      <path d="M4 6h2v2H4zM10 6h2v2h-2z" />
      <path d="M6 7h4v1H6z" opacity="0.5" />
      <path d="M5 10h6v1H5z" />
    </svg>
  );
}

export const pixelHardware = [
  { Icon: PixelMonitor, label: "CRT" },
  { Icon: PixelFloppy, label: "FLOPPY" },
  { Icon: PixelTerminal, label: "TERMINAL" },
  { Icon: PixelMouse, label: "MOUSE" },
  { Icon: PixelJoystick, label: "JOYSTICK" },
  { Icon: PixelCassette, label: "TAPE" },
];
