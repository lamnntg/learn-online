import mongoose from "mongoose";

const { Schema } = mongoose;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  sub_title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  exam_course: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: "ExamCourse",
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: "User",
  },
});

export const CourseModel = mongoose.model("Course", courseSchema);
