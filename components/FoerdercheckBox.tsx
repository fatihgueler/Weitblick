import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { hero, ctaLabels } from "@/lib/content";
import { FoerdercheckButton } from "@/components/FoerdercheckButton";

/**
 * Fördercheck-„Terminal" – dunkles Navy-Panel mit Horizont-/Sonnen-Motiv.
 * Konversions-Anker im Hero: Signatur + klarer Einstieg in den Fördercheck.
 */
export function FoerdercheckBox({
  className,
  source = "hero-box",
}: {
  className?: string;
  source?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 p-6 shadow-navy-lift blueprint-dark sm:p-7",
        className,
      )}
    >
      {/* Morgenlicht in der Ecke. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(242,180,65,0.30)_0%,rgba(242,180,65,0)_70%)]"
      />

      <div className="relative">
        {/* Mini-Horizont mit aufgehender Sonne. */}
        <div className="flex items-center justify-between">
          <span className="eyebrow-light">{hero.box.title}</span>
          <svg viewBox="0 0 48 24" aria-hidden="true" className="h-6 w-12" fill="none">
            <line x1="0" y1="18" x2="48" y2="18" stroke="#63e4c8" strokeWidth="1.5" opacity="0.5" />
            <circle cx="24" cy="18" r="7" fill="#f2b441" />
            <path d="M24 18a7 7 0 0 1 7-7" stroke="#0a1326" strokeWidth="0" />
          </svg>
        </div>

        <p className="mt-4 text-[15px] leading-relaxed text-ink-200">{hero.box.text}</p>

        <ol className="mt-6 space-y-3.5">
          {hero.box.steps.map((step, i) => (
            <li key={step} className="flex items-center gap-3.5">
              <span className="index-tag w-6 shrink-0 text-teal-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400/70" aria-hidden="true" />
              <span className="text-[15px] font-medium text-white">{step}</span>
            </li>
          ))}
        </ol>

        <FoerdercheckButton
          source={source}
          size="block"
          variant="accentLight"
          className="mt-7"
        >
          {ctaLabels.foerdercheckBox}
          <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
        </FoerdercheckButton>

        <p className="mt-3 text-center font-mono text-[11px] tracking-wide text-ink-400">
          ca. 2 Min · Antwort i. d. R. in 24 h · kostenlos
        </p>
      </div>
    </div>
  );
}
