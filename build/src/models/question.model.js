"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestionModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var questionSchema = new Schema({
  question: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: false
  },
  homework: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "Homework"
  },
  exam_course: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "ExamCourse"
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  type: {
    type: String,
    required: false
  },
  answers: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Answer"
  }],
  point: {
    type: Number,
    required: true,
    "default": 1
  }
}, {
  timestamps: true
});

var QuestionModel = _mongoose["default"].model("Question", questionSchema);

exports.QuestionModel = QuestionModel;