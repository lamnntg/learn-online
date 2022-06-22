"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.qaController = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _constants = require("../utillities/constants");

var _userQuestion = require("../models/userQuestion.model");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _imgBB = require("../apis/imgBB.api");

var _question = require("../services/question.service");

var _userAnswer = require("../models/userAnswer.model");

var _convertToBase = require("../helpers/convertToBase64");

var _lodash = require("lodash");

var getAllQuestions = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              _userQuestion.UserQuestionModel.find({}).populate({
                path: 'author'
              }).exec(function (err, questions) {
                if (err) {
                  res.status(500).send({
                    message: err
                  });
                }

                res.status(200).json(questions);
              });
            } catch (error) {
              res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: new Error(error).message
              });
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getAllQuestions(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var createQA = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data = req.body;
            _context2.prev = 1;
            _context2.next = 4;
            return (0, _imgBB.uploadImage)(data.image).then(function (result) {
              var qa = new _userQuestion.UserQuestionModel({
                title: data.title,
                description: data.desc,
                url: result,
                author: data.author,
                content: data.content
              }); //validate

              //validate
              qa.save();
              res.status(200).json(qa);
            });

          case 4:
            _context2.next = 9;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](1);
            res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
              message: new Error(_context2.t0).message
            });

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 6]]);
  }));

  return function createQA(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getAllQuestionsByUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _userQuestion.UserQuestionModel.find({
              author: _mongoose["default"].Types.ObjectId(req.params.id)
            });

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

  return function getAllQuestionsByUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var getQuestionById = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _userQuestion.UserQuestionModel.find({
              _id: _mongoose["default"].Types.ObjectId(req.params.id)
            });

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

  return function getQuestionById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var deleteQuestionById = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            try {
              _userQuestion.UserQuestionModel.findByIdAndDelete({
                _id: _mongoose["default"].Types.ObjectId(req.params.id)
              }, function (err, doc) {
                if (err) {
                  res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: new Error(error).message
                  });
                  return;
                }

                res.status(_constants.httpStatusCode.OK).json({
                  result: true
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

  return function deleteQuestionById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var updateQuestionById = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var data, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            data = req.body;
            _context6.prev = 1;

            if (!data.image) {}

            _context6.next = 5;
            return _question.questionService.updateQuestionById(req.params.id, data);

          case 5:
            result = _context6.sent;
            res.status(_constants.httpStatusCode.OK).json({
              result: result
            });
            _context6.next = 12;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](1);
            res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
              message: new Error(_context6.t0).message
            });

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 9]]);
  }));

  return function updateQuestionById(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

var storeUserAnswer = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var data, userAnswer;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            data = req.body;
            _context7.prev = 1;
            userAnswer = new _userAnswer.UserAnswerModel({
              userQuestion: data.userQuestion,
              user: data.userId,
              content: data.content
            });
            _context7.next = 5;
            return userAnswer.save();

          case 5:
            res.status(_constants.httpStatusCode.OK).json({
              result: userAnswer
            });
            _context7.next = 11;
            break;

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7["catch"](1);
            res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
              message: new Error(_context7.t0).message
            });

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 8]]);
  }));

  return function storeUserAnswer(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

var getUserAnswer = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            try {
              _userAnswer.UserAnswerModel.find({
                userQuestion: _mongoose["default"].Types.ObjectId(req.params.id)
              }).populate("user", "__v").exec(function (err, questions) {
                if (err) {
                  res.status(500).send({
                    message: err
                  });
                }

                res.status(200).json({
                  result: questions
                });
              });
            } catch (error) {
              res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: new Error(error).message
              });
            }

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function getUserAnswer(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

var qaController = {
  getAllQuestions: getAllQuestions,
  createQA: createQA,
  getAllQuestionsByUser: getAllQuestionsByUser,
  getQuestionById: getQuestionById,
  deleteQuestionById: deleteQuestionById,
  updateQuestionById: updateQuestionById,
  storeUserAnswer: storeUserAnswer,
  getUserAnswer: getUserAnswer
};
exports.qaController = qaController;