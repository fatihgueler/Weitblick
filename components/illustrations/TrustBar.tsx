type CrestProps = { className?: string };

export function TrustBar({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
        {items.map((label, i) => (
          <li
            key={label}
            className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink-700"
          >
            <CrestIcon variant={`v${i}`} className="h-7 w-7 shrink-0" />
            <span>{label}</span>
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
} & CrestProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id={`crest-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <path
        d="M16 2l12 5v9c0 7-5 12-12 14C9 28 4 23 4 16V7l12-5z"
        fill={`url(#crest-${variant})`}
        opacity="0.12"
      />
      <path
        d="M16 2l12 5v9c0 7-5 12-12 14C9 28 4 23 4 16V7l12-5z"
        fill="none"
        stroke={`url(#crest-${variant})`}
        strokeWidth="1.5"
      />
      <path
        d="M10 17l4 4l8 -10"
        stroke="#0a0c12"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
