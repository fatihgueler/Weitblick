export function FounderPortrait({
  className,
  initials = "EA",
}: {
  className?: string;
  initials?: string;
}) {
  return (
    <svg
      viewBox="0 0 240 240"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="portraitBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="100%" stopColor="#052e16" />
        </linearGradient>
        <linearGradient id="portraitRing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
        <radialGradient id="portraitGlow" cx="0.3" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#bbf7d0" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#15803d" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="120" cy="120" r="120" fill="url(#portraitBg)" />
      <circle cx="120" cy="120" r="120" fill="url(#portraitGlow)" />

      <g
        stroke="url(#portraitRing)"
        strokeWidth="2"
        fill="none"
        opacity="0.55"
      >
        <circle cx="120" cy="120" r="98" strokeDasharray="2 6" />
        <circle cx="120" cy="120" r="80" strokeDasharray="6 8" />
      </g>

      <g transform="translate(120 120)">
        <circle r="62" fill="#0f1a14" opacity="0.45" />
        <circle r="62" fill="none" stroke="#bbf7d0" strokeOpacity="0.4" />
        <text
          x="0"
          y="22"
          textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight="800"
          fontSize="56"
          fill="#ffffff"
          letterSpacing="0.06em"
        >
          {initials}
        </text>
      </g>

      <g transform="translate(40 30)" opacity="0.5">
        <circle r="34" fill="#22c55e" opacity="0.25" />
      </g>
      <g transform="translate(200 200)" opacity="0.5">
        <circle r="44" fill="#22c55e" opacity="0.2" />
      </g>
    </svg>
  );
}
