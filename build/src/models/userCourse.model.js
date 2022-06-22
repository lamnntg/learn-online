"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserCourseModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var userCourseSchema = new Schema({
  course: {
    type: _mongoose["default"].Types.ObjectId,
    required: true,
    ref: "Course"
  },
  status: {
    type: String,
    required: true,
    "enum": ["finished", "learning", "not_learning"],
    "default": "not_learning"
  },
  comment: {
    type: String,
    required: false
  },
  user: {
    type: _mongoose["default"].Types.ObjectId,
    required: true,
    ref: "User"
  }
});

var UserCourseModel = _mongoose["default"].model("UserCourse", userCourseSchema);

exports.UserCourseModel = UserCourseModel;