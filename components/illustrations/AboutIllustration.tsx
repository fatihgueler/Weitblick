export function AboutIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 380"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="aboutBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#dcfce7" />
          <stop offset="100%" stopColor="#bbf7d0" />
        </linearGradient>
        <linearGradient id="aboutGlobe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="100%" stopColor="#052e16" />
        </linearGradient>
        <radialGradient id="aboutShine" cx="0.3" cy="0.3" r="0.6">
          <stop offset="0%" stopColor="#86efac" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="480" height="380" rx="24" fill="url(#aboutBg)" />

      <g transform="translate(240 200)">
        <circle r="135" fill="url(#aboutGlobe)" />
        <circle r="135" fill="url(#aboutShine)" />

        <g stroke="#22c55e" strokeWidth="1" fill="none" opacity="0.7">
          <ellipse rx="135" ry="40" />
          <ellipse rx="135" ry="80" />
          <ellipse rx="135" ry="120" />
          <ellipse rx="40" ry="135" />
          <ellipse rx="80" ry="135" />
          <ellipse rx="120" ry="135" />
        </g>

        <g fill="#86efac" opacity="0.95">
          <path d="M-90 -40 q20 -10 35 -5 q15 5 5 25 q-10 15 -30 12 q-20 -3 -10 -32z" />
          <path d="M-30 10 q25 -5 50 5 q15 10 5 30 q-15 15 -45 5 q-25 -10 -10 -40z" />
          <path d="M40 -55 q20 -5 35 10 q10 15 -5 25 q-20 5 -35 -10 q-15 -15 5 -25z" />
          <path d="M55 50 q15 0 25 12 q5 12 -8 22 q-15 8 -28 -8 q-10 -15 11 -26z" />
          <path d="M-95 60 q15 -2 25 8 q8 12 -8 22 q-18 6 -25 -10 q-5 -15 8 -20z" />
        </g>
      </g>

      {[
        { x: 105, y: 110, delay: 0 },
        { x: 360, y: 130, delay: 0.5 },
        { x: 100, y: 270, delay: 1 },
        { x: 380, y: 280, delay: 1.5 },
        { x: 240, y: 60, delay: 2 },
      ].map((pin) => (
        <g key={`${pin.x}-${pin.y}`} transform={`translate(${pin.x} ${pin.y})`}>
          <circle r="12" fill="#22c55e" opacity="0.25" />
          <circle r="6" fill="#22c55e" />
          <circle r="3" fill="#fff" />
        </g>
      ))}

      <g
        stroke="#15803d"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4 5"
        opacity="0.6"
      >
        <path d="M105 110 Q220 40 360 130" />
        <path d="M100 270 Q200 320 380 280" />
        <path d="M240 60 Q160 180 100 270" />
        <path d="M240 60 Q330 180 380 280" />
      </g>

      <g transform="translate(330 50)">
        <rect x="-30" y="-12" width="80" height="36" rx="18" fill="#0f1a14" />
        <text
          x="10"
          y="11"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontSize="11"
          fontWeight="700"
          fill="#bbf7d0"
          letterSpacing="0.15em"
        >
          12 LÄNDER
        </text>
      </g>

      <g transform="translate(70 320)">
        <rect x="-30" y="-12" width="100" height="36" rx="18" fill="#15803d" />
        <text
          x="20"
          y="11"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontSize="11"
          fontWeight="700"
          fill="#ffffff"
          letterSpacing="0.15em"
        >
          5 SPRACHEN
        </text>
      </g>
    </svg>
  );
}
