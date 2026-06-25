import type { Service } from "@/lib/data";

const common = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ServiceGlyph({ glyph }: { glyph: Service["glyph"] }) {
  switch (glyph) {
    case "stack":
      return (
        <svg {...common}>
          <path d="m12 2 9 5-9 5-9-5 9-5Z" />
          <path d="m3 12 9 5 9-5" />
          <path d="m3 17 9 5 9-5" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common}>
          <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" />
        </svg>
      );
    case "store":
      return (
        <svg {...common}>
          <path d="M3 9 4.5 4h15L21 9M3 9v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9M3 9h18" />
          <path d="M8 9v3a2 2 0 1 1-4 0M12 9v3a2 2 0 1 1-4 0M16 9v3a2 2 0 1 1-4 0M20 9v3a2 2 0 1 1-4 0" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...common}>
          <path d="M5 13c-1.5 1.5-2 5-2 5s3.5-.5 5-2M14.5 4.5C17 2 21 2 21 2s0 4-2.5 6.5L13 14l-3-3 4.5-6.5Z" />
          <path d="M9 11 6.5 8.5M16 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
        </svg>
      );
    default:
      return null;
  }
}
