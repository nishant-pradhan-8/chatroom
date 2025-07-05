import mongoose from "mongoose";

connectDB().catch((err) => console.log(err));

export async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URI || "");
}
