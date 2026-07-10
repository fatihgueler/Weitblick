"use client";

import { useMemo, useState } from "react";
import { Search, Mail, Phone } from "lucide-react";
import type { Lead } from "@/lib/leads";
import { questions, labelOf, summarizeAnswers, type FunnelData } from "@/components/foerdercheck/content";
import { formatTimestampBerlin } from "@/lib/email";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";

type ContactInfo = { name: string; email: string; phone: string };

function contactOf(lead: Lead): ContactInfo {
  const data = lead.raw_data as Partial<FunnelData>;
  const name = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();
  return {
    name: name || "–",
    email: data.email || "–",
    phone: data.phone || "–",
  };
}

/** Kompakte Vorschau (Gebäude + Maßnahmen) für die Tabellenzeile. */
function previewOf(lead: Lead): string {
  const data = lead.raw_data as Partial<FunnelData>;
  const parts: string[] = [];
  if (data.building) parts.push(labelOf(questions.building, data.building));
  if (data.measures?.length) {
    parts.push(data.measures.map((m) => labelOf(questions.measures, m)).join(", "));
  }
  return parts.join(" · ") || "–";
}

function matchesQuery(lead: Lead, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const { name, email } = contactOf(lead);
  return name.toLowerCase().includes(q) || email.toLowerCase().includes(q);
}

export function LeadsExplorer({ leads }: { leads: Lead[] }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);

  const filtered = useMemo(() => leads.filter((lead) => matchesQuery(lead, query)), [leads, query]);

  if (leads.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
            strokeWidth={2}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Suche nach Name oder E-Mail …"
            className="input py-2.5 pl-10 pr-4 text-sm"
            aria-label="Leads durchsuchen"
          />
        </div>
        <span className="text-sm text-ink-500">
          {filtered.length} von {leads.length} Lead{leads.length === 1 ? "" : "s"}
        </span>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Kontakt</TableHead>
            <TableHead>Datum</TableHead>
            <TableHead>Vorhaben</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((lead) => {
            const contact = contactOf(lead);
            return (
              <TableRow
                key={lead.id}
                role="button"
                tabIndex={0}
                className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-inset"
                onClick={() => setSelected(lead)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(lead);
                  }
                }}
              >
                <TableCell className="font-semibold">{contact.name}</TableCell>
                <TableCell className="text-ink-600">
                  <div>{contact.email}</div>
                  {contact.phone !== "–" && <div className="text-ink-500">{contact.phone}</div>}
                </TableCell>
                <TableCell className="whitespace-nowrap text-ink-600">
                  {formatTimestampBerlin(new Date(lead.created_at))}
                </TableCell>
                <TableCell className="text-ink-600">{previewOf(lead)}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">
                    {lead.status}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {filtered.length === 0 && (
        <p className="mt-6 text-center text-sm text-ink-500">Keine Leads für „{query}" gefunden.</p>
      )}

      <Sheet open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent>{selected && <LeadDetail lead={selected} />}</SheetContent>
      </Sheet>
    </div>
  );
}

function LeadDetail({ lead }: { lead: Lead }) {
  const contact = contactOf(lead);
  const data = lead.raw_data as Partial<FunnelData>;
  const summary = summarizeAnswers(data);

  return (
    <div className="flex h-full flex-col overflow-y-auto px-6 py-8 sm:px-8">
      <SheetTitle>{contact.name}</SheetTitle>
      <SheetDescription>
        Fördercheck-Anfrage vom {formatTimestampBerlin(new Date(lead.created_at))}
      </SheetDescription>

      <div className="mt-6 flex flex-col gap-2 rounded-2xl border border-navy-900/8 bg-paper p-4 text-sm">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 shrink-0 text-teal-700" strokeWidth={2} />
          {contact.email !== "–" ? (
            <a href={`mailto:${contact.email}`} className="text-navy-900 hover:text-teal-700">
              {contact.email}
            </a>
          ) : (
            <span className="text-ink-500">–</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 shrink-0 text-teal-700" strokeWidth={2} />
          {contact.phone !== "–" ? (
            <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className="text-navy-900 hover:text-teal-700">
              {contact.phone}
            </a>
          ) : (
            <span className="text-ink-500">–</span>
          )}
        </div>
      </div>

      <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-ink-500">
        Angaben aus dem Fördercheck
      </h3>
      <div className="mt-3 flex flex-col gap-4">
        {summary.map((item) => (
          <div key={item.q}>
            <div className="text-xs font-medium text-ink-500">{item.q}</div>
            <div className="mt-0.5 text-[15px] font-medium text-navy-900">{item.a}</div>
          </div>
        ))}
      </div>

      {data.message && (
        <>
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-ink-500">Nachricht</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-700">{data.message}</p>
        </>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-navy-900/15 bg-white px-6 py-16 text-center">
      <p className="text-[15px] font-medium text-ink-600">Noch keine Leads eingegangen.</p>
      <p className="mt-1 text-sm text-ink-500">Neue Fördercheck-Anfragen erscheinen hier automatisch.</p>
    </div>
  );
}
