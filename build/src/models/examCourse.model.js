"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CourseDetailModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var examCourseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  course: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Course"
  },
  questions: [{
    type: Schema.Types.ObjectId,
    required: false,
    ref: "Question"
  }],
  time: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var CourseDetailModel = _mongoose["default"].model("ExamCourse", examCourseSchema);

exports.CourseDetailModel = CourseDetailModel;