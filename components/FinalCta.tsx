import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { finalCta, ctaLabels, routes } from "@/lib/content";
import { FoerdercheckButton } from "@/components/FoerdercheckButton";

/** Dunkler Abschluss-CTA-Block (Navy, weiße Schrift, Akzent-Button). */
export function FinalCta({
  title = finalCta.title,
  text = finalCta.text,
  source = "final-cta",
}: {
  title?: string;
  text?: string;
  source?: string;
}) {
  return (
    <section className="section">
      <div className="container">
        <div className="relative overflow-hidden rounded-4xl blueprint-dark px-6 py-16 text-center shadow-navy-lift sm:rounded-5xl sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-teal-500/15 blur-3xl"
          />
          {/* Aufgehende Sonne am unteren Horizont – Signatur. */}
          <div
            aria-hidden="true"
            className="absolute -bottom-24 left-1/2 h-56 w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(242,180,65,0.30)_0%,rgba(242,180,65,0)_70%)]"
          />
          <div className="relative mx-auto max-w-2xl">
            <span className="eyebrow-light mx-auto w-fit">Fördercheck</span>
            <h2 className="mt-5 font-display text-display-sm font-bold tracking-tight text-white">
              {title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-300 sm:text-lg">{text}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <FoerdercheckButton source={source} variant="accentLight" size="lg" className="w-full sm:w-auto">
                {ctaLabels.foerdercheck}
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </FoerdercheckButton>
              <Link
                href={routes.kontakt}
                className="btn w-full border border-white/20 bg-transparent px-7 py-4 text-base text-white hover:bg-white/10 sm:w-auto"
              >
                {ctaLabels.contact}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
