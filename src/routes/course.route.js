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

export const courseRoute = router;
