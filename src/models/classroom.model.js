import mongoose from "mongoose";

const { Schema } = mongoose;

const classroomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  moderators: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  users: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  description: {
    type: String,
  },
});

export const ClassroomModel = mongoose.model("Classroom", classroomSchema);
