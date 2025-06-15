import express from 'express';
const router = express.Router();
import QuizAttempt from '../models/quizAttempt';
import Question from '../models/question';
import { checkQuizAttempt } from '../middleware/auth';
import User from '../models/user';

// Get today's questions
router.get('/questions', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const questions = await Question.find({
            activeDate: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) },
        });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Start quiz and submit score
router.post('/submit', checkQuizAttempt, async (req, res) => {
    const { email, score } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ email });
            await user.save();
        }

        const quizAttempt = new QuizAttempt({
            user: user._id,
            score,
            attemptDate: new Date(),
        });
        await quizAttempt.save();

        user.totalScore += score;
        await user.save();

        res.json({ message: 'Quiz submitted successfully', score });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;