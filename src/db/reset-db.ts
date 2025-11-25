import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

async function resetDatabase() {
  const client = new Client(connectionString);
  await client.connect();

  try {
    console.log('🔄 Truncating all tables...');

    const tableNames = [
      'users',
      'course_progress',
      'mock_test_results',
      'roles',
      'permissions',
      'certification_tracks',
      'modules',
      'mock_tests',
      'leads',
    ];

    for (const tableName of tableNames) {
      await client.query(`TRUNCATE TABLE \"${tableName}\" RESTART IDENTITY CASCADE;`);
      console.log(`✅ Table \"${tableName}\" truncated.`);
    }

    console.log('🎉 All tables truncated and identities restarted successfully!');
  } catch (error) {
    console.error('❌ Error resetting database:', error);
    throw error;
  } finally {
    await client.end();
  }
}

resetDatabase();
