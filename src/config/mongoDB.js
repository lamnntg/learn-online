import mongoose from "mongoose";
import { env } from "../config/environments";
import auth from "../models/auth";
import { SubjectModel } from "../models/subject.model";
import { UserModel } from "../models/user.model";
import bcrypt from "bcryptjs";
const Role = auth.role;

export const connectDB = async () => {
  const client = await mongoose.connect(env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("connect to mongo DB ... ");
};

export const initialDB = async () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });

  SubjectModel.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new SubjectModel({
        name: "Default Subject",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Default Subject' to Subject collection");
      });
    }
  });

  // init account Admin
  UserModel.estimatedDocumentCount(async (err, count) => {
    let roles = await Role.find();
    let defaultAdmin  = await UserModel.findOne({ email: "admin@admin.com" });
    if (!err && count === 0 || defaultAdmin === null) {
      new UserModel({
        address: "Ha Noi, Viet Nam",
        description: "Mô tả về bản thân",
        email: "admin@admin.com",
        name: "Nguyễn Tùng Lâm",
        username: "admin",
        password: bcrypt.hashSync("admin", 8),
        roles: [roles[0]._id, roles[1]._id, roles[2]._id],
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added Defaut Admin to User collection");
      });
    }
  });
};
