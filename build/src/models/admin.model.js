"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var adminSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar_url: {
    type: String,
    "default": 'https://seud.org/wp-content/uploads/2020/06/avatar-nobody.png'
  }
});

var AdminModel = _mongoose["default"].model('Admin', adminSchema);

exports.AdminModel = AdminModel;