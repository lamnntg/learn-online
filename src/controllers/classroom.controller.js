import { classroomService } from "../services/classroom.service";
import { httpStatusCode } from "../utillities/constants";
import { ClassroomNotificationModel } from "../models/classroomNotification.model";
import { DocumentModel } from "../models/document.model";
import { UserClassroomPendingModel } from "../models/userClassroomPending.model";
import mongoose from "mongoose";
import { UserModel } from "../models/user.model";

const Schema = mongoose.Schema;

const createClassroom = async (req, res) => {
  try {
    const result = await classroomService.createClassroom(req.body);
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
};

const getClassroomById = async (req, res) => {
  try {
    const result = await classroomService.getClassroomById(req.params.id);
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
};

/**
 * getClassroomByUser
 * @param {*} req
 * @param {*} res
 */
const getClassroomByUser = async (req, res) => {
  try {
    const result = await classroomService.getClassroomByUser(req.params.id);
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
};

/**
 * getClassroomByModerator
 * @param {*} req
 * @param {*} res
 */
const getClassroomByModerator = async (req, res) => {
  try {
    const result = await classroomService.getClassroomByModerator(
      req.params.id
    );
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
};

const updateUserClassroom = async (req, res) => {
  try {
    const result = await classroomService.updateUserClassroom(
      req.params.id,
      req.body
    );
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
};

const updateModeratorClassroom = async (req, res) => {
  try {
    const result = await classroomService.updateModeratorClassroom(
      req.params.id,
      req.body
    );
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
};

const joinClassroom = async (req, res) => {
  try {
    const result = await classroomService.joinClassroom(req.body);
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
};

const createClassroomNotification = async (req, res) => {
  const classroomNotification = new ClassroomNotificationModel({
    content: req.body.content,
    classroom: mongoose.Types.ObjectId(req.params.id),
    author_id: mongoose.Types.ObjectId(req.body.author_id),
    author_name: req.body.author_name,
    avatar_url: req.body.avatar_url,
  }).save(function (err, result) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (result) {
      res.status(200).json(result);
    }
  });
};

const getClassroomNotifications = async (req, res) => {
  ClassroomNotificationModel.find({
    classroom: req.params.id,
  }).exec((err, notifications) => {
    if (err) {
      res.status(500).send({ message: err });
    }

    res.status(200).json(notifications);
  });
};

const deleteClassroomNotification = async (req, res) => {
  ClassroomNotificationModel.deleteOne({
    _id: req.params.id,
  }).exec((err, result) => {
    if (err) {
      res.status(500).send({ message: err });
    }

    res.status(200).json(result);
  });
};

const updateClassroomNotification = async (req, res) => {
  ClassroomNotificationModel.updateOne(
    { _id: req.params.id },
    { content: req.body.content }
  ).exec((err, result) => {
    if (err) {
      res.status(500).send({ message: err });
    }

    res.status(200).json(result);
  });
};

const getDocuments = (req, res) => {
  DocumentModel.find({
    classroom: req.params.id,
  })
    .populate("author", "__v")
    .exec((err, documents) => {
      if (err) {
        res.status(500).send({ message: err });
      }

      res.status(200).json(documents);
    });
};

const createDocument = (req, res) => {
  const document = new DocumentModel({
    title: req.body.title,
    classroom: mongoose.Types.ObjectId(req.params.id),
    url: req.body.url,
    author: mongoose.Types.ObjectId(req.body.author_id),
    type: req.body.type,
  }).save(function (err, result) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (result) {
      res.status(200).json(result);
    }
  });
};

const deleteDocument = (req, res) => {
  DocumentModel.deleteOne({
    _id: req.params.id,
  }).exec((err, result) => {
    if (err) {
      res.status(500).send({ message: err });
    }

    res.status(200).json(result);
  });
};

const storeUsersImport = async (req, res) => {
  try {
    const users = req.body.users;
    await Promise.all(
      users.map(async (user) => {
        await UserModel.findOneAndUpdate(
          { email: user.email },
          {
            status: "pending",
          }
        );

        const userClassroomPending = new UserClassroomPendingModel({
          classroom: mongoose.Types.ObjectId(req.params.id),
          address: user.address,
          name: user.name,
          email: user.email,
          phone: user.phone,
        });

        await userClassroomPending.save();
      })
    );

    res.status(httpStatusCode.OK).json({ result: users });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
};

export const classroomController = {
  createClassroom,
  getClassroomByModerator,
  getClassroomByUser,
  updateUserClassroom,
  updateModeratorClassroom,
  joinClassroom,
  getClassroomById,
  createClassroomNotification,
  getClassroomNotifications,
  deleteClassroomNotification,
  updateClassroomNotification,
  getDocuments,
  createDocument,
  deleteDocument,
  storeUsersImport,
};
