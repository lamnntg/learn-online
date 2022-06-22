"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserCourseDetailModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var userCourseDetailSchema = new Schema({
  user_course: {
    type: _mongoose["default"].Types.ObjectId,
    required: true,
    ref: "UserCourse"
  },
  status: {
    type: string,
    required: true,
    "enum": ["finished", "learning", "not_learning"],
    "default": "not_learning"
  },
  time_stop: {
    type: String,
    required: false
  }
});

var UserCourseDetailModel = _mongoose["default"].model("UserCourseDetail", userCourseDetailSchema);

exports.UserCourseDetailModel = UserCourseDetailModel;