import { cn } from "@/lib/utils";
import { site } from "@/lib/content";

type LogoProps = {
  className?: string;
  /** "full" = Marke + Schriftzug, "mark" = nur Bildmarke. */
  variant?: "full" | "mark";
  /** Helle Variante für dunkle Flächen (Footer). */
  tone?: "dark" | "light";
};

/**
 * Wort-/Bildmarke „Weitblick Energieberatung".
 * Bildmarke: Horizont mit aufgehender Sonne (Weitblick + Energie) – Navy + Türkis.
 */
export function Logo({ className, variant = "full", tone = "dark" }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Mark />
      {variant === "full" && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[1.05rem] font-extrabold tracking-tight",
              tone === "dark" ? "text-navy-900" : "text-white",
            )}
          >
            Weitblick
          </span>
          <span
            className={cn(
              "font-mono text-[0.6rem] font-medium uppercase tracking-[0.22em]",
              tone === "dark" ? "text-teal-700" : "text-teal-300",
            )}
          >
            Energieberatung
          </span>
        </span>
      )}
    </span>
  );
}

function Mark() {
  return (
    <svg
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-9 w-9 shrink-0"
    >
      <defs>
        <linearGradient id="wbTile" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1f3666" />
          <stop offset="100%" stopColor="#121f3a" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="40" height="40" rx="11" fill="url(#wbTile)" />
      {/* Strahlen der aufgehenden Sonne. */}
      <g stroke="#f2b441" strokeWidth="1.8" strokeLinecap="round">
        <line x1="20" y1="8.5" x2="20" y2="12" />
        <line x1="11.5" y1="11.5" x2="13.8" y2="13.8" />
        <line x1="28.5" y1="11.5" x2="26.2" y2="13.8" />
      </g>
      {/* Halbe Sonne, die über dem Horizont aufgeht (Energie / Morgenlicht). */}
      <path d="M12.5 25a7.5 7.5 0 0 1 15 0Z" fill="#f2b441" />
      {/* Horizont (Weitblick / der lange Blick). */}
      <path d="M8 25h24" stroke="#63e4c8" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M12 29.5h16"
        stroke="#63e4c8"
        strokeOpacity="0.5"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
