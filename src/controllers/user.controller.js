import { userService } from '../services/user.serivce';
import { httpStatusCode } from '../utillities/constants';
import { uploadImage } from '../apis/imgBB.api';
import { UserModel } from '../models/user.model';
import { UserClassroomPendingModel } from '../models/userClassroomPending.model';
import { ClassroomModel } from '../models/classroom.model';
import mongoose from "mongoose";
import { RoleModel } from '../models/role.model';

const allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

const userBoard = (req, res) => {
  res.status(200).send('User Content.');
};

const adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};

const moderatorBoard = (req, res) => {
  res.status(200).send('Moderator Content.');
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.updateUser(id, req.body);
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: new Error(error).message });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { id, avatar } = req.body;
    await uploadImage(avatar).then(async result => {
      await UserModel.findOneAndUpdate(
        {
          _id: id
        },
        {
          avatar_url: result
        }
      );
      //validate
      res.status(200).json({ result: result });
    });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: new Error(error).message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.getUserById(id);
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: new Error(error).message });
  }
};

const getClassroomInvite = async (req, res) => {
  try {
    const email = req.body.email;
    UserClassroomPendingModel.find({
      email: email
    })
      .populate({ path: 'classroom' })
      .exec((err, users) => {
        if (err) {
          res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({});
        }
        res.status(httpStatusCode.OK).json({ result: users });
      });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: new Error(error).message });
  }
};

const submitInvite = async (req, res) => {
  try {
    const { id, status, userId, classroomId } = req.body;
    await UserClassroomPendingModel.findOneAndRemove({
      _id: mongoose.Types.ObjectId(id)
    });

    if (status === 'accepted') {
      await ClassroomModel.findOneAndUpdate(
        {
          _id:  mongoose.Types.ObjectId(classroomId)
        },
        {
          $push: { users: userId }
        }
      );
    }

    res.status(httpStatusCode.OK).json({ result: true });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: new Error(error).message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().populate('roles');
    res.status(httpStatusCode.OK).json({ users: users });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: new Error(error).message });
  }
}
const updateRoles = async (req, res) => {
  try {
    const { id, roles } = req.body;
    const constantsRoles = await RoleModel.find({});
    const rolesIds = constantsRoles.filter(role => {return roles.includes(role.name)}).map(role => mongoose.Types.ObjectId(role._id.toString()));

    await UserModel.findOneAndUpdate(
      {
        _id: id
      },
      {
        roles: rolesIds
      }
    );

    res.status(httpStatusCode.OK).json({ result: true });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: new Error(error).message });
  }
}
const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    await UserModel.findOneAndRemove({
      _id: id
    });
    res.status(httpStatusCode.OK).json({ result: true });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: new Error(error).message });
  }
}

export const userController = {
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
  updateUser,
  updateAvatar,
  getUserById,
  getClassroomInvite,
  submitInvite,
  getAllUsers,
  updateRoles,
  deleteUser
};

