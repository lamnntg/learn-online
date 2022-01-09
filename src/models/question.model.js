import mongoose from "mongoose";

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: false,
    },
    homework: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Homework",
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    types: {
      type: String,
      required: false,
      enum: [
        "choice",
        "answer",
      ],
    },
    answers:[{
      type:  Schema.Types.ObjectId,
      required: true,
      ref: "Answer",
    }],
  },
  {
    timestamps: true,
  }
);

export const QuestionModel = mongoose.model("Question", questionSchema);
