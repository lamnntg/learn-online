import mongoose from "mongoose";

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: false,
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
    type: {
      type: String,
      required: false,
    },
    answers:[{
      type:  Schema.Types.ObjectId,
      required: true,
      ref: "Answer",
    }],
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

export const QuestionModel = mongoose.model("Question", questionSchema);
