import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
    explanation: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    activeDate: { type: Date, required: true },
});

const Question = mongoose.model('question', questionSchema);

export default Question;