import { classroomService } from "../services/classroom.service";
import { httpStatusCode } from "../utillities/constants";

const createClassroom = async (req, res) => {
  try {
    const result = await classroomService.createClassroom(req.body);
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
};

/**
 * getClassroomByUser
 * @param {*} req
 * @param {*} res
 */
const getClassroomByUser = async (req, res) => {
  try {
    const result = await classroomService.getClassroomByUser(req.params.id);
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
};

/**
 * getClassroomByModerator
 * @param {*} req
 * @param {*} res
 */
const getClassroomByModerator = async (req, res) => {
  try {
    const result = await classroomService.getClassroomByModerator(
      req.params.id
    );
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
};

const updateUserClassroom = async (req, res) => {
  try {
    const result = await classroomService.updateUserClassroom(
      req.params.id,
      req.body
    );
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
};

export const classroomController = {
  createClassroom,
  getClassroomByModerator,
  getClassroomByUser,
  updateUserClassroom,
};
