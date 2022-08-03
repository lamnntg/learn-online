import express from "express";
import { userController } from "../controllers/user.controller";
import { authJwt } from "../middlewares/authJwt";

const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get(
  "/get/by-moderator/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.getAllUsers
);

export const adminRouter = router;