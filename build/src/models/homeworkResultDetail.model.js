"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeworkResultDetailModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var homeworkResultDetailSchema = new Schema({
  homeworkResult: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "HomeworkResult"
  },
  question: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Question"
  },
  text_answer: {
    type: String,
    nullable: true,
    required: false,
    "default": null
  },
  type: {
    type: String,
    required: true,
    "default": null
  },
  completed: {
    type: Boolean,
    required: true
  },
  answers: [{
    type: Object,
    required: true
  }],
  isCorrect: {
    type: Boolean,
    required: false
  }
}, {
  timestamps: true
});

var HomeworkResultDetailModel = _mongoose["default"].model("HomeworkResultDetail", homeworkResultDetailSchema);

exports.HomeworkResultDetailModel = HomeworkResultDetailModel;