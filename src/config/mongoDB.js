import mongoose from "mongoose";
import { env } from "../config/environments";

export const connectDB = async () => {
  const client = await mongoose.connect(env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("connect to mongo DB ... ");
};
