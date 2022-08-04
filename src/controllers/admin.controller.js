import auth from "../models/auth";
import jwt from "jsonwebtoken";
import { CourseModel } from "../models/course.model";
import mongoose from "mongoose";
import {LessionModel} from "../models/lession.model";
import { httpStatusCode } from "../utillities/constants";
const User = auth.user;
const Role = auth.role;

const createCourse = async (req, res) => {
  try {
    const { title, sub_title, description, lessions, owner } = req.body;
    const newLessions = await LessionModel.insertMany(lessions);
  
    const newLessionIds = newLessions.map(lession => lession._id);
    const course = new CourseModel({
      title,
      sub_title,
      description,
      owner: mongoose.Types.ObjectId(owner),
      lessions: newLessionIds,
    });
  
    await course.save();
    return res.status(httpStatusCode.OK).json({ message: "Course created successfully" });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
}

const getAllCourse = async (req, res) => {
  try {
    const courses = await CourseModel.find({}).populate("lessions").populate("owner");
    return res.status(httpStatusCode.OK).json({ data: courses });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
}

export const adminController = { getAllCourse, createCourse };
