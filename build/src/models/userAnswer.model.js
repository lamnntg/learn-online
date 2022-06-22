"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserAnswerModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var UserAnswerSchema = new Schema({
  userQuestion: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "UserQuestion"
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  content: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var UserAnswerModel = _mongoose["default"].model("UserAnswer", UserAnswerSchema);

exports.UserAnswerModel = UserAnswerModel;