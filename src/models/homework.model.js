import mongoose from "mongoose";

const Schema = mongoose.Schema;

const homeworkSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    classroom: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Class",
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    types: {
      type: String,
      required: true,
      enum: [
        "material",
        "short answer",
        "long answer",
        "multiple choice",
        "checkbox",
      ],
    },
    answer: {
      type: Array,
      required: false,
    },
    duedate: {
      type: Date,
      required: false,
    },
    options: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const HomeworkModel = mongoose.model("Homework", homeworkSchema);
