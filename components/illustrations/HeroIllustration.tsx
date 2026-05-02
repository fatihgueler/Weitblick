export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 460"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="heroSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dcfce7" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id="heroBuilding" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0fdf4" />
          <stop offset="100%" stopColor="#dcfce7" />
        </linearGradient>
        <linearGradient id="heroBuilding2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="heroLeaf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
        <linearGradient id="heroSun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
        <pattern id="heroPanel" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill="#0f1a14" />
          <rect x="1" y="1" width="12" height="12" fill="#1c2a22" />
          <line x1="7" y1="1" x2="7" y2="13" stroke="#0f1a14" strokeWidth="0.6" />
          <line x1="1" y1="7" x2="13" y2="7" stroke="#0f1a14" strokeWidth="0.6" />
        </pattern>
      </defs>

      <rect width="520" height="460" fill="url(#heroSky)" rx="24" />

      <circle cx="120" cy="110" r="60" fill="url(#heroSun)" opacity="0.85" />
      <g stroke="#22c55e" strokeWidth="2" strokeLinecap="round" opacity="0.4">
        <line x1="120" y1="20" x2="120" y2="40" />
        <line x1="120" y1="180" x2="120" y2="200" />
        <line x1="30" y1="110" x2="50" y2="110" />
        <line x1="190" y1="110" x2="210" y2="110" />
        <line x1="55" y1="45" x2="70" y2="60" />
        <line x1="170" y1="160" x2="185" y2="175" />
        <line x1="55" y1="175" x2="70" y2="160" />
        <line x1="170" y1="60" x2="185" y2="45" />
      </g>

      <g>
        <rect x="280" y="120" width="120" height="280" rx="6" fill="url(#heroBuilding2)" />
        <g fill="#ffffff" opacity="0.9">
          {Array.from({ length: 9 }).map((_, row) =>
            Array.from({ length: 4 }).map((__, col) => (
              <rect
                key={`a-${row}-${col}`}
                x={290 + col * 26}
                y={140 + row * 28}
                width="18"
                height="18"
                rx="2"
                opacity={(row + col) % 3 === 0 ? 0.9 : 0.45}
              />
            )),
          )}
        </g>
        <rect x="304" y="100" width="20" height="22" fill="#15803d" />
        <circle cx="314" cy="92" r="6" fill="#22c55e" />
      </g>

      <g>
        <rect x="160" y="200" width="100" height="200" rx="6" fill="url(#heroBuilding)" stroke="#bbf7d0" />
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 3 }).map((__, col) => (
            <rect
              key={`b-${row}-${col}`}
              x={172 + col * 26}
              y={216 + row * 28}
              width="18"
              height="18"
              rx="2"
              fill="#bbf7d0"
              opacity={(row + col) % 2 === 0 ? 0.9 : 0.5}
            />
          )),
        )}
        <rect x="160" y="195" width="100" height="10" rx="2" fill="url(#heroPanel)" opacity="0.85" />
      </g>

      <g>
        <rect x="400" y="240" width="80" height="160" rx="6" fill="url(#heroBuilding)" stroke="#bbf7d0" />
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 2 }).map((__, col) => (
            <rect
              key={`c-${row}-${col}`}
              x={412 + col * 28}
              y={256 + row * 28}
              width="20"
              height="18"
              rx="2"
              fill="#dcfce7"
            />
          )),
        )}
      </g>

      <g>
        <rect x="40" y="320" width="100" height="80" rx="6" fill="url(#heroBuilding)" stroke="#bbf7d0" />
        <rect x="40" y="316" width="100" height="8" rx="2" fill="url(#heroPanel)" />
        <rect x="60" y="350" width="20" height="50" fill="#15803d" />
        <rect x="100" y="350" width="20" height="50" fill="#22c55e" opacity="0.8" />
      </g>

      <g transform="translate(-10 380)">
        <path d="M0 30C80 18 160 36 240 24C320 12 400 30 540 22V60H0Z" fill="#15803d" />
      </g>

      <g transform="translate(60 230)" opacity="0.95">
        <path
          d="M0 30C0 12 14 0 30 0C30 16 16 30 0 30Z"
          fill="url(#heroLeaf)"
        />
        <path d="M0 30C8 18 18 8 30 0" stroke="#15803d" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>

      <g transform="translate(380 60)" opacity="0.85">
        <circle cx="20" cy="20" r="20" fill="#bbf7d0" />
        <path
          d="M10 26c0-9 7-16 16-16c0 9-7 16-16 16z"
          fill="#16a34a"
        />
      </g>

      <g stroke="#15803d" strokeWidth="1.5" fill="none" opacity="0.4">
        <path d="M40 200 Q120 180 200 200" strokeDasharray="4 6" />
        <path d="M260 90 Q330 70 410 90" strokeDasharray="4 6" />
      </g>
    </svg>
  );
}
