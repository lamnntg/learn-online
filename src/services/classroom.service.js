import { ClassroomModel } from "../models/classroom.model";
import { SubjectModel } from "../models/subject.model";
import mongoose from "mongoose";

const updateClassroom = async (id, data) => {
  try {
    const result = await ClassroomModel.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      data,
      {
        returnOriginal: false,
      }
    );

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const createClassroom = async (data) => {
  const classroom = new ClassroomModel({
    name: data.name,
    subject: data.subject,
    code: data.code,
    owner: mongoose.Types.ObjectId(data.owner),
    moderator: [mongoose.Types.ObjectId(data.owner)],
  });

  classroom.save((err, classroom) => {
    if (err) throw err;

    return classroom;
  });

};

export const classroomService = { updateClassroom, createClassroom };
