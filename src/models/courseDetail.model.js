import mongoose from "mongoose";

const { Schema } = mongoose;

const courseDetailSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    url: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  }
);

export const CourseDetailModel = mongoose.model(
  "CourseDetail",
  courseDetailSchema
);
