"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classroomController = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classroom = require("../services/classroom.service");

var _constants = require("../utillities/constants");

var _classroomNotification = require("../models/classroomNotification.model");

var _document = require("../models/document.model");

var _userClassroomPending = require("../models/userClassroomPending.model");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _user = require("../models/user.model");

var Schema = _mongoose["default"].Schema;

var createClassroom = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _classroom.classroomService.createClassroom(req.body);

          case 3:
            result = _context.sent;
            res.status(_constants.httpStatusCode.OK).json({
              result: result
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
              message: new Error(_context.t0).message
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function createClassroom(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getClassroomById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _classroom.classroomService.getClassroomById(req.params.id);

          case 3:
            result = _context2.sent;
            res.status(_constants.httpStatusCode.OK).json({
              result: result
            });
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
              message: new Error(_context2.t0).message
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function getClassroomById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * getClassroomByUser
 * @param {*} req
 * @param {*} res
 */


var getClassroomByUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _classroom.classroomService.getClassroomByUser(req.params.id);

          case 3:
            result = _context3.sent;
            res.status(_constants.httpStatusCode.OK).json({
              result: result
            });
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
              message: new Error(_context3.t0).message
            });

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function getClassroomByUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * getClassroomByModerator
 * @param {*} req
 * @param {*} res
 */


var getClassroomByModerator = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _classroom.classroomService.getClassroomByModerator(req.params.id);

          case 3:
            result = _context4.sent;
            res.status(_constants.httpStatusCode.OK).json({
              result: result
            });
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
              message: new Error(_context4.t0).message
            });

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function getClassroomByModerator(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var updateUserClassroom = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _classroom.classroomService.updateUserClassroom(req.params.id, req.body);

          case 3:
            result = _context5.sent;
            res.status(_constants.httpStatusCode.OK).json({
              result: result
            });
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
              message: new Error(_context5.t0).message
            });

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function updateUserClassroom(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var updateModeratorClassroom = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _classroom.classroomService.updateModeratorClassroom(req.params.id, req.body);

          case 3:
            result = _context6.sent;
            res.status(_constants.httpStatusCode.OK).json({
              result: result
            });
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
              message: new Error(_context6.t0).message
            });

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));

  return function updateModeratorClassroom(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

var joinClassroom = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _classroom.classroomService.joinClassroom(req.body);

          case 3:
            result = _context7.sent;
            res.status(_constants.httpStatusCode.OK).json({
              result: result
            });
            _context7.next = 10;
            break;

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
              message: new Error(_context7.t0).message
            });

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 7]]);
  }));

  return function joinClassroom(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

var createClassroomNotification = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var classroomNotification;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            classroomNotification = new _classroomNotification.ClassroomNotificationModel({
              content: req.body.content,
              classroom: _mongoose["default"].Types.ObjectId(req.params.id),
              author_id: _mongoose["default"].Types.ObjectId(req.body.author_id),
              author_name: req.body.author_name,
              avatar_url: req.body.avatar_url
            }).save(function (err, result) {
              if (err) {
                res.status(500).send({
                  message: err
                });
                return;
              }

              if (result) {
                res.status(200).json(result);
              }
            });

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function createClassroomNotification(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

var getClassroomNotifications = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _classroomNotification.ClassroomNotificationModel.find({
              classroom: req.params.id
            }).exec(function (err, notifications) {
              if (err) {
                res.status(500).send({
                  message: err
                });
              }

              res.status(200).json(notifications);
            });

          case 1:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function getClassroomNotifications(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

var deleteClassroomNotification = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _classroomNotification.ClassroomNotificationModel.deleteOne({
              _id: req.params.id
            }).exec(function (err, result) {
              if (err) {
                res.status(500).send({
                  message: err
                });
              }

              res.status(200).json(result);
            });

          case 1:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function deleteClassroomNotification(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

var updateClassroomNotification = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _classroomNotification.ClassroomNotificationModel.updateOne({
              _id: req.params.id
            }, {
              content: req.body.content
            }).exec(function (err, result) {
              if (err) {
                res.status(500).send({
                  message: err
                });
              }

              res.status(200).json(result);
            });

          case 1:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function updateClassroomNotification(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

var getDocuments = function getDocuments(req, res) {
  _document.DocumentModel.find({
    classroom: req.params.id
  }).populate("author", "__v").exec(function (err, documents) {
    if (err) {
      res.status(500).send({
        message: err
      });
    }

    res.status(200).json(documents);
  });
};

var createDocument = function createDocument(req, res) {
  var document = new _document.DocumentModel({
    title: req.body.title,
    classroom: _mongoose["default"].Types.ObjectId(req.params.id),
    url: req.body.url,
    author: _mongoose["default"].Types.ObjectId(req.body.author_id),
    type: req.body.type
  }).save(function (err, result) {
    if (err) {
      res.status(500).send({
        message: err
      });
      return;
    }

    if (result) {
      res.status(200).json(result);
    }
  });
};

var deleteDocument = function deleteDocument(req, res) {
  _document.DocumentModel.deleteOne({
    _id: req.params.id
  }).exec(function (err, result) {
    if (err) {
      res.status(500).send({
        message: err
      });
    }

    res.status(200).json(result);
  });
};

var storeUsersImport = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
    var users, returnData;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            users = req.body.users;
            returnData = [];
            _context13.next = 5;
            return Promise.all(users.map( /*#__PURE__*/function () {
              var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(user) {
                var userClassroomPending;
                return _regenerator["default"].wrap(function _callee12$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        _context12.next = 2;
                        return _user.UserModel.findOneAndUpdate({
                          email: user.email
                        }, {
                          status: "pending"
                        });

                      case 2:
                        userClassroomPending = new _userClassroomPending.UserClassroomPendingModel({
                          classroom: _mongoose["default"].Types.ObjectId(req.params.id),
                          address: user.address,
                          name: user.name,
                          email: user.email,
                          phone: user.phone
                        });
                        _context12.next = 5;
                        return userClassroomPending.save();

                      case 5:
                        returnData.push(userClassroomPending);

                      case 6:
                      case "end":
                        return _context12.stop();
                    }
                  }
                }, _callee12);
              }));

              return function (_x25) {
                return _ref13.apply(this, arguments);
              };
            }()));

          case 5:
            res.status(_constants.httpStatusCode.OK).json({
              result: returnData
            });
            _context13.next = 11;
            break;

          case 8:
            _context13.prev = 8;
            _context13.t0 = _context13["catch"](0);
            res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
              message: new Error(_context13.t0).message
            });

          case 11:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 8]]);
  }));

  return function storeUsersImport(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();

var getUsersPending = function getUsersPending(req, res) {
  console.log(req.params.id);

  try {
    _userClassroomPending.UserClassroomPendingModel.find({
      classroom: req.params.id
    }).exec(function (err, users) {
      if (err) {
        res.status(500).send({
          message: err
        });
      }

      res.status(200).json({
        users: users
      });
    });
  } catch (error) {
    res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: new Error(error).message
    });
  }
};

var classroomController = {
  createClassroom: createClassroom,
  getClassroomByModerator: getClassroomByModerator,
  getClassroomByUser: getClassroomByUser,
  updateUserClassroom: updateUserClassroom,
  updateModeratorClassroom: updateModeratorClassroom,
  joinClassroom: joinClassroom,
  getClassroomById: getClassroomById,
  createClassroomNotification: createClassroomNotification,
  getClassroomNotifications: getClassroomNotifications,
  deleteClassroomNotification: deleteClassroomNotification,
  updateClassroomNotification: updateClassroomNotification,
  getDocuments: getDocuments,
  createDocument: createDocument,
  deleteDocument: deleteDocument,
  storeUsersImport: storeUsersImport,
  getUsersPending: getUsersPending
};
exports.classroomController = classroomController;