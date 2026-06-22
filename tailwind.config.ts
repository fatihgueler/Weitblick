import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Grundfläche – kühles „Blaupausen-Papier", nicht klinisches Weiß. */
        paper: "#f4f7fb",
        /* Primärfarbe – tiefes Navy/Dunkelblau (Headings, Buttons, Footer). */
        navy: {
          50: "#eef3fb",
          100: "#d7e2f4",
          200: "#b0c5e7",
          300: "#7fa0d4",
          400: "#4f76ba",
          500: "#33559b",
          600: "#26417d",
          700: "#1f3666",
          800: "#192b51",
          900: "#121f3a",
          950: "#0a1326",
        },
        /* Akzentfarbe – EINE Farbe (Türkis), sehr sparsam eingesetzt. */
        teal: {
          50: "#ecfdf8",
          100: "#cffaee",
          200: "#9ff2dd",
          300: "#63e4c8",
          400: "#2fccae",
          500: "#13b095",
          600: "#0a8d79",
          700: "#0b7063",
          800: "#0d5950",
          900: "#0e4a43",
          950: "#022c28",
        },
        /* Neutrale – Slate/Anthrazit für Text & Flächen. */
        ink: {
          50: "#f7f9fc",
          100: "#eef2f8",
          200: "#e0e7f0",
          300: "#cbd5e3",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f1a2e",
          950: "#070d18",
        },
        /* Signaturfarbe – warmes Morgenlicht (Sonnenaufgang am Horizont).
           NUR für das Signatur-Motiv „Weitblick" – extrem sparsam. */
        sunrise: {
          50: "#fff8ec",
          100: "#fcebc9",
          200: "#f8d58a",
          300: "#f4be54",
          400: "#f2b441",
          500: "#d98c1e",
          600: "#b06913",
          700: "#8a4f12",
          800: "#713f15",
          900: "#603514",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "display-sm": ["clamp(2rem, 3.5vw + 1rem, 2.75rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        display: ["clamp(2.5rem, 5vw + 1rem, 4rem)", { lineHeight: "1.04", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2.75rem, 7vw + 1rem, 5rem)", { lineHeight: "1.01", letterSpacing: "-0.03em" }],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,26,46,0.04), 0 4px 16px rgba(15,26,46,0.05)",
        lift: "0 2px 4px rgba(15,26,46,0.04), 0 12px 32px rgba(15,26,46,0.09)",
        glow: "0 0 0 1px rgba(19,176,149,0.18), 0 16px 48px -12px rgba(19,176,149,0.40)",
        sunrise: "0 0 0 1px rgba(242,180,65,0.25), 0 20px 50px -16px rgba(242,180,65,0.45)",
        "navy-lift": "0 2px 4px rgba(7,13,24,0.18), 0 24px 60px -20px rgba(7,13,24,0.55)",
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
        screens: {
          "2xl": "1120px",
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "fade-in": "fade-in 0.6s ease-out both",
        "acc-down": "acc-down 0.3s ease-out",
        "acc-up": "acc-up 0.25s ease-out",
        "sun-rise": "sun-rise 1.4s cubic-bezier(0.16,1,0.3,1) both",
        "horizon-draw": "horizon-draw 1.6s cubic-bezier(0.65,0,0.35,1) both",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "sun-rise": {
          "0%": { opacity: "0", transform: "translateY(26px) scale(0.85)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "horizon-draw": {
          "0%": { strokeDashoffset: "640" },
          "100%": { strokeDashoffset: "0" },
        },
        "acc-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "acc-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
