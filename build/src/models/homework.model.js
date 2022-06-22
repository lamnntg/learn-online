"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeworkModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var homeworkSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  classroom: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Classroom"
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  types: {
    type: String,
    required: false,
    "enum": ["material", "short answer", "long answer", "multiple choice", "checkbox"]
  },
  questions: [{
    type: Schema.Types.ObjectId,
    required: false,
    ref: "Question"
  }],
  startTime: {
    type: Date,
    required: false
  },
  time: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

var HomeworkModel = _mongoose["default"].model("Homework", homeworkSchema);

exports.HomeworkModel = HomeworkModel;