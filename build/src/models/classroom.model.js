"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClassroomModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var classroomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  owner: {
    type: _mongoose["default"].Types.ObjectId,
    required: true
  },
  moderators: [{
    type: _mongoose["default"].Types.ObjectId,
    ref: "User"
  }],
  users: [{
    type: _mongoose["default"].Types.ObjectId,
    ref: "User"
  }],
  description: {
    type: String
  }
});

var ClassroomModel = _mongoose["default"].model("Classroom", classroomSchema);

exports.ClassroomModel = ClassroomModel;