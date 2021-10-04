import mongoose from "mongoose";
import { RoleModel } from "./role.model";
import { UserModel } from "./user.model";

mongoose.Promise = global.Promise;

const auth = {};

auth.user = UserModel;
auth.role = RoleModel;

auth.ROLE = ["user", "admin", "moderator"];

export const auth;