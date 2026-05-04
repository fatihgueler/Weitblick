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
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#ecfdf5" />
        </linearGradient>
        <linearGradient id="aboutCard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0c12" />
          <stop offset="100%" stopColor="#171a23" />
        </linearGradient>
        <linearGradient id="aboutAccent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <pattern id="aboutGrid" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M22 0H0V22" fill="none" stroke="#0a0c12" strokeOpacity="0.04" strokeWidth="0.6" />
        </pattern>
      </defs>

      <rect width="480" height="380" rx="24" fill="url(#aboutBg)" />
      <rect width="480" height="380" rx="24" fill="url(#aboutGrid)" />

      {/* Dashboard card */}
      <g transform="translate(60 60)">
        <rect width="360" height="260" rx="20" fill="url(#aboutCard)" />
        <rect width="360" height="260" rx="20" fill="none" stroke="#ffffff" strokeOpacity="0.08" />

        <g transform="translate(20 20)">
          <circle cx="6" cy="6" r="5" fill="#10b981" />
          <text x="20" y="10" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" letterSpacing="0.2em" fill="#a7f3d0">
            ENOX OS · LIVE
          </text>
          <text x="280" y="10" fontFamily="Inter, sans-serif" fontSize="9" fill="#a7f3d0" opacity="0.6">
            14:02 CET
          </text>
        </g>

        {/* KPI tiles */}
        <g transform="translate(20 44)">
          <rect width="100" height="62" rx="12" fill="#ffffff" fillOpacity="0.06" stroke="#ffffff" strokeOpacity="0.08" />
          <text x="12" y="20" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="700" fill="#a7f3d0" letterSpacing="0.18em">CO₂</text>
          <text x="12" y="44" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="800" fill="#ffffff">−68%</text>
          <text x="12" y="56" fontFamily="Inter, sans-serif" fontSize="8" fill="#10b981">▼ 24m</text>
        </g>
        <g transform="translate(130 44)">
          <rect width="100" height="62" rx="12" fill="#ffffff" fillOpacity="0.06" stroke="#ffffff" strokeOpacity="0.08" />
          <text x="12" y="20" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="700" fill="#a7f3d0" letterSpacing="0.18em">COSTS</text>
          <text x="12" y="44" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="800" fill="#ffffff">−42%</text>
          <text x="12" y="56" fontFamily="Inter, sans-serif" fontSize="8" fill="#10b981">▼ YoY</text>
        </g>
        <g transform="translate(240 44)">
          <rect width="100" height="62" rx="12" fill="#ffffff" fillOpacity="0.06" stroke="#ffffff" strokeOpacity="0.08" />
          <text x="12" y="20" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="700" fill="#bfdbfe" letterSpacing="0.18em">PAYBACK</text>
          <text x="12" y="44" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="800" fill="#ffffff">5.8y</text>
          <text x="12" y="56" fontFamily="Inter, sans-serif" fontSize="8" fill="#3b82f6">incl. grant</text>
        </g>

        {/* Chart */}
        <g transform="translate(20 124)">
          <rect width="320" height="116" rx="12" fill="#ffffff" fillOpacity="0.04" stroke="#ffffff" strokeOpacity="0.06" />
          <text x="14" y="18" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="700" letterSpacing="0.18em" fill="#a7f3d0">
            ENERGY · KWH/DAY
          </text>
          <g stroke="#ffffff" strokeOpacity="0.06" strokeWidth="0.6">
            <line x1="14" y1="34" x2="306" y2="34" />
            <line x1="14" y1="58" x2="306" y2="58" />
            <line x1="14" y1="82" x2="306" y2="82" />
          </g>
          <path
            d="M16,70 C40,68 54,80 80,72 C112,62 128,82 156,74 C188,64 206,52 232,48 C260,44 282,38 304,34"
            fill="none"
            stroke="url(#aboutAccent)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M16,70 C40,68 54,80 80,72 C112,62 128,82 156,74 C188,64 206,52 232,48 C260,44 282,38 304,34 L304,100 L16,100 Z"
            fill="url(#aboutAccent)"
            fillOpacity="0.18"
          />
          <circle cx="304" cy="34" r="4" fill="#10b981" />
          <circle cx="304" cy="34" r="9" fill="#10b981" fillOpacity="0.18" />
        </g>
      </g>

      {/* Floating chip top right */}
      <g transform="translate(330 32)">
        <rect width="120" height="36" rx="18" fill="#ffffff" stroke="#0a0c12" strokeOpacity="0.06" />
        <circle cx="18" cy="18" r="5" fill="#10b981" />
        <text x="32" y="22" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" fill="#0a0c12">
          Optimised
        </text>
      </g>

      {/* Floating chip bottom left */}
      <g transform="translate(34 320)">
        <rect width="160" height="40" rx="20" fill="#0a0c12" />
        <circle cx="22" cy="20" r="6" fill="#3b82f6" />
        <text x="36" y="24" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" fill="#ffffff">
          IoT · 1,240 sensors
        </text>
      </g>
    </svg>
  );
}
