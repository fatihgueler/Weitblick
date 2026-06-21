import type { Metadata } from "next";
import { Funnel } from "@/components/foerdercheck/Funnel";

export const metadata: Metadata = {
  title: "Kostenloser Fördercheck",
  description:
    "Prüfen Sie in wenigen Schritten, welche nächsten Schritte und Fördermöglichkeiten für Ihr Wohngebäude sinnvoll sind. Kostenlos und unverbindlich.",
  alternates: { canonical: "/foerdercheck" },
};

export default function FoerdercheckPage() {
  return (
    <section className="soft-blue">
      <div className="container py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-2xl">
          <Funnel variant="page" />
        </div>
      </div>
    </section>
  );
}
