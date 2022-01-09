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
      ref: "Classroom",
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
        "material",
        "short answer",
        "long answer",
        "multiple choice",
        "checkbox",
      ],
    },
    questions: [{
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Question",
    }],
    startTime: {
      type: Date,
      required: false,
    },
    time: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export const HomeworkModel = mongoose.model("Homework", homeworkSchema);
