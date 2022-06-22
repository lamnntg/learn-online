"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClassroomNotificationModel = void 0;

var _lodash = require("lodash");

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var classroomNotificationSchema = new Schema({
  content: {
    type: String,
    required: false
  },
  classroom: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Class"
  },
  author_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  author_name: {
    type: String,
    required: true
  },
  avatar_url: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

var ClassroomNotificationModel = _mongoose["default"].model("ClassroomNotification", classroomNotificationSchema);

exports.ClassroomNotificationModel = ClassroomNotificationModel;