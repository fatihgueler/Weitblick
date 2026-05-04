import type { ReactElement } from "react";

type IconProps = { className?: string };

const base = "stroke-current";

export const ServiceIcons: Record<string, (p: IconProps) => ReactElement> = {
  consulting: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={`${base} ${className}`} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h12l4 4v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
      <path d="M16 5v4h4" />
      <path d="M7 12h8M7 15h6M7 18h4" />
    </svg>
  ),
  renovation: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={`${base} ${className}`} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12L12 4l9 8" />
      <path d="M5 11v9h14v-9" />
      <path d="M9 20v-5h6v5" />
      <path d="M14.5 6l3-3m0 0l-3-3m3 3h-7" />
    </svg>
  ),
  smart: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={`${base} ${className}`} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
      <circle cx="7" cy="7" r="0.5" fill="currentColor" />
      <circle cx="10" cy="7" r="0.5" fill="currentColor" />
      <path d="M6 14l3-3 2 2 3-3 4 4" />
      <path d="M10 22h4M12 18v4" />
    </svg>
  ),
  energy: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={`${base} ${className}`} strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  ),
  monitoring: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={`${base} ${className}`} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17l5-6 4 4 4-5 5 6" />
      <path d="M3 21h18" />
      <circle cx="8" cy="11" r="1" fill="currentColor" />
      <circle cx="12" cy="15" r="1" fill="currentColor" />
      <circle cx="16" cy="10" r="1" fill="currentColor" />
    </svg>
  ),
  iot: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={`${base} ${className}`} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2" />
      <path d="M8 12a4 4 0 0 1 8 0M5 12a7 7 0 0 1 14 0M2 12a10 10 0 0 1 20 0" />
    </svg>
  ),
  shield: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={`${base} ${className}`} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 4v6c0 5-3.5 9-8 10c-4.5-1-8-5-8-10V6l8-4z" />
      <path d="M9 12l2 2 4-5" />
    </svg>
  ),
  chart: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={`${base} ${className}`} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20V8M10 20V4M16 20v-7M22 20H2" />
    </svg>
  ),
};
