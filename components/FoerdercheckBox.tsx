import { ClipboardCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { hero, ctaLabels } from "@/lib/content";
import { FoerdercheckButton } from "@/components/FoerdercheckButton";

/** Fördercheck-Vorschau-Box (Hero + Fördercheck-Sektion). */
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
        "rounded-3xl border border-navy-900/8 bg-white p-6 shadow-lift sm:p-7",
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
          <ClipboardCheck className="h-5 w-5" strokeWidth={2} />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-700">
          {hero.box.title}
        </span>
      </div>

      <p className="mt-4 text-[15px] leading-relaxed text-ink-600">{hero.box.text}</p>

      <ol className="mt-5 space-y-2.5">
        {hero.box.steps.map((step, i) => (
          <li key={step} className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-50 text-[13px] font-bold text-navy-800">
              {i + 1}
            </span>
            <span className="text-[15px] font-medium text-navy-900">{step}</span>
          </li>
        ))}
      </ol>

      <FoerdercheckButton source={source} size="block" className="mt-6">
        {ctaLabels.foerdercheckBox}
        <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
      </FoerdercheckButton>
    </div>
  );
}
