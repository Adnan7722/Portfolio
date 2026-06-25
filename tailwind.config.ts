import type { Config } from "tailwindcss";

/**
 * Colors are wired to CSS variables (space-separated RGB channels) so the
 * dark/light theme swap in globals.css flows through every utility, including
 * opacity modifiers like `bg-primary/20`.
 */
const withOpacity = (variable: string) => {
  return ({ opacityValue }: { opacityValue?: string }) =>
    opacityValue === undefined
      ? `rgb(var(${variable}))`
      : `rgb(var(${variable}) / ${opacityValue})`;
};

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: withOpacity("--bg") as unknown as string,
        surface: withOpacity("--surface") as unknown as string,
        "surface-2": withOpacity("--surface-2") as unknown as string,
        border: withOpacity("--border") as unknown as string,
        foreground: withOpacity("--foreground") as unknown as string,
        muted: withOpacity("--muted") as unknown as string,
        primary: withOpacity("--primary") as unknown as string,
        accent: withOpacity("--accent") as unknown as string,
        amber: withOpacity("--amber") as unknown as string,
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        terminal: ["var(--font-terminal)", "ui-monospace", "monospace"],
        pixel: ["var(--font-pixel)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      maxWidth: {
        shell: "1320px",
      },
      keyframes: {
        "aurora-drift": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(4%, -6%, 0) scale(1.1)" },
          "66%": { transform: "translate3d(-5%, 4%, 0) scale(0.95)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.8" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      animation: {
        "aurora-drift": "aurora-drift 18s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        shimmer: "shimmer 3.5s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
