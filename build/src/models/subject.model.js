"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubjectModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var subjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

var SubjectModel = _mongoose["default"].model("Subject", subjectSchema);

exports.SubjectModel = SubjectModel;