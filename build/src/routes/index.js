"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webRouter = void 0;

var _express = _interopRequireDefault(require("express"));

var _constants = require("../utillities/constants");

var _auth = require("./auth.route");

var _user = require("./user.route");

var _classroom = require("./classroom.route");

var _homework = require("./homework.route");

var _qa = require("./qa.route");

var _course = require("./course.route");

var router = _express["default"].Router();

router.use("/auth", _auth.authRouter);
router.use("/user", _user.userRouter);
router.use("/classroom", _classroom.classroomRouter);
router.use("/homework", _homework.homeworkRouter);
router.use("/qa", _qa.qaRouter);
router.use("/course", _course.courseRoute);
router.get("/status", function (req, res) {
  res.status(_constants.httpStatusCode.OK).json({
    status: "Hello World"
  });
});
var webRouter = router;
exports.webRouter = webRouter;