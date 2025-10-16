import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Get database URL from environment variable
// In Vite (browser), use import.meta.env
// In Node.js (tsx/seed scripts), use process.env
const databaseUrl = typeof import.meta !== 'undefined' && import.meta.env
  ? import.meta.env.VITE_DATABASE_URL
  : process.env.DATABASE_URL || process.env.VITE_DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL or VITE_DATABASE_URL is not set in environment variables');
}

// Create Neon connection
const sql = neon(databaseUrl);

// Create Drizzle instance
export const db = drizzle(sql, { schema });
