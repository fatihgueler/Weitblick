import type { Metadata } from "next";
import { Info } from "lucide-react";
import { impressum, legalNote } from "@/lib/content";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von Weitblick Energieberatung.",
  alternates: { canonical: "/impressum" },
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <>
      <PageHero title={impressum.title} />
      <section className="section bg-white">
        <div className="container max-w-3xl">
          <div className="flex items-start gap-3 rounded-2xl border border-amber-300/50 bg-amber-50 px-5 py-4 text-sm text-amber-900">
            <Info className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2} />
            <p>{legalNote}</p>
          </div>

          <div className="mt-10 flex flex-col gap-8">
            {impressum.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-lg font-bold text-navy-900">{s.heading}</h2>
                <div className="mt-2 flex flex-col gap-1 text-[15px] leading-relaxed text-ink-600">
                  {s.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
