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
    room: data.room,
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
 *
 * @param {int} userId
 * @returns
 */
const getClassroomByUser = async (userId) => {
  try {
    const classroom = await ClassroomModel.find({
      users: { $in: mongoose.Types.ObjectId(userId) },
    });

    return classroom;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * updateUserClassroom
 *
 * @param {*} userId
 * @param {*} classroomId
 * @returns
 */
const updateUserClassroom = async (classroomId, data) => {
  try {
    const classroom = await ClassroomModel.findOne({
      _id: mongoose.Types.ObjectId(classroomId),
    });

    const newUsers = data.users.map((user) => mongoose.Types.ObjectId(user));
    classroom.users = newUsers;
    await classroom.save();

    return classroom;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * updateModeratorClassroom
 * @param {*} classroomId
 * @param {*} data
 * @returns
 */
const updateModeratorClassroom = async (classroomId, data) => {
  try {
    const classroom = await ClassroomModel.findOne({
      _id: mongoose.Types.ObjectId(classroomId),
    });

    const newModerators = data.moderator.map((moderator) =>
      mongoose.Types.ObjectId(moderator)
    );
    classroom.moderator = newModerators;
    await classroom.save();

    return classroom;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * joinClassroom
 * @param {*} data
 * @returns
 */
const joinClassroom = async (data) => {
  try {
    const classroom = await ClassroomModel.findOne({
      code: data.code,
    });

    classroom.users.push(mongoose.Types.ObjectId(data.user_id));
    await classroom.save();

    return classroom;
  } catch (error) {
    throw new Error(error);
  }
};

const getClassroomById = async (id) => {
  try {
    let classroom = await ClassroomModel.findOne({
      _id: mongoose.Types.ObjectId(id),
    })
      .populate({
        path: "users",
        populate: { path: "roles" },
      })
      .populate({
        path: "moderators",
        populate: { path: "roles" },
      })
      .exec();

    var users = classroom.users.map((user) => {
      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      delete user.roles;
      Object.defineProperty(user, "roles", {
        configurable: false,
        value: authorities,
      });
      return user;
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
  updateUserClassroom,
  updateModeratorClassroom,
  joinClassroom,
  getClassroomById,
};
