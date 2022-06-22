"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserClassroomPendingModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var userClassroomPendingSchema = new Schema({
  classroom: {
    type: Schema.Types.ObjectId,
    ref: 'Classroom'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    "default": 'Hà Nội, Việt Nam'
  },
  status: {
    type: String,
    "default": 'pending'
  },
  phone: {
    type: String,
    "default": '0967999999'
  }
}, {
  timestamps: true
});

var UserClassroomPendingModel = _mongoose["default"].model('UserClassroomPending', userClassroomPendingSchema);

exports.UserClassroomPendingModel = UserClassroomPendingModel;