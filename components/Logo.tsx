type LogoProps = {
  className?: string;
  variant?: "mark" | "wordmark";
};

export function Logo({ className, variant = "mark" }: LogoProps) {
  if (variant === "wordmark") {
    return (
      <svg
        viewBox="0 0 220 56"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="ENOX"
        className={className}
      >
        <defs>
          <linearGradient id="enoxMarkGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
          <linearGradient id="enoxLeafGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bbf7d0" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        <Mark x={0} y={0} size={56} />
        <g transform="translate(70 0)" fill="#0f1a14">
          <text
            x="0"
            y="36"
            fontFamily="Inter, system-ui, sans-serif"
            fontWeight="800"
            fontSize="32"
            letterSpacing="0.04em"
          >
            ENOX
          </text>
          <text
            x="2"
            y="50"
            fontFamily="Inter, system-ui, sans-serif"
            fontWeight="600"
            fontSize="9"
            letterSpacing="0.32em"
            fill="#15803d"
          >
            ENERGY CONSULTING
          </text>
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 56 56"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ENOX"
      className={className}
    >
      <defs>
        <linearGradient id="enoxMarkGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="enoxLeafGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bbf7d0" />
          <stop offset="100%" stopColor="#22c55e" />
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
      <path
        d="M28 2L52 16v24L28 54L4 40V16L28 2Z"
        fill="url(#enoxMarkGrad)"
      />
      <path
        d="M28 2L52 16v24L28 54L4 40V16L28 2Z"
        fill="none"
        stroke="#0f1a14"
        strokeOpacity="0.08"
      />
      <path
        d="M37 36c-5 5-12 5-17 1-4-3-5-9-3-14 4 0 9 1 12 4 4 3 6 6 8 9z"
        fill="url(#enoxLeafGrad)"
        opacity="0.95"
      />
      <path
        d="M19 38c4-7 10-12 18-13"
        fill="none"
        stroke="#0f1a14"
        strokeOpacity="0.35"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M16 18h16v3.5h-11v4.2h10v3.4h-10v4.4h11.5V37H16z"
        fill="#ffffff"
      />
    </g>
  );
}
