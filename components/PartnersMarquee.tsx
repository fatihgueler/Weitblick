export function PartnersMarquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent"
      />
      <ul className="flex w-max animate-marquee items-center gap-x-12 py-1">
        {doubled.map((label, i) => (
          <li
            key={`${label}-${i}`}
            className="flex shrink-0 items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink-700"
          >
            <Crest variant={`m${i}`} className="h-7 w-7" />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Crest({ variant, className }: { variant: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id={`mq-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <path
        d="M16 2l12 5v9c0 7-5 12-12 14C9 28 4 23 4 16V7l12-5z"
        fill={`url(#mq-${variant})`}
        opacity="0.12"
      />
      <path
        d="M16 2l12 5v9c0 7-5 12-12 14C9 28 4 23 4 16V7l12-5z"
        fill="none"
        stroke={`url(#mq-${variant})`}
        strokeWidth="1.4"
      />
      <path
        d="M10 17l4 4 8 -10"
        stroke="#0a0c12"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
