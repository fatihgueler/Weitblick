import { Button } from "@/components/ui/button";
import { LeadsExplorer } from "@/components/admin/LeadsExplorer";
import { getFoerdercheckLeads } from "@/lib/leads";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const RANGES = [
  { label: "Letzte 7 Tage", value: "7" },
  { label: "Letzte 30 Tage", value: "30" },
  { label: "Alle Leads", value: undefined },
] as const;

type SearchParams = { range?: string };

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { range } = await searchParams;
  const rangeDays = range && /^\d+$/.test(range) ? Number(range) : null;

  let leads: Awaited<ReturnType<typeof getFoerdercheckLeads>> = [];
  let loadError = false;
  try {
    leads = await getFoerdercheckLeads(
      rangeDays ? new Date(Date.now() - rangeDays * 24 * 60 * 60 * 1000) : undefined,
    );
  } catch (err) {
    console.error("[admin/leads] Fehler beim Laden der Leads aus der Datenbank", err);
    loadError = true;
  }

  const pdfHref = `/api/admin/leads/pdf${range ? `?range=${range}` : ""}`;

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-2xl font-bold text-navy-900">Fördercheck-Leads</h1>
      <p className="mt-2 text-[15px] text-ink-600">
        Alle eingegangenen Fördercheck-Anfragen mit Kontaktdaten und Antworten.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {RANGES.map((r) => {
            const active = range === r.value || (r.value === undefined && !range);
            return (
              <a
                key={r.label}
                href={r.value ? `/admin/leads?range=${r.value}` : "/admin/leads"}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  active
                    ? "bg-navy-900 text-white"
                    : "border border-navy-900/10 bg-white text-ink-600 hover:border-teal-600/40 hover:text-navy-900",
                )}
              >
                {r.label}
              </a>
            );
          })}
        </div>
        <Button asChild variant="secondary" size="sm">
          <a href={pdfHref}>PDF exportieren</a>
        </Button>
      </div>

      <div className="mt-8">
        {loadError ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            Die Leads konnten nicht geladen werden. Bitte Datenbankverbindung prüfen.
          </p>
        ) : (
          <LeadsExplorer leads={leads} />
        )}
      </div>
    </main>
  );
}
