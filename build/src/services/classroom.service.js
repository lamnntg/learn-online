"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classroomService = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classroom = require("../models/classroom.model");

var _subject = require("../models/subject.model");

var _mongoose = _interopRequireDefault(require("mongoose"));

var updateClassroom = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id, data) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _classroom.ClassroomModel.findOneAndUpdate({
              _id: _mongoose["default"].Types.ObjectId(id)
            }, data, {
              returnOriginal: false
            });

          case 3:
            result = _context.sent;
            return _context.abrupt("return", result);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function updateClassroom(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * createClassroom
 * @param {array} data
 * @returns json
 */


var createClassroom = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
    var classroom;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            classroom = new _classroom.ClassroomModel({
              name: data.name,
              subject: data.subject,
              code: data.code,
              room: data.room,
              owner: _mongoose["default"].Types.ObjectId(data.owner),
              moderator: [_mongoose["default"].Types.ObjectId(data.owner)]
            }); //validate

            _context2.prev = 1;
            _context2.next = 4;
            return classroom.save();

          case 4:
            return _context2.abrupt("return", classroom);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](1);
            throw new Error(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 7]]);
  }));

  return function createClassroom(_x3) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * getClassroom
 * @param {int} id
 * @returns
 */


var getClassroom = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
    var classroom;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _classroom.ClassroomModel.findOne({
              _id: _mongoose["default"].Types.ObjectId(id)
            });

          case 3:
            classroom = _context3.sent;
            return _context3.abrupt("return", classroom);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            throw new Error(_context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function getClassroom(_x4) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * getClassroomByOwner
 * @param {int} ownerId
 * @returns
 */


var getClassroomByModerator = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(moderatorId) {
    var classroom;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _classroom.ClassroomModel.find({
              moderator: {
                $in: _mongoose["default"].Types.ObjectId(moderatorId)
              }
            });

          case 3:
            classroom = _context4.sent;
            return _context4.abrupt("return", classroom);

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            throw new Error(_context4.t0);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function getClassroomByModerator(_x5) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * getClassroomByUser
 *
 * @param {int} userId
 * @returns
 */


var getClassroomByUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(userId) {
    var classroom;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _classroom.ClassroomModel.find({
              users: {
                $in: _mongoose["default"].Types.ObjectId(userId)
              }
            });

          case 3:
            classroom = _context5.sent;
            return _context5.abrupt("return", classroom);

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            throw new Error(_context5.t0);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function getClassroomByUser(_x6) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * updateUserClassroom
 *
 * @param {*} userId
 * @param {*} classroomId
 * @returns
 */


var updateUserClassroom = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(classroomId, data) {
    var classroom, newUsers;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _classroom.ClassroomModel.findOne({
              _id: _mongoose["default"].Types.ObjectId(classroomId)
            });

          case 3:
            classroom = _context6.sent;
            newUsers = data.users.map(function (user) {
              return _mongoose["default"].Types.ObjectId(user);
            });
            classroom.users = newUsers;
            _context6.next = 8;
            return classroom.save();

          case 8:
            return _context6.abrupt("return", classroom);

          case 11:
            _context6.prev = 11;
            _context6.t0 = _context6["catch"](0);
            throw new Error(_context6.t0);

          case 14:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 11]]);
  }));

  return function updateUserClassroom(_x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * updateModeratorClassroom
 * @param {*} classroomId
 * @param {*} data
 * @returns
 */


var updateModeratorClassroom = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(classroomId, data) {
    var classroom, newModerators;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _classroom.ClassroomModel.findOne({
              _id: _mongoose["default"].Types.ObjectId(classroomId)
            });

          case 3:
            classroom = _context7.sent;
            newModerators = data.moderator.map(function (moderator) {
              return _mongoose["default"].Types.ObjectId(moderator);
            });
            classroom.moderator = newModerators;
            _context7.next = 8;
            return classroom.save();

          case 8:
            return _context7.abrupt("return", classroom);

          case 11:
            _context7.prev = 11;
            _context7.t0 = _context7["catch"](0);
            throw new Error(_context7.t0);

          case 14:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 11]]);
  }));

  return function updateModeratorClassroom(_x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}();
/**
 * joinClassroom
 * @param {*} data
 * @returns
 */


var joinClassroom = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(data) {
    var classroom;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _classroom.ClassroomModel.findOne({
              code: data.classroomCode
            });

          case 3:
            classroom = _context8.sent;

            if (classroom.users.includes(_mongoose["default"].Types.ObjectId(data.userId))) {
              _context8.next = 9;
              break;
            }

            classroom.users.push(_mongoose["default"].Types.ObjectId(data.userId));
            _context8.next = 8;
            return classroom.save();

          case 8:
            return _context8.abrupt("return", classroom);

          case 9:
            return _context8.abrupt("return", false);

          case 12:
            _context8.prev = 12;
            _context8.t0 = _context8["catch"](0);
            throw new Error(_context8.t0);

          case 15:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 12]]);
  }));

  return function joinClassroom(_x11) {
    return _ref8.apply(this, arguments);
  };
}();

var getClassroomById = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(id) {
    var classroom, users;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _classroom.ClassroomModel.findOne({
              _id: _mongoose["default"].Types.ObjectId(id)
            }).populate({
              path: "users",
              populate: {
                path: "roles"
              }
            }).populate({
              path: "moderators",
              populate: {
                path: "roles"
              }
            }).exec();

          case 3:
            classroom = _context9.sent;
            users = classroom.users.map(function (user) {
              var authorities = [];

              for (var i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
              }

              delete user.roles;
              Object.defineProperty(user, "roles", {
                configurable: false,
                value: authorities
              });
              return user;
            });
            return _context9.abrupt("return", classroom);

          case 8:
            _context9.prev = 8;
            _context9.t0 = _context9["catch"](0);
            throw new Error(_context9.t0);

          case 11:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 8]]);
  }));

  return function getClassroomById(_x12) {
    return _ref9.apply(this, arguments);
  };
}();

var classroomService = {
  updateClassroom: updateClassroom,
  createClassroom: createClassroom,
  getClassroom: getClassroom,
  getClassroomByModerator: getClassroomByModerator,
  getClassroomByUser: getClassroomByUser,
  updateUserClassroom: updateUserClassroom,
  updateModeratorClassroom: updateModeratorClassroom,
  joinClassroom: joinClassroom,
  getClassroomById: getClassroomById
};
exports.classroomService = classroomService;