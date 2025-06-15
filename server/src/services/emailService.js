import transporter from "../config/email";

const sendWinnerEmail = async (winnerEmail, score) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: winnerEmail,
      subject: 'Congratulations! You Won Today\'s CodeClash!',
      html: `
        <h2>Congratulations!</h2>
        <p>You are the winner of today's CodeClash challenge with a score of ${score} points!</p>
        <p>Keep coding and join tomorrow's challenge to maintain your streak!</p>
        <p>Best regards,<br>CodeClash Team</p>
      `,
    });
    console.log(`Winner email sent to ${winnerEmail}`);
  } catch (error) {
    console.error('Error sending winner email:', error);
  }
};

export default sendWinnerEmail;