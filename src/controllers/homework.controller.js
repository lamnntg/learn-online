import { homeworkService } from "../services/homework.service";
import { httpStatusCode } from "../utillities/constants";
import { HomeworkModel } from "../models/homework.model";
import { HomeworkResultModel } from "../models/homeworkResult.model";
import { HomeworkResultDetailModel } from "../models/homeworkResultDetail.model";
import { convertPdf2Image } from "../apis/convertApi.api";

import mongoose from "mongoose";

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

const finishHomework = async (req, res) => {
  try {
    HomeworkModel.findOne({
      _id: req.params.id,
    }).exec((err, homework) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      if (!homework) {
        return res.status(404).send({ message: "homework Not found." });
      }
      const homeworkDetail = req.body.homework;
      const homeworkResultDetail = req.body.answers;

      const currentHomeworkResult = HomeworkResultModel.findOne({
        homework: homeworkDetail._id,
        user: homeworkDetail.user,
        classroom: homeworkDetail.classroom,
      });
      //
      // if (!currentHomeworkResult) {
      const newHomeworkResult = new HomeworkResultModel({
        homework: homeworkDetail._id,
        totalPoint: homeworkDetail.totalPoint,
        classroom: homeworkDetail.classroom,
        user: homeworkDetail.user,
      });

      var point = 0;
      homeworkResultDetail.forEach((result) => {
        var isCorrect = false;
        if (result.type == "choose") {
          let correctAnswer = 0;
          result.answers.forEach((answer) => {
            if (answer.isCorrect === answer.selected) {
              correctAnswer = correctAnswer + 1;
            }
          });
          if (correctAnswer === result.answers.length) {
            isCorrect = true;
            point = point + 1;
          }
        }

        const newHomeworkResultDetail = new HomeworkResultDetailModel({
          homeworkResult: newHomeworkResult._id,
          question: result.question_id,
          text_answer: result.text_answer,
          type: result.type,
          completed: result.completed,
          answers: result.answers,
          isCorrect: isCorrect,
        });

        newHomeworkResultDetail.save();
      });
      newHomeworkResult.point = point;
      newHomeworkResult.save();
      // }

      res.status(200).json(true);
    });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
};

const getResultHomework = async (req, res) => {
  try {
    HomeworkResultModel.find({
      homework: mongoose.Types.ObjectId(req.params.id),
    })
      .populate({
        path: "user",
        populate: { path: "roles" },
      })
      .exec((err, homeworkResult) => {
        if (err) {
          res.status(500).send({ message: err });
        }
        res.status(200).json(homeworkResult);
      });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
};

const createHomeworkByPdf = async (req, res) => {
  try {
    const base64Content = req.params.pdf;
    try {
      await convertPdf2Image(base64Content)
        .then((result) => {
          console.log(result);

          //validate
        })
    } catch (error) {
      res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: new Error(error).message });
    }
    
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
  finishHomework,
  getResultHomework,
  createHomeworkByPdf,
};
