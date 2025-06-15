import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    totalScore: { type: Number, default: 0 },
});

const User = mongoose.model('user', userSchema);
export default User;