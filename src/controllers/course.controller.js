import mongoose from "mongoose";
import { httpStatusCode } from "../utillities/constants";
import { CourseModel } from "../models/course.model";
import { CourseDetailModel } from "../models/courseDetail.model";
import { UserCourseModel } from "../models/userCourse.model";

const Schema = mongoose.Schema;

const getAllCourse = (req, res) => {
  try {
    CourseModel.find({}).exec((err, courses) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      
      res.status(httpStatusCode.OK).json({ data: courses });
    });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
};

const createCourse = async (req, res) => {
  try {
    const course = new CourseModel({
      title: req.body.title,
      sub_title: req.body.sub_title,
      description: req.body.description,
      exam_course: null,
      owner: req.body?.owner || null,
    });

    await course.save();
    const courseDetails = req.body.detail;

    Promise.all(
      courseDetails.map(async (detail) => {
        await new CourseDetailModel({
          title: detail.title,
          course: course._id,
          url: detail.url,
          time: detail.time,
        }).save();
      })
    );

    return res
      .status(httpStatusCode.OK)
      .json({ message: "Course created successfully" });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
};

const saveLogCourse = async (req, res) => {
  try {
    UserCourseModel.findOne({
      course: req.body.course_id,
      user: req.body.user_id,
    })
      .exec((err, userCourse) => {
        if (err) {
          res.status(500).send({ message: err });
        }
        
      });
  } catch (error) {
    return res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
};

export const courseController = {
  getAllCourse,
  createCourse,
  saveLogCourse,
};
