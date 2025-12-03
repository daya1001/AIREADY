import * as schema from './schema';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';

type AnyDrizzleDb = PostgresJsDatabase<typeof schema> | NeonHttpDatabase<typeof schema>;

// Get database URL from environment variable
// In Vite (browser), use import.meta.env
// In Node.js (tsx/seed scripts), use process.env
const databaseUrl = typeof import.meta !== 'undefined' && import.meta.env
  ? import.meta.env.VITE_DATABASE_URL
  : process.env.DATABASE_URL || process.env.VITE_DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL or VITE_DATABASE_URL is not set in environment variables');
  console.error('Available env vars:', {
    hasImportMeta: typeof import.meta !== 'undefined',
    hasViteEnv: typeof import.meta !== 'undefined' && import.meta.env ? 'yes' : 'no',
    viteEnvKeys: typeof import.meta !== 'undefined' && import.meta.env
      ? Object.keys(import.meta.env)
      : [],
  });
  throw new Error('DATABASE_URL or VITE_DATABASE_URL is not set in environment variables. Please set VITE_DATABASE_URL in your deployment platform.');
}

let db: AnyDrizzleDb;

// Check if running in a Node.js environment (where `process` is defined)
if (typeof process !== 'undefined' && process.versions && process.versions.node) {
  // Node.js environment - always use pg driver for better reliability
  // pg driver works with both localhost and remote Neon databases
  const { Client } = await import('pg');
  const { drizzle } = await import('drizzle-orm/node-postgres');
  const client = new Client({
    connectionString: databaseUrl,
    ssl: databaseUrl.includes('localhost') ? false : { rejectUnauthorized: false }
  });
  await client.connect();
  db = drizzle(client, { schema });
} else {
  // Browser environment - use Neon HTTP driver
  const { neon } = await import('@neondatabase/serverless');
  const { drizzle } = await import('drizzle-orm/neon-http');
  const sql = neon(databaseUrl);
  db = drizzle(sql, { schema });
}

export { db };
