import { homeworkService } from "../services/homework.service";
import { httpStatusCode } from "../utillities/constants";

const getHomeworkByClassroom = async (req, res) => {
  try {
    const result = await homeworkService.getHomeworkClassroom(
      req.params.id,
    );
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
};

const createHomework = async (req, res) => {
  try {
    const result = await homeworkService.createHomework(
      req.body,
    );
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
};

export const homeworkController = {
  getHomeworkByClassroom,
  createHomework
};
