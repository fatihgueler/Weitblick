import { cn } from "@/lib/utils";

/**
 * Signatur-Motiv „Weitblick": eine Blaupausen-Skyline am Horizont mit
 * aufgehender Sonne (Morgenlicht) und einem ansteigenden Sanierungs-Pfad
 * mit Meilensteinen. Visualisiert den langen Blick – vom Ist-Zustand bis
 * zum sanierten Gebäude. Dekorativ (aria-hidden).
 */
export function HorizonScene({ className }: { className?: string }) {
  // Meilensteine entlang des ansteigenden Pfads (links unten → rechts oben).
  const path = [
    { x: 60, y: 196 },
    { x: 196, y: 168 },
    { x: 332, y: 142 },
    { x: 470, y: 116 },
  ];
  const line = path.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ");

  return (
    <svg
      viewBox="0 0 640 240"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("h-auto w-full", className)}
      fill="none"
    >
      <defs>
        <linearGradient id="hs-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8d58a" />
          <stop offset="55%" stopColor="#f2b441" />
          <stop offset="100%" stopColor="#d98c1e" />
        </linearGradient>
        <radialGradient id="hs-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f4be54" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f4be54" stopOpacity="0" />
        </radialGradient>
        <clipPath id="hs-above">
          {/* Alles oberhalb der Horizontlinie (y < 200). */}
          <rect x="0" y="0" width="640" height="200" />
        </clipPath>
      </defs>

      {/* Morgenlicht-Schein hinter der Sonne. */}
      <circle cx="500" cy="196" r="120" fill="url(#hs-glow)" />

      {/* Aufgehende Sonne – nur oberhalb des Horizonts sichtbar. */}
      <g clipPath="url(#hs-above)" className="motion-safe:animate-sun-rise">
        <circle cx="500" cy="196" r="48" fill="url(#hs-sun)" />
        <g stroke="#f2b441" strokeWidth="2" strokeLinecap="round" opacity="0.7">
          <line x1="500" y1="118" x2="500" y2="134" />
          <line x1="444" y1="140" x2="455" y2="151" />
          <line x1="556" y1="140" x2="545" y2="151" />
          <line x1="418" y1="196" x2="434" y2="196" />
          <line x1="566" y1="196" x2="582" y2="196" />
        </g>
      </g>

      {/* Blaupausen-Skyline (Hairline-Gebäude) auf dem Horizont. */}
      <g
        stroke="#1f3666"
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity="0.55"
        clipPath="url(#hs-above)"
      >
        {/* Haus mit Satteldach + Solarmodul. */}
        <path d="M70 200 V150 L104 126 L138 150 V200" />
        <line x1="104" y1="126" x2="104" y2="200" />
        <path d="M88 150 L120 132 L130 140 L98 158 Z" fill="#13b095" fillOpacity="0.18" />
        {/* Mehrfamilienhaus mit Fensterraster. */}
        <rect x="176" y="120" width="78" height="80" rx="2" />
        <line x1="202" y1="120" x2="202" y2="200" />
        <line x1="228" y1="120" x2="228" y2="200" />
        <line x1="176" y1="146" x2="254" y2="146" />
        <line x1="176" y1="173" x2="254" y2="173" />
        {/* Schlankes Gebäude. */}
        <rect x="282" y="104" width="48" height="96" rx="2" />
        <line x1="282" y1="134" x2="330" y2="134" />
        <line x1="282" y1="166" x2="330" y2="166" />
        {/* Haus mit Wärmepumpe (kleiner Block). */}
        <path d="M356 200 V152 L386 130 L416 152 V200" />
        <rect x="420" y="180" width="20" height="20" rx="2" stroke="#13b095" />
        <line x1="424" y1="186" x2="436" y2="186" stroke="#13b095" />
        <line x1="424" y1="192" x2="436" y2="192" stroke="#13b095" />
      </g>

      {/* Ansteigender Sanierungs-Pfad (der „lange Blick"). */}
      <path
        d={line}
        stroke="#13b095"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="3 7"
        opacity="0.85"
      />
      {/* Meilenstein-Punkte. */}
      {path.map((p, i) => (
        <g key={p.x}>
          <circle cx={p.x} cy={p.y} r="6" fill="#f4f7fb" stroke="#0a8d79" strokeWidth="2" />
          {i === path.length - 1 && (
            <circle cx={p.x} cy={p.y} r="11" stroke="#f2b441" strokeWidth="1.5" opacity="0.8" />
          )}
        </g>
      ))}

      {/* Horizontlinie. */}
      <line
        x1="0"
        y1="200"
        x2="640"
        y2="200"
        stroke="#1f3666"
        strokeWidth="1.5"
        strokeDasharray="640"
        opacity="0.4"
        className="motion-safe:animate-horizon-draw"
      />
    </svg>
  );
}
