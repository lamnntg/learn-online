import mongoose from "mongoose";

const Schema = mongoose.Schema;

const homeworkResultSchema = new Schema(
  {
    homework: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Homework",
    },
    totalPoint: {
      type: String,
      required: true,
      default: 0,
    },
    point: {
      type: Number,
      required: false,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    times: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export const HomeworkResultModel = mongoose.model(
  "HomeworkResult",
  homeworkResultSchema
);
