"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocumentModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var documentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  classroom: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Classroom"
  },
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
}, {
  timestamps: true
});

var DocumentModel = _mongoose["default"].model("Document", documentSchema);

exports.DocumentModel = DocumentModel;