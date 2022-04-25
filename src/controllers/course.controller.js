
import mongoose from "mongoose";
import { httpStatusCode } from "../utillities/constants";
import { CourseModel } from "../models/course.model";

const Schema = mongoose.Schema;

const getAllCourse = (req, res) => {
  try {
    CourseModel.find({}).exec((err, courses) => {
      if (err) {
        res.status(500).send({ message: err });
      }

      res.status(httpStatusCode.OK).json({data: courses});
    })
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
}

export const courseController = {
  getAllCourse
};
