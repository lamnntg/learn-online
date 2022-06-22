"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialDB = exports.connectDB = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _environments = require("../config/environments");

var _auth = _interopRequireDefault(require("../models/auth"));

var _subject = require("../models/subject.model");

var Role = _auth["default"].role;

var connectDB = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var client;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _mongoose["default"].connect(_environments.env.MONGODB_URI, {
              useNewUrlParser: true,
              useUnifiedTopology: true
            });

          case 2:
            client = _context.sent;
            console.log("connect to mongo DB ... ");

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function connectDB() {
    return _ref.apply(this, arguments);
  };
}();

exports.connectDB = connectDB;

var initialDB = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            Role.estimatedDocumentCount(function (err, count) {
              if (!err && count === 0) {
                new Role({
                  name: "user"
                }).save(function (err) {
                  if (err) {
                    console.log("error", err);
                  }

                  console.log("added 'user' to roles collection");
                });
                new Role({
                  name: "moderator"
                }).save(function (err) {
                  if (err) {
                    console.log("error", err);
                  }

                  console.log("added 'moderator' to roles collection");
                });
                new Role({
                  name: "admin"
                }).save(function (err) {
                  if (err) {
                    console.log("error", err);
                  }

                  console.log("added 'admin' to roles collection");
                });
              }
            });

            _subject.SubjectModel.estimatedDocumentCount(function (err, count) {
              if (!err && count === 0) {
                new _subject.SubjectModel({
                  name: "Default Subject"
                }).save(function (err) {
                  if (err) {
                    console.log("error", err);
                  }

                  console.log("added 'Default Subject' to Subject collection");
                });
              }
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function initialDB() {
    return _ref2.apply(this, arguments);
  };
}();

exports.initialDB = initialDB;