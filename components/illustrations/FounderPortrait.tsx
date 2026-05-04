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
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="portraitRing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a7f3d0" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <radialGradient id="portraitGlow" cx="0.3" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="240" height="240" rx="56" fill="url(#portraitBg)" />
      <rect x="0" y="0" width="240" height="240" rx="56" fill="url(#portraitGlow)" />

      <g
        stroke="url(#portraitRing)"
        strokeWidth="2"
        fill="none"
        opacity="0.45"
      >
        <rect x="14" y="14" width="212" height="212" rx="48" strokeDasharray="2 6" />
        <rect x="32" y="32" width="176" height="176" rx="36" strokeDasharray="6 8" />
      </g>

      <g transform="translate(120 120)">
        <rect x="-58" y="-58" width="116" height="116" rx="28" fill="#0a0c12" opacity="0.45" />
        <rect x="-58" y="-58" width="116" height="116" rx="28" fill="none" stroke="#a7f3d0" strokeOpacity="0.45" />
        <text
          x="0"
          y="22"
          textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight="800"
          fontSize="56"
          fill="#ffffff"
          letterSpacing="0.04em"
        >
          {initials}
        </text>
      </g>

      <g transform="translate(46 30)" opacity="0.55">
        <circle r="32" fill="#a7f3d0" opacity="0.35" />
      </g>
      <g transform="translate(206 206)" opacity="0.55">
        <circle r="40" fill="#3b82f6" opacity="0.3" />
      </g>
    </svg>
  );
}
