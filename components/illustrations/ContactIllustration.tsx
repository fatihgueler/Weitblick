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
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#ecfdf5" />
        </linearGradient>
        <linearGradient id="contactAccent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      <rect width="480" height="360" rx="24" fill="url(#contactBg)" />

      {/* Form mock */}
      <g transform="translate(72 56)">
        <rect width="240" height="240" rx="20" fill="#ffffff" stroke="#0a0c12" strokeOpacity="0.06" />
        <text x="20" y="34" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="800" fill="#0a0c12">
          Erstberatung
        </text>
        <text x="20" y="50" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" fill="#717a8e" letterSpacing="0.16em">
          IN 2 MIN ZUM ERGEBNIS
        </text>

        <g transform="translate(20 70)">
          <rect width="200" height="32" rx="10" fill="#f6f7f9" />
          <rect x="14" y="12" width="80" height="8" rx="4" fill="#a7afbe" />
        </g>
        <g transform="translate(20 110)">
          <rect width="200" height="32" rx="10" fill="#f6f7f9" />
          <rect x="14" y="12" width="120" height="8" rx="4" fill="#a7afbe" />
        </g>
        <g transform="translate(20 150)">
          <rect width="200" height="50" rx="10" fill="#f6f7f9" />
          <rect x="14" y="12" width="100" height="6" rx="3" fill="#d4d8e0" />
          <rect x="14" y="24" width="160" height="6" rx="3" fill="#d4d8e0" />
          <rect x="14" y="36" width="80" height="6" rx="3" fill="#d4d8e0" />
        </g>

        <g transform="translate(20 210)">
          <rect width="200" height="34" rx="17" fill="#0a0c12" />
          <text x="100" y="22" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" fill="#ffffff" textAnchor="middle">
            Anfrage senden →
          </text>
        </g>
      </g>

      {/* Confirmation card */}
      <g transform="translate(290 60)">
        <rect width="158" height="92" rx="16" fill="#0a0c12" />
        <circle cx="22" cy="22" r="12" fill="#10b981" />
        <path d="M16 22l4 4 8 -8" stroke="#ffffff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(0 0)" />
        <text x="44" y="20" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" fill="#a7f3d0" letterSpacing="0.16em">
          BESTÄTIGT
        </text>
        <text x="44" y="34" fontFamily="Inter, sans-serif" fontSize="9" fill="#ffffff" opacity="0.7">
          Antwort &lt; 24 h
        </text>
        <rect x="14" y="50" width="130" height="6" rx="3" fill="#ffffff" fillOpacity="0.18" />
        <rect x="14" y="62" width="100" height="6" rx="3" fill="#ffffff" fillOpacity="0.12" />
        <rect x="14" y="74" width="120" height="6" rx="3" fill="#ffffff" fillOpacity="0.18" />
      </g>

      {/* Connection line */}
      <g stroke="url(#contactAccent)" strokeWidth="1.5" fill="none" strokeDasharray="3 5" opacity="0.7">
        <path d="M315 110 Q345 96 360 152" />
      </g>

      {/* Mini analyse card */}
      <g transform="translate(290 180)">
        <rect width="158" height="118" rx="16" fill="#ffffff" stroke="#0a0c12" strokeOpacity="0.06" />
        <text x="14" y="22" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" letterSpacing="0.18em" fill="#717a8e">
          ANALYSE
        </text>
        <text x="14" y="46" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="800" fill="#0a0c12">
          −38%
        </text>
        <text x="14" y="62" fontFamily="Inter, sans-serif" fontSize="9" fill="#10b981">
          Energiebedarf · Schätzung
        </text>
        <polyline
          points="14,98 30,90 46,94 62,82 78,86 94,72 110,78 126,60 142,68"
          fill="none"
          stroke="url(#contactAccent)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* Floating accents */}
      <g fill="#3b82f6" opacity="0.35">
        <circle cx="36" cy="40" r="3" />
        <circle cx="44" cy="320" r="4" />
        <circle cx="450" cy="40" r="3" />
        <circle cx="448" cy="316" r="4" />
      </g>
    </svg>
  );
}
