import { httpStatusCode } from '../utillities/constants';
import { UserQuestionModel } from '../models/userQuestion.model';
import mongoose from 'mongoose';
import { uploadImage } from '../apis/imgBB.api';
import { getBase64 } from '../helpers/convertToBase64';
import { defaultsDeep } from 'lodash';

const getAllQuestions = async (req, res) => {
  try {
    UserQuestionModel.find({}).exec((err, questions) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      res.status(200).json(questions);
    });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: new Error(error).message });
  }
};

const createQA = async (req, res) => {
  let data = req.body;
  try {
    await uploadImage(data.image).then(result => {
      const qa = new UserQuestionModel({
        title: data.title,
        description: data.desc,
        url: result,
        author: data.author,
        content: data.content
      });
      //validate
      qa.save();
      res.status(200).json(qa);
    });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: new Error(error).message });
  }
};

const getAllQuestionsByUser = async (req, res) => {
  try {
    const result = await UserQuestionModel.find({ author: mongoose.Types.ObjectId(req.params.id) });
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: new Error(error).message });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const result = await UserQuestionModel.find({ _id: mongoose.Types.ObjectId(req.params.id) });
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: new Error(error).message });
  }
};

export const qaController = { getAllQuestions, createQA, getAllQuestionsByUser, getQuestionById };

