import { db } from './src/db/config';
import { users } from './src/db/schema';
import * as dotenv from 'dotenv';

dotenv.config();

async function checkDatabase() {
  try {
    console.log('🔍 Checking database...\n');
    
    // Get all users
    const allUsers = await db.select().from(users);
    
    console.log(`✅ Found ${allUsers.length} user(s) in database:\n`);
    
    if (allUsers.length === 0) {
      console.log('⚠️  No users found. Try signing up a new user first.\n');
      return;
    }
    
    // Display users in a readable format
    allUsers.forEach((user, index) => {
      console.log(`${index + 1}. User ID: ${user.id}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Email: ${user.email || 'Not provided'}`);
      console.log(`   Phone: ${user.phone || 'Not provided'}`);
      console.log(`   Address: ${user.address || user.location || 'Not provided'}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Created: ${user.createdAt || 'Unknown'}`);
      console.log('');
    });
    
    console.log('✅ Database check complete!\n');
    
  } catch (error) {
    console.error('❌ Error checking database:', error);
    console.error('\nMake sure:');
    console.error('1. DATABASE_URL is set in .env file');
    console.error('2. Database is accessible');
    console.error('3. Tables exist (run: npm run db:push)');
  }
  
  process.exit(0);
}

checkDatabase();

