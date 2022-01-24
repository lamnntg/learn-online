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

router.get("/:id", [authJwt.verifyToken], homeworkController.getHomeworkDetail);

router.post(
  "/create",
  [authJwt.verifyToken, authJwt.isModerator],
  homeworkController.createHomework
);

router.post(
  "/:id/finish",
  [authJwt.verifyToken],
  homeworkController.finishHomework
);

router.get(
  "/:id/result",
  [authJwt.verifyToken],
  homeworkController.getResultHomework
);

export const homeworkRouter = router;
