import pkg from 'pg';
const { Pool } = pkg;
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

async function createTables() {
  const client = await pool.connect();

  try {
    console.log('🔄 Creating database tables...');

    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'user',
        admin_role VARCHAR(100),
        certification_track VARCHAR(100),
        phone VARCHAR(50),
        organization VARCHAR(255),
        designation VARCHAR(255),
        location VARCHAR(255),
        joined_date VARCHAR(50),
        bio TEXT,
        photo TEXT,
        id_document TEXT,
        verified BOOLEAN DEFAULT FALSE,
        verified_by VARCHAR(255),
        verified_date VARCHAR(50),
        enrollment_status VARCHAR(50) DEFAULT 'active',
        enrolled_date VARCHAR(50),
        expiry_date VARCHAR(50),
        exam_status VARCHAR(50) DEFAULT 'not_attempted',
        remaining_attempts INTEGER DEFAULT 2,
        credly_badge_url TEXT,
        certificate_number VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table created');

    // Create course_progress table
    await client.query(`
      CREATE TABLE IF NOT EXISTS course_progress (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        module_id VARCHAR(100) NOT NULL,
        progress INTEGER DEFAULT 0,
        status VARCHAR(50) DEFAULT 'not_started',
        overall_progress INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Course progress table created');

    // Create mock_test_results table
    await client.query(`
      CREATE TABLE IF NOT EXISTS mock_test_results (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        test_id VARCHAR(100) NOT NULL,
        score INTEGER,
        completed BOOLEAN DEFAULT FALSE,
        completed_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Mock test results table created');

    // Create roles table
    await client.query(`
      CREATE TABLE IF NOT EXISTS roles (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        permissions JSONB NOT NULL,
        system_role BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Roles table created');

    // Create permissions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS permissions (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Permissions table created');

    // Create certification_tracks table
    await client.query(`
      CREATE TABLE IF NOT EXISTS certification_tracks (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        color VARCHAR(50),
        icon VARCHAR(50),
        duration VARCHAR(50),
        price INTEGER,
        passing_score INTEGER,
        modules JSONB,
        competencies JSONB,
        target_audience TEXT,
        prerequisites TEXT,
        active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Certification tracks table created');

    // Create modules table
    await client.query(`
      CREATE TABLE IF NOT EXISTS modules (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        duration VARCHAR(50),
        difficulty VARCHAR(50),
        topics JSONB,
        video_url TEXT,
        pdf_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Modules table created');

    // Create mock_tests table
    await client.query(`
      CREATE TABLE IF NOT EXISTS mock_tests (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        duration INTEGER,
        total_questions INTEGER,
        passing_score INTEGER,
        questions JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Mock tests table created');

    console.log('🎉 All tables created successfully!');
  } catch (error) {
    console.error('❌ Error creating tables:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

createTables();
