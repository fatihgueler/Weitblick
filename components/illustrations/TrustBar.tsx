type Crest = { id: string; label: string };

const crests: Crest[] = [
  { id: "dena", label: "dena Energieeffizienz-Expertenliste" },
  { id: "kfw", label: "KfW-zertifiziert" },
  { id: "bafa", label: "BAFA Beratungsmodule" },
  { id: "iso", label: "DIN EN 16247-1" },
  { id: "esg", label: "ESG / EU-Taxonomie" },
];

export function TrustBar({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {crests.map((crest) => (
          <li
            key={crest.id}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-700"
          >
            <CrestIcon variant={crest.id} className="h-7 w-7 shrink-0" />
            <span>{crest.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CrestIcon({
  variant,
  className,
}: {
  variant: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id={`crest-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
      </defs>
      <path
        d="M16 2l12 5v9c0 7-5 12-12 14C9 28 4 23 4 16V7l12-5z"
        fill={`url(#crest-${variant})`}
        opacity="0.15"
      />
      <path
        d="M16 2l12 5v9c0 7-5 12-12 14C9 28 4 23 4 16V7l12-5z"
        fill="none"
        stroke="#15803d"
        strokeWidth="1.5"
      />
      <path
        d="M10 17l4 4l8 -10"
        stroke="#15803d"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
