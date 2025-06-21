import QuizAttempt from "../models/quizAttempt";
import User from "../models/user";

const checkQuizAttempt = async (req, res, next) => {
  const { email } = req.body;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const attempt = await QuizAttempt.findOne({
      user: user._id,
      attemptDate: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) },
    });

    if (attempt) {
      return res.status(403).json({ message: 'You have already taken today\'s quiz. Try again tomorrow!' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { checkQuizAttempt };