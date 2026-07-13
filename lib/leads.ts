import postgres from "postgres";

export type LeadType = "kontakt" | "foerdercheck";

export type Lead = {
  id: number;
  created_at: string;
  type: LeadType;
  raw_data: Record<string, unknown>;
  status: string;
};

let client: postgres.Sql | null = null;

/**
 * Lazily erzeugter Postgres-Client (statt @vercel/postgres, das intern an Neons
 * WebSocket-Proxy gebunden ist und nicht mit anderen Postgres-Anbietern wie
 * Supabase funktioniert). `prepare: false`, da der Verbindungsstring über
 * einen Connection-Pooler (pgbouncer) laufen kann, der keine Prepared
 * Statements unterstützt.
 */
function getClient(): postgres.Sql {
  if (!client) {
    const connectionString = process.env.POSTGRES_URL;
    if (!connectionString) throw new Error("POSTGRES_URL ist nicht gesetzt.");
    client = postgres(connectionString, { ssl: "require", prepare: false });
  }
  return client;
}

/**
 * Normalisiert `raw_data` zu einem echten Objekt. In manchen Fällen (z. B. über
 * den Connection-Pooler) liefert der Treiber JSONB-Spalten als rohen JSON-String
 * statt als bereits geparstes Objekt zurück – ohne diese Absicherung blieben
 * dann alle Felder (Name, E-Mail, Fördercheck-Antworten) leer, obwohl die
 * Daten korrekt gespeichert sind.
 */
function normalizeRawData(value: unknown): Record<string, unknown> {
  if (typeof value === "string") {
    try {
      const parsed: unknown = JSON.parse(value);
      return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
    } catch {
      return {};
    }
  }
  if (value && typeof value === "object") return value as Record<string, unknown>;
  return {};
}

function normalizeLeads(rows: Lead[]): Lead[] {
  return rows.map((row) => ({ ...row, raw_data: normalizeRawData(row.raw_data) }));
}

let schemaReady: Promise<void> | null = null;

function ensureLeadsTable(sql: postgres.Sql): Promise<void> {
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
  const sql = getClient();
  await ensureLeadsTable(sql);
  await sql`
    INSERT INTO leads (type, raw_data, status)
    VALUES (${type}, ${JSON.stringify(rawData)}::jsonb, 'neu')
  `;
}

export async function getLeadsSince(since: Date): Promise<Lead[]> {
  const sql = getClient();
  await ensureLeadsTable(sql);
  const rows = await sql<Lead[]>`
    SELECT id, created_at, type, raw_data, status
    FROM leads
    WHERE created_at >= ${since.toISOString()}
    ORDER BY created_at DESC
  `;
  return normalizeLeads(rows);
}

export async function getAllLeads(): Promise<Lead[]> {
  const sql = getClient();
  await ensureLeadsTable(sql);
  const rows = await sql<Lead[]>`
    SELECT id, created_at, type, raw_data, status
    FROM leads
    ORDER BY created_at DESC
  `;
  return normalizeLeads(rows);
}

/** Nur Fördercheck-Leads, optional auf einen Zeitraum eingeschränkt. Für die Admin-Leads-Übersicht. */
export async function getFoerdercheckLeads(since?: Date): Promise<Lead[]> {
  const sql = getClient();
  await ensureLeadsTable(sql);
  const rows = since
    ? await sql<Lead[]>`
        SELECT id, created_at, type, raw_data, status
        FROM leads
        WHERE type = 'foerdercheck' AND created_at >= ${since.toISOString()}
        ORDER BY created_at DESC
      `
    : await sql<Lead[]>`
        SELECT id, created_at, type, raw_data, status
        FROM leads
        WHERE type = 'foerdercheck'
        ORDER BY created_at DESC
      `;
  return normalizeLeads(rows);
}
