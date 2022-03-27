import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserAnswerSchema = new Schema(
  {
    userQuestion: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserAnswerModel = mongoose.model("UserAnswer", UserAnswerSchema);
