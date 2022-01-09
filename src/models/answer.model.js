import mongoose from "mongoose";

const Schema = mongoose.Schema;

const answerSchema = new Schema(
  {
    answer: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: false,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
    question: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Question",
    },
    point : {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export const AnswerModel = mongoose.model("Answer", answerSchema);
