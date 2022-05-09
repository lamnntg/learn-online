import mongoose from "mongoose";

const { Schema } = mongoose;

const userCourseSchema = new Schema({
  course: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Course"
  },
  status: {
    type: String,
    required: true,
    enum: [
      "finished",
      "learning",
      "not_learning",
    ],
    default: "not_learning",
  },
  comment: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User"
  },
});

export const UserCourseModel = mongoose.model("UserCourse", userCourseSchema);
