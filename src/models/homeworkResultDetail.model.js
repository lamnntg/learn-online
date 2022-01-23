import mongoose from "mongoose";

const Schema = mongoose.Schema;

const homeworkResultDetailSchema = new Schema(
  {
    homeworkResult: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "HomeworkResult",
    },
    question: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Question",
    },
    text_answer: {
      type: String,
      nullable: true,
      required: false,
      default: null,
    },
    type: {
      type: String,
      required: true,
      default: null,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    answers: [
      {
        type: Object,
        required: true,
      },
    ],
    isCorrect: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const HomeworkResultDetailModel = mongoose.model(
  "HomeworkResultDetail",
  homeworkResultDetailSchema
);
