import mongoose from "mongoose";

export const connectDB = async () => {
  const client = await mongoose.connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("da ket noi");
};
