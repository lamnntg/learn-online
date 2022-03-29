import express from "express";
import { authJwt } from "../middlewares/authJwt";
import { qaController } from "../controllers/qa.controller";

const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get(
  "/all",
  [authJwt.verifyToken],
  qaController.getAllQuestions
);

router.post(
  "/create",
  [authJwt.verifyToken],
  qaController.createQA
);

export const qaRouter = router;
