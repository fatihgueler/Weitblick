import Link from "next/link";
import { Check } from "lucide-react";
import { hero, ctaLabels, routes } from "@/lib/content";
import { FoerdercheckButton } from "@/components/FoerdercheckButton";
import { FoerdercheckBox } from "@/components/FoerdercheckBox";

export default function HomePage() {
  return (
    <>
      {/* 2 · Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10 hero-glow" />
        <div className="container grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-24">
          <div className="animate-fade-up">
            <span className="eyebrow">{hero.eyebrow}</span>
            <h1 className="mt-5 heading-1">{hero.title}</h1>
            <p className="mt-5 lead max-w-xl">{hero.subtitle}</p>

            <ul className="mt-7 flex flex-col gap-2.5">
              {hero.benefits.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-[15px] font-medium text-navy-900">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <FoerdercheckButton source="hero" size="lg" className="w-full sm:w-auto">
                {ctaLabels.foerdercheck}
              </FoerdercheckButton>
              <Link href={routes.kontakt} className="btn-secondary w-full px-7 py-4 text-base sm:w-auto">
                {ctaLabels.consultation}
              </Link>
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:120ms]">
            <FoerdercheckBox source="hero-box" />
          </div>
        </div>
      </section>
    </>
  );
}
