import { httpStatusCode } from "../utillities/constants";


const getAllQuestions = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.updateUser(id, req.body);
    console.log(id, req.body);
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
}

export const qaController = { getAllQuestions };