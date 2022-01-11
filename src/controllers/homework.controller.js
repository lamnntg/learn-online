import { homeworkService } from "../services/homework.service";
import { httpStatusCode } from "../utillities/constants";
import { HomeworkModel } from "../models/homework.model";
import { QuestionModel } from "../models/question.model";
const getHomeworkByClassroom = async (req, res) => {
  try {
    const result = await homeworkService.getHomeworkClassroom(req.params.id);
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
};

const createHomework = async (req, res) => {
  try {
    const result = await homeworkService.createHomework(req.body);
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
};

const getHomeworkDetail = async (req, res) => {
  try {
    HomeworkModel.findOne({
      _id: req.params.id,
    })
      .populate({
        path: "questions",
        populate: { path: "answers" },
      })
      .exec((err, homework) => {
        if (err) {
          res.status(500).send({ message: err });
        }
        res.status(200).json(homework);
      });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
};

export const homeworkController = {
  getHomeworkByClassroom,
  createHomework,
  getHomeworkDetail,
};
