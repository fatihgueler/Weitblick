type LogoProps = {
  className?: string;
  variant?: "mark" | "wordmark";
};

export function Logo({ className, variant = "mark" }: LogoProps) {
  if (variant === "wordmark") {
    return (
      <svg
        viewBox="0 0 240 56"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="EnOX"
        className={className}
      >
        <defs>
          <linearGradient id="enoxMarkGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="enoxPulse" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a7f3d0" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <Mark x={0} y={0} size={56} />
        <g transform="translate(70 0)">
          <text
            x="0"
            y="36"
            fontFamily="Inter, system-ui, sans-serif"
            fontWeight="800"
            fontSize="32"
            letterSpacing="-0.02em"
            fill="#0a0c12"
          >
            En<tspan fill="url(#enoxMarkGrad)">O</tspan>X
          </text>
          <text
            x="2"
            y="50"
            fontFamily="Inter, system-ui, sans-serif"
            fontWeight="600"
            fontSize="9"
            letterSpacing="0.32em"
            fill="#3b82f6"
          >
            ENERGY · SMART BUILDING
          </text>
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 56 56"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="EnOX"
      className={className}
    >
      <defs>
        <linearGradient id="enoxMarkGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="enoxPulse" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a7f3d0" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <Mark x={0} y={0} size={56} />
    </svg>
  );
}

function Mark({ x, y, size }: { x: number; y: number; size: number }) {
  const s = size / 56;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect
        x="3"
        y="3"
        width="50"
        height="50"
        rx="14"
        fill="url(#enoxMarkGrad)"
      />
      <rect
        x="3"
        y="3"
        width="50"
        height="50"
        rx="14"
        fill="none"
        stroke="#0a0c12"
        strokeOpacity="0.1"
      />
      <g stroke="#ffffff" strokeOpacity="0.25" strokeWidth="0.8" fill="none">
        <line x1="3" y1="18" x2="53" y2="18" />
        <line x1="3" y1="38" x2="53" y2="38" />
        <line x1="18" y1="3" x2="18" y2="53" />
        <line x1="38" y1="3" x2="38" y2="53" />
      </g>
      <path
        d="M16 36V20h12v3h-9v3.5h8v3h-8V33h9v3h-12z"
        fill="#ffffff"
      />
      <path
        d="M30 36V20h3l7 9.5V20h3v16h-3l-7-9.5V36h-3z"
        fill="#ffffff"
        opacity="0.55"
      />
      <circle cx="42" cy="42" r="6" fill="#ffffff" />
      <circle cx="42" cy="42" r="3" fill="url(#enoxPulse)" />
    </g>
  );
}
