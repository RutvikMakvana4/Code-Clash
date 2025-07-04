import "dotenv/config";
import express from "express";
import "./config/dbConnection.js";
import cors from "cors";
import quizRoutes from "./routes/quiz.js";
import leaderboardRoutes from "./routes/leaderboard.js";
import startQuestionCron from "./cron/questionCron.js";
import startWinnerEmailCron from "./cron/winnerEmailCron.js";

const app = express();

const HOST = process.env.HOST;
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).send("App is working!");
});

app.use('/api/quiz', quizRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

startQuestionCron();
startWinnerEmailCron();

app.listen(PORT, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});