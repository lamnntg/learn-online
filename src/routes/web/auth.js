import express from "express";
import { httpStatusCode } from "../../utillities/constants";

const router = express.Router();

router.get("/status", (req, res) => {
  res.status(httpStatusCode.OK).json({
    status: "Hello World",
  });
});

export const webRouter = router;