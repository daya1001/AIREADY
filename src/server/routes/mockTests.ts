import { Router } from 'express';
import { db } from '../../db/config';
import { mockTests } from '../../db/schema';
import { eq } from 'drizzle-orm';

const router = Router();

// Get all mock tests
router.get('/', async (req, res) => {
  try {
    const allMockTests = await db.select().from(mockTests);
    res.json(allMockTests);
  } catch (error) {
    console.error('Error fetching mock tests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get mock test by ID
router.get('/:testId', async (req, res) => {
  try {
    const testId = req.params.testId;
    const result = await db.select().from(mockTests).where(eq(mockTests.id, testId)).limit(1);
    if (result.length === 0) {
      return res.status(404).json({ error: 'Mock test not found' });
    }
    res.json(result[0]);
  } catch (error) {
    console.error('Error fetching mock test by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
