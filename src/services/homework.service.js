import { HomeworkModel } from "../models/homework.model";
import { ClassroomModel } from "../models/classroom.model";
import mongoose from "mongoose";
import express from "express";
import { QuestionModel } from "../models/question.model";
import { AnswerModel } from "../models/answer.model";

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
    const homeworks = HomeworkModel.find({
      classroom: mongoose.Types.ObjectId(id),
    })
      .populate({
        path: "author",
        populate: { path: "roles" },
      })
      .exec();
    return homeworks;
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
      classroom: mongoose.Types.ObjectId(data.classroom),
      types: data.types,
      startTime: data.startTime,
      questions: [],
      author: mongoose.Types.ObjectId(data.author),
      time: data.time,
    });

    data.questions.forEach((question) => {
      let newQuestion = new QuestionModel({
        question: question.questionText,
        url: question.questionImage,
        homework: mongoose.Types.ObjectId(newHomework._id),
        author: mongoose.Types.ObjectId(data.author),
        point: question.point,
        answers: [],
      });

      newHomework.questions.push(newQuestion._id);

      question.options.forEach((option) => {
        let answer = new AnswerModel({
          answer: option.optionText,
          isCorrect: option.isCorrect,
          url: option.optionImage ? option.optionImage : null,
          question: mongoose.Types.ObjectId(newQuestion._id),
        });
        answer.save();
        newQuestion.answers.push(answer._id);
      });
      newQuestion.save();
    });

    await newHomework.save();

    return newHomework;
  } catch (error) {
    throw new Error(error);
  }
};

export const homeworkService = { getHomeworkClassroom, createHomework };
