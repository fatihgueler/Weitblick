import type { IconKey } from "./content";

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const paths: Record<IconKey, React.ReactNode> = {
  heat: (
    <>
      <path d="M9 18a3 3 0 0 0 6 0c0-1.5-1-2.5-1-4 0-2 1-3 1-5a3 3 0 0 0-6 0c0 2 1 3 1 5 0 1.5-1 2.5-1 4Z" />
    </>
  ),
  insulation: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3 9h18M3 13h18M3 17h18M8 5v14M16 5v14" />
    </>
  ),
  window: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M12 3v18M4 12h16" />
    </>
  ),
  solar: (
    <>
      <path d="M4 17 6 8h12l2 9z" />
      <path d="M5.2 13h13.6M12 8v9M9.5 17l-.5 4M14.5 17l.5 4" />
    </>
  ),
  renovation: (
    <>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M9.5 20v-6h5v6" />
    </>
  ),
  buy: (
    <>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10" />
      <path d="m10.5 14.5 1.5 1.5 3-3" />
    </>
  ),
  question: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.3 2.4c-.8.3-1.3 1-1.3 1.9v.4" />
      <path d="M12 17.2h.01" />
    </>
  ),
  house: (
    <>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3" />
    </>
  ),
  apartment: (
    <>
      <rect x="4" y="8" width="16" height="13" rx="1" />
      <path d="M8 8V4h8v4M9 12h2M13 12h2M9 16h2M13 16h2" />
    </>
  ),
  commercial: (
    <>
      <path d="M3 21h18M5 21V8l7-4 7 4v13" />
      <path d="M9 21v-4h6v4M9 11h1.5M13.5 11h1.5" />
    </>
  ),
  owner: (
    <>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </>
  ),
  "owner-plan": (
    <>
      <circle cx="10" cy="8" r="3" />
      <path d="M4 20a6 6 0 0 1 11-3.3" />
      <path d="M18 14v6M15 17h6" />
    </>
  ),
  tenant: (
    <>
      <path d="M4 11 12 5l8 6" />
      <path d="M6 10v9h12v-9" />
      <circle cx="12" cy="14.5" r="1.6" />
      <path d="M9.5 19a2.5 2.5 0 0 1 5 0" />
    </>
  ),
  old: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  mid: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4l3 1.5" />
    </>
  ),
  new: (
    <>
      <path d="m12 3 2.4 4.9 5.4.8-3.9 3.8.9 5.3L12 16.9 7.2 18.6l.9-5.3L4.2 9.5l5.4-.8z" />
    </>
  ),
  gas: (
    <>
      <path d="M12 3s5 4 5 9a5 5 0 0 1-10 0c0-2 1-3.5 2-5 .5 1 1.5 1.5 2 2 .5-2 1-4 1-6Z" />
    </>
  ),
  oil: (
    <>
      <path d="M12 3c3 3.6 5 6.4 5 9a5 5 0 0 1-10 0c0-2.6 2-5.4 5-9Z" />
    </>
  ),
  district: (
    <>
      <rect x="3" y="9" width="18" height="11" rx="1" />
      <path d="M7 9V5h4v4M8 14c.8-1 .8-2 0-3M12 14c.8-1 .8-2 0-3M16 14c.8-1 .8-2 0-3" />
    </>
  ),
  heatpump: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="1.5" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 9.5v5M9.5 12h5" />
    </>
  ),
  power: (
    <>
      <path d="M13 3 5 13h6l-1 8 8-10h-6z" />
    </>
  ),
  more: (
    <>
      <circle cx="5" cy="12" r="1.3" />
      <circle cx="12" cy="12" r="1.3" />
      <circle cx="19" cy="12" r="1.3" />
    </>
  ),
  rocket: (
    <>
      <path d="M5 15c-1 1-1.5 4-1.5 4s3-.5 4-1.5" />
      <path d="M9 15s-2-4 1-8c2.5-3.4 6.5-3.6 8.5-3.4.2 2-.0 6-3.4 8.5-4 3-8 1-8 1Z" />
      <circle cx="14.5" cy="9.5" r="1.4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="1.5" />
      <path d="M3.5 9h17M8 3v4M16 3v4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5l3 2" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18M16 14h2" />
    </>
  ),
  bank: (
    <>
      <path d="M3 9 12 4l9 5" />
      <path d="M5 9v8M9 9v8M15 9v8M19 9v8M3 20h18" />
    </>
  ),
  open: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 10a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5v.2M12 17h.01" />
    </>
  ),
};

export function OptionIcon({
  icon,
  className,
}: {
  icon: IconKey;
  className?: string;
}) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      {paths[icon]}
    </svg>
  );
}
