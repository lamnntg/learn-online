import express from "express";
import { httpStatusCode } from "../../utillities/constants";
import { authWebController } from "../../controllers/web/auth.web";
import { verifySignUp } from "../../middlewares/verifySignUp";

const router = express.Router();

router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/status", (req, res) => {
  res.status(httpStatusCode.OK).json({
    status: "Hello World",
  });
});

router.post(
  "/api/auth/signup",
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  authWebController.signup
);

router.post("/api/auth/signin", authWebController.signin);

export const authRouter = router;
