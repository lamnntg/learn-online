"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeworkResultModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var homeworkResultSchema = new Schema({
  homework: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Homework"
  },
  totalPoint: {
    type: String,
    required: true,
    "default": 0
  },
  point: {
    type: Number,
    required: false,
    "default": 0
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  times: {
    type: Number,
    required: false,
    "default": 1
  }
}, {
  timestamps: true
});

var HomeworkResultModel = _mongoose["default"].model("HomeworkResult", homeworkResultSchema);

exports.HomeworkResultModel = HomeworkResultModel;