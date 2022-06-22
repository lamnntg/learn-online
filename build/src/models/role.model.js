"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleModel = void 0;

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var roleSchema = new mongoose.Schema({
  name: String
});
var RoleModel = mongoose.model("Role", roleSchema);
exports.RoleModel = RoleModel;