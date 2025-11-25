import { db } from '../../db/config';
import { users, courseProgress, mockTestResults } from '../../db/schema';
import { eq } from 'drizzle-orm';

// Internal function to get user by email with password for authentication
async function _getUserByEmailWithPassword(email: string) {
  try {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);

    //console.log('====result=====', result);

    if (result.length === 0) return null;
    return result[0];
  } catch (error) {
    console.error('Error fetching user by email with password:', error);
    throw error;
  }
}

export async function authenticateUser(email: string, password: string) {
  try {
    const user = await _getUserByEmailWithPassword(email);
    if (!user) return null;
    //console.log('====user=====', user);
    // In production, you should use proper password hashing (bcrypt, etc.)
    if (user.password === password) {
      // Successfully authenticated, now return user *without* password
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }

    return null;
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  try {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (result.length === 0) return null;

    const user = result[0];
    // Remove password before returning to frontend
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
}

export async function getUserCourseProgress(userId: number) {
  try {
    const progress = await db.select().from(courseProgress).where(eq(courseProgress.userId, userId));
    return progress;
  } catch (error) {
    console.error('Error fetching course progress from controller:', error);
    throw error;
  }
}

export async function getUserMockTestResults(userId: number) {
  try {
    const results = await db.select().from(mockTestResults).where(eq(mockTestResults.userId, userId));
    return results;
  } catch (error) {
    console.error('Error fetching mock test results from controller:', error);
    throw error;
  }
}
