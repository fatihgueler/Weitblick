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
  return rows;
}

export async function getAllLeads(): Promise<Lead[]> {
  const sql = getClient();
  await ensureLeadsTable(sql);
  const rows = await sql<Lead[]>`
    SELECT id, created_at, type, raw_data, status
    FROM leads
    ORDER BY created_at DESC
  `;
  return rows;
}
