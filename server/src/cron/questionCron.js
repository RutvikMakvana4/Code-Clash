import cron from 'node-cron';
import generateQuestions from '../services/questionGenerator';
import Question from '../models/question';

const startQuestionCron = () => {
    // Runs every day at 11:59 PM
    cron.schedule('59 23 * * *', async () => {
        try {
            console.log('Generating daily questions...');
            const questions = await generateQuestions();
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);

            // Clear previous questions for the next day
            await Question.deleteMany({ activeDate: tomorrow });

            // Save new questions
            for (const question of questions) {
                await new Question({ ...question, activeDate: tomorrow }).save();
            }
            console.log('Daily questions generated and saved.');
        } catch (error) {
            console.error('Error in question cron:', error);
        }
    });
};

export default startQuestionCron;