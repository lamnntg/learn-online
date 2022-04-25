import express from "express";
import { httpStatusCode } from "../utillities/constants";
import { authRouter } from "./auth.route";
import { userRouter } from "./user.route";
import { classroomRouter } from "./classroom.route";
import { homeworkRouter } from "./homework.route";
import { qaRouter } from "./qa.route";
import { courseRoute } from "./course.route";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/classroom", classroomRouter);
router.use("/homework", homeworkRouter);
router.use("/qa", qaRouter);
router.use("/course", courseRoute);

router.get("/status", (req, res) => {
  res.status(httpStatusCode.OK).json({
    status: "Hello World",
  });
});

export const webRouter = router;