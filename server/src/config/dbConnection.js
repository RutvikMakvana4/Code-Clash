import mongoose from "mongoose";

export default mongoose
    .connect(`${process.env.DATABASE_URL}`)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.log("Database not connected", error));