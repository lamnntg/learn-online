import express from "express";
import { authJwt } from "../middlewares/authJwt";
import { courseController } from "../controllers/course.controller";

const router = express.Router();

router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get(
  "/get/all",
  [authJwt.verifyToken],
  courseController.getAllCourse
);

router.get(
  "/create",
  [authJwt.verifyToken],
  courseController.createCourse
);

export const courseRoute = router;
