"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.env = void 0;

require("dotenv").config();

var env = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  APP_WS_PORT: process.env.APP_WS_PORT,
  IMGBB_API_KEY: process.env.IMGBB_API_KEY,
  CONVERT_API_SECRET_KEY: process.env.CONVERT_API_SECRET_KEY
};
exports.env = env;