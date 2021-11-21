import express from "express";
import { authJwt } from "../middlewares/authJwt";
import { classroomController } from "../controllers/classroom.controller";

const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/create",
  [authJwt.verifyToken, authJwt.isModerator],
  classroomController.createClassroom
);


export const classroomRouter = router;
