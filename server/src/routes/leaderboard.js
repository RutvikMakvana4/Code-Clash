import express from 'express';
const router = express.Router();
import QuizAttempt from '../models/quizAttempt';

router.get('/', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attempts = await QuizAttempt.find({
      attemptDate: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) },
    })
      .populate('user')
      .sort({ score: -1 })
      .limit(10);

    const leaderboard = attempts.map((attempt, index) => ({
      rank: index + 1,
      name: attempt.user.email.split('@')[0],
      score: attempt.score,
      isYou: req.query.email === attempt.user.email,
    }));

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;