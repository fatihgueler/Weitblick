import type { ReactElement } from "react";

type IconProps = { className?: string };

const base = "stroke-current";

export const ServiceIcons: Record<string, (p: IconProps) => ReactElement> = {
  residential: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={`${base} ${className}`} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11.5L12 4l9 7.5" />
      <path d="M5 10v9.5h14V10" />
      <path d="M10 19.5v-5h4v5" />
    </svg>
  ),
  commercial: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={`${base} ${className}`} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="8" height="18" rx="1" />
      <rect x="13" y="8" width="8" height="13" rx="1" />
      <path d="M6 7h2M6 11h2M6 15h2M16 12h2M16 16h2" />
    </svg>
  ),
  audit: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={`${base} ${className}`} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 4h6l4 4v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
      <path d="M14 4v5h5" />
      <path d="M8 14l2 2 4-4" />
    </svg>
  ),
  certificate: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={`${base} ${className}`} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="10" r="5" />
      <path d="M9 14l-2 6 5-2 5 2-2-6" />
      <path d="M10 10l2 2 3-3" />
    </svg>
  ),
  thermography: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={`${base} ${className}`} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4a3 3 0 0 0-6 0v9a4 4 0 1 0 6 0z" />
      <circle cx="11" cy="17" r="2" />
      <path d="M11 13V7" />
    </svg>
  ),
  photovoltaic: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={`${base} ${className}`} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v2M12 18v2M4 12h2M18 12h2M6 6l1.5 1.5M16.5 16.5L18 18M6 18l1.5-1.5M16.5 7.5L18 6" />
    </svg>
  ),
  architecture: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={`${base} ${className}`} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 21V7l8-4 8 4v14" />
      <path d="M9 21v-7h6v7" />
      <path d="M4 11h16" />
    </svg>
  ),
  international: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={`${base} ${className}`} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
    </svg>
  ),
};
