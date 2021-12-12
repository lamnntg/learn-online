import express from "express";
import { httpStatusCode } from "../utillities/constants";
import { authRouter } from "./auth.route";
import { userRouter } from "./user.route";
import { classroomRouter } from "./classroom.route";
import { homeworkRouter } from "./homework.route";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/classroom", classroomRouter);
router.use("/homework", homeworkRouter);

router.get("/status", (req, res) => {
  res.status(httpStatusCode.OK).json({
    status: "Hello World",
  });
});

export const webRouter = router;