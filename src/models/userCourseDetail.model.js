import mongoose from "mongoose";

const { Schema } = mongoose;

const userCourseDetailSchema = new Schema({
  user_course: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "UserCourse"
  },
  status: {
    type: string,
    required: true,
    enum: [
      "finished",
      "learning",
      "not_learning",
    ],
    default: "not_learning",
  },
  time_stop: {
    type: String,
    required: false,
  },
});

export const UserCourseDetailModel = mongoose.model("UserCourseDetail", userCourseDetailSchema);
