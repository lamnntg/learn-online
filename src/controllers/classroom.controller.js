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
}

export const classroomController = { createClassroom };