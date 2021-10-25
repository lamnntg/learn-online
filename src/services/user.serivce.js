import { UserModel } from "../models/user.model";

const updateUser = async (id, user) => {
  try {
    const result = await UserModel.updateOne(user);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const userService = { updateUser };
