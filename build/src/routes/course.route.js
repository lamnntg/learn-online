"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.courseRoute = void 0;

var _express = _interopRequireDefault(require("express"));

var _authJwt = require("../middlewares/authJwt");

var _course = require("../controllers/course.controller");

var router = _express["default"].Router();

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});
router.get("/get/all", [_authJwt.authJwt.verifyToken], _course.courseController.getAllCourse);
router.get("/create", [_authJwt.authJwt.verifyToken], _course.courseController.createCourse);
var courseRoute = router;
exports.courseRoute = courseRoute;