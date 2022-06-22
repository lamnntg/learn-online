"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnswerModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var answerSchema = new Schema({
  answer: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: false
  },
  isCorrect: {
    type: Boolean,
    required: true
  },
  question: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Question"
  }
}, {
  timestamps: true
});

var AnswerModel = _mongoose["default"].model("Answer", answerSchema);

exports.AnswerModel = AnswerModel;