import { httpStatusCode } from "../utillities/constants";
import { UserQuestionModel } from "../models/userQuestion.model";

const getAllQuestions = async (req, res) => {
  try {
    UserQuestionModel.find({})
      .exec((err, questions) => {
        if (err) {
          res.status(500).send({ message: err });
        }
        res.status(200).json(questions);
      });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
}


const createQA = async (req, res) => {
  data = req.body;

  const qa = new UserQuestionModel({
    title: data.title,
    description: data.description,
    url: data.url,
    author: data.author,
    content: data.content,
  });

  //validate
  try {
    await qa.save();

    res.status(200).json(qa);
  } catch (error) {
    res
    .status(httpStatusCode.INTERNAL_SERVER_ERROR)
    .json({ message: new Error(error).message });
  }
}


export const qaController = { getAllQuestions, createQA };