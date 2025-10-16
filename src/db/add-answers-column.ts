import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.VITE_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function addAnswersColumn() {
  const client = await pool.connect();

  try {
    console.log('🔄 Adding answers column to mock_test_results table...');

    // Check if column already exists
    const checkColumn = await client.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name='mock_test_results'
      AND column_name='answers';
    `);

    if (checkColumn.rows.length > 0) {
      console.log('✅ Column "answers" already exists in mock_test_results table');
    } else {
      // Add the answers column
      await client.query(`
        ALTER TABLE mock_test_results
        ADD COLUMN answers JSONB;
      `);
      console.log('✅ Successfully added answers column to mock_test_results table');
    }

    console.log('✅ Migration completed!');
  } catch (error) {
    console.error('❌ Error during migration:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

addAnswersColumn();
