import mongoose from "mongoose";

const { Schema } = mongoose;

const lessionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  }
);

export const LessionModel = mongoose.model(
  "Lession",
  lessionSchema
);
