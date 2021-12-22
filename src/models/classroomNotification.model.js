import { flatMap } from "lodash";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const classroomNotificationSchema = new Schema(
  {
    content: {
      type: String,
      required: false,
    },
    classroom: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Class",
    },
    author_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    author_name: {
      type: String,
      required: true,
    },
    avatar_url: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const ClassroomNotificationModel = mongoose.model("ClassroomNotification", classroomNotificationSchema);
