import cron from 'node-cron';
import sendWinnerEmail from '../services/emailService';
import QuizAttempt from '../models/quizAttempt';

const startWinnerEmailCron = () => {
  // Runs every day at 11:59 PM
  cron.schedule('59 23 * * *', async () => {
    try {
      console.log('Sending winner email...');
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Find today's attempts
      const attempts = await QuizAttempt.find({
        attemptDate: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) },
      })
        .populate('user')
        .sort({ score: -1 })
        .limit(1);

      if (attempts.length > 0) {
        const winner = attempts[0];
        await sendWinnerEmail(winner.user.email, winner.score);
      }
    } catch (error) {
      console.error('Error in winner email cron:', error);
    }
  });
};

export default startWinnerEmailCron;