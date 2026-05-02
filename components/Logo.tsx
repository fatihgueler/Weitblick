export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="enoxGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#enoxGrad)" />
      <path
        d="M11 26V14h7v2.4h-4.6v2.4h4.2V21h-4.2v2.6H18V26z"
        fill="#fff"
      />
      <path
        d="M22 26v-12h2.2l4.6 7.5V14H31v12h-2.2l-4.6-7.5V26z"
        fill="#fff"
      />
    </svg>
  );
}
