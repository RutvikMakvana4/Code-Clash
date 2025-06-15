import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateQuestions = async () => {
  try {
    const prompt = `
      Generate 3 coding-related multiple-choice questions suitable for developers of all levels. 
      Each question should have:
      - A question about general programming concepts (not language-specific).
      - 4 answer options, with only one correct.
      - A brief explanation of the correct answer.
      Return the response as a JSON array of objects, each with "question", "options", "correctAnswer", and "explanation" fields.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const questions = JSON.parse(response.choices[0].message.content);
    return questions;
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
};

export default generateQuestions;