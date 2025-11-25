import { Router } from 'express';
import { authenticateUser, getUserByEmail } from '../controllers/authController';
import { getUserCourseProgress, getUserMockTestResults } from '../../services/database';

const authRouter = Router();

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authenticateUser(email, password);
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Backend login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

authRouter.get('/user-by-email', async (req, res) => {
  const { email } = req.query;
  if (typeof email !== 'string') {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }
  try {
    const user = await getUserByEmail(email);
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Backend get user by email error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get user course progress
authRouter.get('/user/:userId/course-progress', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const progress = await getUserCourseProgress(userId);
    res.json({ success: true, progress });
  } catch (error) {
    console.error('Error fetching user course progress:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get user mock test results
authRouter.get('/user/:userId/mock-tests', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const results = await getUserMockTestResults(userId);
    res.json({ success: true, results });
  } catch (error) {
    console.error('Error fetching user mock test results:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default authRouter;
