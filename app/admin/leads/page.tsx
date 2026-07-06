import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default function AdminLeadsPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-display text-2xl font-bold text-navy-900">Lead-Export</h1>
      <p className="mt-2 text-[15px] text-ink-600">
        Exportiert die gespeicherten Leads aus Kontaktformular und Fördercheck als PDF.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <a href="/api/admin/leads/pdf?range=7">Letzte 7 Tage (PDF exportieren)</a>
        </Button>
        <Button asChild variant="secondary">
          <a href="/api/admin/leads/pdf?range=30">Letzte 30 Tage</a>
        </Button>
        <Button asChild variant="ghost">
          <a href="/api/admin/leads/pdf">Alle Leads</a>
        </Button>
      </div>
    </main>
  );
}
