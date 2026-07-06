import { sql } from "@vercel/postgres";

export type LeadType = "kontakt" | "foerdercheck";

export type Lead = {
  id: number;
  created_at: string;
  type: LeadType;
  raw_data: Record<string, unknown>;
  status: string;
};

let schemaReady: Promise<void> | null = null;

function ensureLeadsTable(): Promise<void> {
  if (!schemaReady) {
    schemaReady = sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        type TEXT NOT NULL,
        raw_data JSONB NOT NULL,
        status TEXT NOT NULL DEFAULT 'neu'
      )
    `.then(() => undefined)
      .catch((err) => {
        schemaReady = null; // erneuter Versuch beim nächsten Aufruf statt dauerhaft fehlgeschlagen zu bleiben
        throw err;
      });
  }
  return schemaReady;
}

/** Speichert einen Lead. Wirft bei DB-Fehlern (Aufrufer entscheidet, ob das den Request scheitern lässt). */
export async function createLead(type: LeadType, rawData: Record<string, unknown>): Promise<void> {
  await ensureLeadsTable();
  await sql`
    INSERT INTO leads (type, raw_data, status)
    VALUES (${type}, ${JSON.stringify(rawData)}::jsonb, 'neu')
  `;
}

export async function getLeadsSince(since: Date): Promise<Lead[]> {
  await ensureLeadsTable();
  const { rows } = await sql<Lead>`
    SELECT id, created_at, type, raw_data, status
    FROM leads
    WHERE created_at >= ${since.toISOString()}
    ORDER BY created_at DESC
  `;
  return rows;
}

export async function getAllLeads(): Promise<Lead[]> {
  await ensureLeadsTable();
  const { rows } = await sql<Lead>`
    SELECT id, created_at, type, raw_data, status
    FROM leads
    ORDER BY created_at DESC
  `;
  return rows;
}
