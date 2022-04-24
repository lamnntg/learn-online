import { HomeworkModel } from "../models/homework.model";
import { ClassroomModel } from "../models/classroom.model";
import mongoose from "mongoose";
import express from "express";
import { QuestionModel } from "../models/question.model";
import { AnswerModel } from "../models/answer.model";
import { forEach } from "lodash";

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
        type: question.type,
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

/**
 * handleImagesExam
 * @returns
 */
 const handleImagesUrlExam = async (classroomId, userId, data) => {
  try {
    const questions = data.map((question) => {
      return {
        questionText: 'Trả lời câu hỏi trong hình ảnh dưới',
        questionImage: question,
        author: userId,
        point: 1,
        type: 'choose',
        options: []
      }
    });

    return {
      title: 'Exam PDF',
      description: 'Exam PDF',
      classroom: classroomId,
      types: 'multiple choice',
      startTime: null,
      questions: questions,
      author:userId,
      time: 60,
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updateHomework = async (id, data) => {
  try {

    let homework = await HomeworkModel.findOne({ _id: mongoose.Types.ObjectId(id) });
    if (homework === null) {
      return {
        error: true,
        message: "Homework not found",
      };
    }

    let newHomework = {
      title: data.title,
      description: data.description,
      classroom: mongoose.Types.ObjectId(data.classroom),
      types: data.types,
      startTime: data.startTime,
      questions: [],
      author: mongoose.Types.ObjectId(data.author),
      time: data.time,
    };

    data.questions.forEach((question) => {
      let newQuestion = new QuestionModel({
        question: question.questionText,
        url: question.questionImage,
        homework: mongoose.Types.ObjectId(newHomework._id),
        author: mongoose.Types.ObjectId(data.author),
        point: question.point,
        type: question.type,
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

    let responses = await HomeworkModel.findOneAndUpdate({
      _id: mongoose.Types.ObjectId(id)
    }, newHomework);

    return responses;

  } catch (error) {
    throw new Error(error);
  }
}

const deleteHomework = async (id) => {
  try {
    await HomeworkModel.findByIdAndRemove(id);
    QuestionModel.find({ homework: mongoose.Types.ObjectId(id) }).exec(
      (err, questions) => {
        questions.map(async (question) => {
          await AnswerModel.deleteMany({ question: mongoose.Types.ObjectId(question._id) });
        })
      }
    );
    await QuestionModel.deleteMany({ homework: mongoose.Types.ObjectId(id) });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}

export const homeworkService = { getHomeworkClassroom, createHomework, handleImagesUrlExam, updateHomework, deleteHomework };
