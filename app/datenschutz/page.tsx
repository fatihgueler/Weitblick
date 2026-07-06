import type { Metadata } from "next";
import { datenschutz } from "@/lib/content";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung von Weitblick Energieberatung.",
  alternates: { canonical: "/datenschutz" },
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <>
      <PageHero title={datenschutz.title} />
      <section className="section bg-white">
        <div className="container max-w-3xl">
          <div className="flex flex-col gap-8">
            {datenschutz.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-lg font-bold text-navy-900">{s.heading}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
