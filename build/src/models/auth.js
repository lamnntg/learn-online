"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _role = require("./role.model");

var _user = require("./user.model");

_mongoose["default"].Promise = global.Promise;
var auth = {};
auth.mongoose = _mongoose["default"];
auth.user = _user.UserModel;
auth.role = _role.RoleModel;
auth.ROLES = ["user", "admin", "moderator"];
var _default = auth;
exports["default"] = _default;