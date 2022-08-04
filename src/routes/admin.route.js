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
  "/user/all",
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.getAllUsers
);

router.post(
  "/user/update-roles",
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.updateRoles
);

router.post(
  "/user/delete",
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.deleteUser
);

export const adminRouter = router;