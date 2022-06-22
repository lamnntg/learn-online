"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userController = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = require("../services/user.serivce");

var _constants = require("../utillities/constants");

var _imgBB = require("../apis/imgBB.api");

var _user2 = require("../models/user.model");

var _userClassroomPending = require("../models/userClassroomPending.model");

var _classroom = require("../models/classroom.model");

var _mongoose = _interopRequireDefault(require("mongoose"));

var allAccess = function allAccess(req, res) {
  res.status(200).send('Public Content.');
};

var userBoard = function userBoard(req, res) {
  res.status(200).send('User Content.');
};

var adminBoard = function adminBoard(req, res) {
  res.status(200).send('Admin Content.');
};

var moderatorBoard = function moderatorBoard(req, res) {
  res.status(200).send('Moderator Content.');
};

var updateUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var id, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            id = req.params.id;
            _context.next = 4;
            return _user.userService.updateUser(id, req.body);

          case 4:
            result = _context.sent;
            res.status(_constants.httpStatusCode.OK).json({
              result: result
            });
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
              message: new Error(_context.t0).message
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function updateUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var updateAvatar = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, id, avatar;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body = req.body, id = _req$body.id, avatar = _req$body.avatar;
            _context3.next = 4;
            return (0, _imgBB.uploadImage)(avatar).then( /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(result) {
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return _user2.UserModel.findOneAndUpdate({
                          _id: id
                        }, {
                          avatar_url: result
                        });

                      case 2:
                        //validate
                        res.status(200).json({
                          result: result
                        });

                      case 3:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x5) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 4:
            _context3.next = 9;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);
            res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
              message: new Error(_context3.t0).message
            });

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 6]]);
  }));

  return function updateAvatar(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getUserById = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            _context4.next = 4;
            return _user.userService.getUserById(id);

          case 4:
            result = _context4.sent;
            res.status(_constants.httpStatusCode.OK).json({
              result: result
            });
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
              message: new Error(_context4.t0).message
            });

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 8]]);
  }));

  return function getUserById(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

var getClassroomInvite = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var email;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            try {
              email = req.body.email;

              _userClassroomPending.UserClassroomPendingModel.find({
                email: email
              }).populate({
                path: 'classroom'
              }).exec(function (err, users) {
                if (err) {
                  res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({});
                }

                res.status(_constants.httpStatusCode.OK).json({
                  result: users
                });
              });
            } catch (error) {
              res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: new Error(error).message
              });
            }

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getClassroomInvite(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

var submitInvite = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _req$body2, id, status, userId, classroomId;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _req$body2 = req.body, id = _req$body2.id, status = _req$body2.status, userId = _req$body2.userId, classroomId = _req$body2.classroomId;
            _context6.next = 4;
            return _userClassroomPending.UserClassroomPendingModel.findOneAndRemove({
              _id: _mongoose["default"].Types.ObjectId(id)
            });

          case 4:
            if (!(status === 'accepted')) {
              _context6.next = 7;
              break;
            }

            _context6.next = 7;
            return _classroom.ClassroomModel.findOneAndUpdate({
              _id: _mongoose["default"].Types.ObjectId(classroomId)
            }, {
              $push: {
                users: userId
              }
            });

          case 7:
            res.status(_constants.httpStatusCode.OK).json({
              result: true
            });
            _context6.next = 13;
            break;

          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6["catch"](0);
            res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
              message: new Error(_context6.t0).message
            });

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 10]]);
  }));

  return function submitInvite(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();

var userController = {
  allAccess: allAccess,
  userBoard: userBoard,
  adminBoard: adminBoard,
  moderatorBoard: moderatorBoard,
  updateUser: updateUser,
  updateAvatar: updateAvatar,
  getUserById: getUserById,
  getClassroomInvite: getClassroomInvite,
  submitInvite: submitInvite
};
exports.userController = userController;