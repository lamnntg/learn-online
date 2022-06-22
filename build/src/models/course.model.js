"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CourseModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var courseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  sub_title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  exam_course: {
    type: _mongoose["default"].Types.ObjectId,
    required: false,
    ref: "ExamCourse"
  },
  owner: {
    type: _mongoose["default"].Types.ObjectId,
    required: false,
    ref: "User"
  }
});

var CourseModel = _mongoose["default"].model("Course", courseSchema);

exports.CourseModel = CourseModel;