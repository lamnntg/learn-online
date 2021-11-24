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

/**
 * createClassroom
 * @param {array} data
 * @returns json
 */
const createClassroom = async (data) => {
  const classroom = new ClassroomModel({
    name: data.name,
    subject: data.subject,
    code: data.code,
    owner: mongoose.Types.ObjectId(data.owner),
    moderator: [mongoose.Types.ObjectId(data.owner)],
  });
  //validate
  try {
    await classroom.save();

    return classroom;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * getClassroom
 * @param {int} id
 * @returns
 */
const getClassroom = async (id) => {
  try {
    const classroom = await ClassroomModel.findOne({
      _id: mongoose.Types.ObjectId(id),
    });

    return classroom;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * getClassroomByOwner
 * @param {int} ownerId
 * @returns
 */
const getClassroomByModerator = async (moderatorId) => {
  try {
    const classroom = await ClassroomModel.find({
      moderator: { $in: mongoose.Types.ObjectId(moderatorId) },
    });

    return classroom;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * getClassroomByUser
 * @param {int} userId
 * @returns
 */
const getClassroomByUser = async (userId) => {
  try {
    const classroom = await ClassroomModel.find({
      user: mongoose.Types.ObjectId(userId),
    });

    return classroom;
  } catch (error) {
    throw new Error(error);
  }
};

export const classroomService = {
  updateClassroom,
  createClassroom,
  getClassroom,
  getClassroomByModerator,
  getClassroomByUser,
};
