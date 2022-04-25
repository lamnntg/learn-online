import mongoose from "mongoose";

const { Schema } = mongoose;

const examCourseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    questions: [{
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Question",
    }],
    time: {
      type: String,
      required: true,
    },
  },{
    timestamps: true,
  }
);

export const CourseDetailModel = mongoose.model(
  "ExamCourse",
  examCourseSchema
);
