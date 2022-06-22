"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CourseDetailModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var courseDetailSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  course: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Course"
  },
  url: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
});

var CourseDetailModel = _mongoose["default"].model("CourseDetail", courseDetailSchema);

exports.CourseDetailModel = CourseDetailModel;