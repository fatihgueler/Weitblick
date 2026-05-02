export function ContactIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 360"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="contactBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#dcfce7" />
          <stop offset="100%" stopColor="#f0fdf4" />
        </linearGradient>
        <linearGradient id="contactPlane" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="contactLeaf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>

      <rect width="480" height="360" rx="24" fill="url(#contactBg)" />

      <g
        stroke="#15803d"
        strokeWidth="2"
        fill="none"
        strokeDasharray="4 6"
        opacity="0.55"
        strokeLinecap="round"
      >
        <path d="M40 280 Q160 180 240 200 T440 100" />
      </g>

      <g transform="translate(280 110)">
        <path
          d="M0 0 L160 60 L60 70 L40 130 Z"
          fill="url(#contactPlane)"
        />
        <path d="M60 70 L100 30 L160 60 Z" fill="#0f1a14" opacity="0.35" />
        <path d="M40 130 L60 70" stroke="#0f1a14" strokeOpacity="0.25" strokeWidth="1" fill="none" />
      </g>

      <g transform="translate(40 240)">
        <ellipse cx="40" cy="20" rx="36" ry="8" fill="#15803d" opacity="0.2" />
        <path
          d="M0 18C0 -6 24 -22 50 -10C66 -2 80 -10 80 8C80 22 60 30 40 26C20 30 0 28 0 18z"
          fill="url(#contactLeaf)"
        />
        <path d="M8 18 Q40 0 76 8" stroke="#15803d" strokeWidth="1" fill="none" />
      </g>

      <g transform="translate(360 250)" opacity="0.95">
        <circle r="22" fill="#22c55e" />
        <path
          d="M-10 -4l8 8l14 -14"
          stroke="#fff"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <g transform="translate(95 80)">
        <rect width="160" height="100" rx="14" fill="#fff" stroke="#bbf7d0" />
        <rect x="14" y="20" width="80" height="6" rx="3" fill="#bbf7d0" />
        <rect x="14" y="36" width="120" height="6" rx="3" fill="#dcfce7" />
        <rect x="14" y="52" width="100" height="6" rx="3" fill="#dcfce7" />
        <rect x="14" y="68" width="60" height="6" rx="3" fill="#dcfce7" />
        <circle cx="140" cy="74" r="14" fill="#15803d" />
        <path
          d="M134 74l4 4l8 -8"
          stroke="#fff"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <g fill="#22c55e" opacity="0.5">
        <circle cx="60" cy="60" r="3" />
        <circle cx="420" cy="80" r="3" />
        <circle cx="450" cy="220" r="4" />
        <circle cx="200" cy="300" r="3" />
      </g>
    </svg>
  );
}
