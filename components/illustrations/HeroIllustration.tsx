export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 520"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="heroSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="55%" stopColor="#ecfdf5" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id="heroGlass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0c12" />
          <stop offset="100%" stopColor="#171a23" />
        </linearGradient>
        <linearGradient id="heroGlassFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.65" />
          <stop offset="60%" stopColor="#10b981" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ecfdf5" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="heroAccent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <pattern id="heroWindows" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <rect width="24" height="24" fill="transparent" />
          <rect x="2" y="2" width="20" height="20" rx="2" fill="#ffffff" fillOpacity="0.06" />
          <rect x="2" y="2" width="20" height="20" rx="2" fill="none" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="0.5" />
        </pattern>
        <pattern id="heroGrid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="#0a0c12" strokeOpacity="0.05" strokeWidth="0.6" />
        </pattern>
        <radialGradient id="heroSun" cx="0.7" cy="0.2" r="0.6">
          <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="560" height="520" fill="url(#heroSky)" rx="28" />
      <rect width="560" height="520" fill="url(#heroGrid)" rx="28" />
      <rect width="560" height="520" fill="url(#heroSun)" rx="28" />

      {/* Background tower */}
      <g>
        <rect x="60" y="120" width="120" height="340" rx="6" fill="url(#heroGlass)" />
        <rect x="60" y="120" width="120" height="340" rx="6" fill="url(#heroWindows)" />
        <rect x="60" y="120" width="120" height="340" rx="6" fill="none" stroke="#0a0c12" strokeOpacity="0.15" />
        <rect x="100" y="100" width="40" height="22" fill="#171a23" />
        <rect x="115" y="80" width="10" height="22" fill="#0a0c12" />
        <circle cx="120" cy="78" r="3" fill="#10b981" className="animate-pulse-soft" />
      </g>

      {/* Far right tower */}
      <g>
        <rect x="430" y="170" width="90" height="290" rx="6" fill="url(#heroGlass)" />
        <rect x="430" y="170" width="90" height="290" rx="6" fill="url(#heroWindows)" />
        <rect x="430" y="170" width="90" height="290" rx="6" fill="none" stroke="#0a0c12" strokeOpacity="0.15" />
      </g>

      {/* Hero glass tower (center) */}
      <g>
        <rect x="210" y="60" width="200" height="400" rx="10" fill="url(#heroGlass)" />
        <rect x="210" y="60" width="200" height="400" rx="10" fill="url(#heroGlassFront)" />
        <rect x="210" y="60" width="200" height="400" rx="10" fill="url(#heroWindows)" />

        {/* Highlight stripe */}
        <rect x="218" y="68" width="80" height="384" rx="4" fill="#ffffff" fillOpacity="0.08" />

        {/* Top floors lit */}
        <g fill="#a7f3d0" opacity="0.85">
          <rect x="218" y="76" width="36" height="20" rx="2" />
          <rect x="258" y="76" width="36" height="20" rx="2" />
          <rect x="298" y="76" width="36" height="20" rx="2" />
          <rect x="338" y="76" width="36" height="20" rx="2" />
        </g>
        <g fill="#3b82f6" opacity="0.45">
          <rect x="218" y="200" width="36" height="20" rx="2" />
          <rect x="338" y="248" width="36" height="20" rx="2" />
          <rect x="298" y="320" width="36" height="20" rx="2" />
        </g>

        <rect x="210" y="60" width="200" height="400" rx="10" fill="none" stroke="#0a0c12" strokeOpacity="0.18" />

        {/* Roof structure */}
        <rect x="240" y="46" width="140" height="14" rx="2" fill="#171a23" />
        <rect x="295" y="32" width="30" height="16" fill="#0a0c12" />
        <circle cx="310" cy="30" r="3" fill="#10b981" />

        {/* PV panels on top */}
        <g transform="translate(248 50)">
          <rect width="24" height="10" rx="1" fill="#1d4ed8" stroke="#0a0c12" strokeOpacity="0.4" strokeWidth="0.5" />
        </g>
        <g transform="translate(280 50)">
          <rect width="24" height="10" rx="1" fill="#1d4ed8" stroke="#0a0c12" strokeOpacity="0.4" strokeWidth="0.5" />
        </g>
        <g transform="translate(348 50)">
          <rect width="24" height="10" rx="1" fill="#1d4ed8" stroke="#0a0c12" strokeOpacity="0.4" strokeWidth="0.5" />
        </g>
      </g>

      {/* Ground line */}
      <g>
        <rect x="0" y="460" width="560" height="60" fill="#f6f7f9" />
        <line x1="0" y1="460" x2="560" y2="460" stroke="#0a0c12" strokeOpacity="0.08" />
      </g>

      {/* Trees */}
      <g transform="translate(46 430)" opacity="0.95">
        <rect x="6" y="22" width="3" height="18" fill="#171a23" />
        <circle cx="7.5" cy="20" r="14" fill="url(#heroAccent)" opacity="0.85" />
      </g>
      <g transform="translate(380 432)" opacity="0.9">
        <rect x="6" y="22" width="3" height="18" fill="#171a23" />
        <circle cx="7.5" cy="20" r="12" fill="#10b981" opacity="0.8" />
      </g>

      {/* Floating data card 1 - efficiency */}
      <g transform="translate(28 96)" className="animate-fade-in">
        <rect width="170" height="74" rx="14" fill="#ffffff" stroke="#0a0c12" strokeOpacity="0.06" />
        <circle cx="20" cy="20" r="6" fill="#10b981" />
        <circle cx="20" cy="20" r="11" fill="#10b981" fillOpacity="0.18" />
        <text x="36" y="20" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" letterSpacing="0.18em" fill="#262b38">
          EFFICIENCY
        </text>
        <text x="36" y="34" fontFamily="Inter, sans-serif" fontSize="9" fill="#717a8e">
          Live · 14:02
        </text>
        {/* Sparkline */}
        <polyline
          points="14,60 30,55 46,58 62,48 78,52 94,40 110,46 126,32 142,40 158,28"
          fill="none"
          stroke="url(#heroAccent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Floating data card 2 - kWh */}
      <g transform="translate(360 350)">
        <rect width="180" height="100" rx="16" fill="#0a0c12" />
        <text x="16" y="22" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" letterSpacing="0.18em" fill="#a7f3d0">
          CONSUMPTION
        </text>
        <text x="16" y="58" fontFamily="Inter, sans-serif" fontSize="30" fontWeight="800" fill="#ffffff">
          42<tspan fontSize="14" fill="#a7f3d0"> kWh/m²·a</tspan>
        </text>
        <text x="16" y="76" fontFamily="Inter, sans-serif" fontSize="9" fill="#a7f3d0">
          ▼ 38% YoY
        </text>
        {/* Bars */}
        <g transform="translate(110 70)">
          <rect x="0" y="-22" width="6" height="22" rx="2" fill="#3b82f6" opacity="0.7" />
          <rect x="10" y="-12" width="6" height="12" rx="2" fill="#3b82f6" opacity="0.7" />
          <rect x="20" y="-26" width="6" height="26" rx="2" fill="#10b981" />
          <rect x="30" y="-16" width="6" height="16" rx="2" fill="#10b981" />
          <rect x="40" y="-30" width="6" height="30" rx="2" fill="#10b981" />
          <rect x="50" y="-20" width="6" height="20" rx="2" fill="#10b981" />
        </g>
      </g>

      {/* Floating sensor pin */}
      <g transform="translate(305 200)">
        <circle r="14" fill="#10b981" fillOpacity="0.18" />
        <circle r="14" fill="none" stroke="#10b981" strokeOpacity="0.4" />
        <circle r="6" fill="#ffffff" stroke="#10b981" strokeWidth="1.5" />
        <circle r="2.5" fill="#10b981" />
      </g>
      <g transform="translate(360 290)">
        <circle r="11" fill="#3b82f6" fillOpacity="0.18" />
        <circle r="5" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.5" />
        <circle r="2" fill="#3b82f6" />
      </g>

      {/* Connection lines */}
      <g stroke="#10b981" strokeWidth="1" fill="none" strokeDasharray="3 4" opacity="0.55">
        <path d="M198 132 Q260 175 305 200" />
        <path d="M305 200 Q330 245 360 290" />
        <path d="M360 290 Q380 320 360 350" />
      </g>
    </svg>
  );
}
