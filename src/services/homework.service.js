import { HomeworkModel } from "../models/homework.model";
import { ClassroomModel } from "../models/classroom.model";
import mongoose from "mongoose";

/**
 * getHomeworkClassroom
 * @param {int} id
 * @returns
 */
const getHomeworkClassroom = async (id) => {
  try {
    const classroom = await ClassroomModel.findOne({
      _id: mongoose.Types.ObjectId(id),
    });

    if (!classroom) {
      return {
        error: true,
        message: "Classroom not found",
      };
    }
    const homework = HomeworkModel.find({
      classroom: mongoose.Types.ObjectId(id),
    });

    return homework;
    // await ClassroomModel.findOne({ _id: mongoose.Types.ObjectId(id) }, (err, classroom) => {
    //   if (err) throw new Error(err);
    //   else if (!classroom) throw new Error("Classroom not found");
    //   else {
    //     const homework = HomeworkModel.find({ classroom: mongoose.Types.ObjectId(id) });

    //     return homework;
    //   }
    // });
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * createHomework
 * @param {int} id
 * @returns
 */
const createHomework = async (data) => {
  try {
    const newHomework = new HomeworkModel({
      title: data.title,
      description: data.description,
      class: mongoose.Types.ObjectId(data.classroom),
      types: data.types,
      duedate: data.duedate,
      options: data.options,
      author: mongoose.Types.ObjectId(data.author),
    });

    await newHomework.save();

    return newHomework;
  } catch (error) {
    throw new Error(error);
  }
};

export const homeworkService = { getHomeworkClassroom, createHomework };
