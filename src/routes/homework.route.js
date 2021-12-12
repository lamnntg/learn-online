import express from "express";
import { authJwt } from "../middlewares/authJwt";
import { homeworkController } from "../controllers/homework.controller";

const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get(
  "/get/by-classroom/:id",
  [authJwt.verifyToken],
  homeworkController.getHomeworkByClassroom
);

router.get(
  "/create",
  [authJwt.verifyToken, authJwt.isModerator],
  homeworkController.createHomework
);


export const homeworkRouter = router;
