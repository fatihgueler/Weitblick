import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        tech: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#0b1c4a",
        },
        ink: {
          50: "#f6f7f9",
          100: "#eceef2",
          200: "#d4d8e0",
          300: "#a7afbe",
          400: "#717a8e",
          500: "#4a5163",
          600: "#363c4c",
          700: "#262b38",
          800: "#171a23",
          900: "#0a0c12",
          950: "#03050a",
        },
        accent: {
          400: "#fcd34d",
          500: "#f59e0b",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-sm": ["clamp(2.25rem, 4vw + 1rem, 3rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display": ["clamp(2.75rem, 6vw + 1rem, 4.75rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(3rem, 9vw + 1rem, 7rem)", { lineHeight: "0.95", letterSpacing: "-0.035em" }],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(10,12,18,0.04), 0 4px 16px rgba(10,12,18,0.04)",
        lift: "0 2px 4px rgba(10,12,18,0.05), 0 16px 40px rgba(10,12,18,0.08)",
        glow: "0 0 0 1px rgba(16,185,129,0.18), 0 24px 60px -16px rgba(16,185,129,0.45)",
        "glow-blue": "0 0 0 1px rgba(59,130,246,0.18), 0 24px 60px -16px rgba(59,130,246,0.45)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1.25rem",
          sm: "1.5rem",
          lg: "2rem",
          xl: "3rem",
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.7s ease-out both",
        "blob": "blob 18s ease-in-out infinite",
        "shimmer": "shimmer 2.5s ease-in-out infinite",
        "marquee": "marquee 38s linear infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        "tick": "tick 2.4s ease-in-out infinite",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(40px,-30px) scale(1.08)" },
          "66%": { transform: "translate(-30px,30px) scale(0.94)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.85" },
        },
        tick: {
          "0%": { transform: "scaleY(0.4)", opacity: "0.4" },
          "50%": { transform: "scaleY(1)", opacity: "1" },
          "100%": { transform: "scaleY(0.4)", opacity: "0.4" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
