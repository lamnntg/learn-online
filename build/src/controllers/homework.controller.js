"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homeworkController = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _homework = require("../services/homework.service");

var _constants = require("../utillities/constants");

var _homework2 = require("../models/homework.model");

var _homeworkResult = require("../models/homeworkResult.model");

var _homeworkResultDetail = require("../models/homeworkResultDetail.model");

var _cropQuestions = require("../apis/cropQuestions.api");

var _mongoose = _interopRequireDefault(require("mongoose"));

var getHomeworkByClassroom = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _homework.homeworkService.getHomeworkClassroom(req.params.id);

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

  return function getHomeworkByClassroom(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var createHomework = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _homework.homeworkService.createHomework(req.body);

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

  return function createHomework(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getHomeworkDetail = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            try {
              _homework2.HomeworkModel.findOne({
                _id: req.params.id
              }).populate({
                path: "questions",
                populate: {
                  path: "answers"
                }
              }).exec(function (err, homework) {
                if (err) {
                  res.status(500).send({
                    message: err
                  });
                }

                res.status(200).json(homework);
              });
            } catch (error) {
              res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: new Error(error).message
              });
            }

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getHomeworkDetail(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var finishHomework = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            try {
              _homework2.HomeworkModel.findOne({
                _id: req.params.id
              }).exec(function (err, homework) {
                if (err) {
                  res.status(500).send({
                    message: err
                  });
                }

                if (!homework) {
                  return res.status(404).send({
                    message: "homework Not found."
                  });
                }

                var homeworkDetail = req.body.homework;
                var homeworkResultDetail = req.body.answers;

                var currentHomeworkResult = _homeworkResult.HomeworkResultModel.findOne({
                  homework: homeworkDetail._id,
                  user: homeworkDetail.user,
                  classroom: homeworkDetail.classroom
                }); //
                // if (!currentHomeworkResult) {


                var newHomeworkResult = new _homeworkResult.HomeworkResultModel({
                  homework: homeworkDetail._id,
                  totalPoint: homeworkDetail.totalPoint,
                  classroom: homeworkDetail.classroom,
                  user: homeworkDetail.user
                });
                var point = 0;
                homeworkResultDetail.forEach(function (result) {
                  var isCorrect = false;

                  if (result.type == "choose") {
                    var correctAnswer = 0;
                    result.answers.forEach(function (answer) {
                      if (answer.isCorrect === answer.selected) {
                        correctAnswer = correctAnswer + 1;
                      }
                    });

                    if (correctAnswer === result.answers.length) {
                      isCorrect = true;
                      point = point + 1;
                    }
                  }

                  var newHomeworkResultDetail = new _homeworkResultDetail.HomeworkResultDetailModel({
                    homeworkResult: newHomeworkResult._id,
                    question: result.question_id,
                    text_answer: result.text_answer,
                    type: result.type,
                    completed: result.completed,
                    answers: result.answers,
                    isCorrect: isCorrect
                  });
                  newHomeworkResultDetail.save();
                });
                newHomeworkResult.point = point;
                newHomeworkResult.save(); // }

                res.status(200).json(true);
              });
            } catch (error) {
              res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: new Error(error).message
              });
            }

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function finishHomework(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var getResultHomework = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            try {
              _homeworkResult.HomeworkResultModel.find({
                homework: _mongoose["default"].Types.ObjectId(req.params.id)
              }).populate({
                path: "user",
                populate: {
                  path: "roles"
                }
              }).exec(function (err, homeworkResult) {
                if (err) {
                  res.status(500).send({
                    message: err
                  });
                }

                res.status(200).json(homeworkResult);
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

  return function getResultHomework(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var createHomeworkByPdf = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var arrImages, userId, classroomId, questionImages, dataResponses, imagesUrl, data, exam;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            arrImages = req.body.url_images;
            userId = req.body.user_id;
            classroomId = req.body.classroom_id;
            questionImages = arrImages.map( /*#__PURE__*/function () {
              var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(image) {
                var resUrls;
                return _regenerator["default"].wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return (0, _cropQuestions.cropQuestionFromImage)(image.Url);

                      case 2:
                        resUrls = _context6.sent;
                        return _context6.abrupt("return", resUrls.images);

                      case 4:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function (_x13) {
                return _ref7.apply(this, arguments);
              };
            }());
            _context7.next = 7;
            return Promise.all(questionImages);

          case 7:
            dataResponses = _context7.sent;
            imagesUrl = dataResponses.flat();
            _context7.next = 11;
            return _homework.homeworkService.handleImagesUrlExam(classroomId, userId, imagesUrl);

          case 11:
            data = _context7.sent;
            _context7.next = 14;
            return _homework.homeworkService.createHomework(data);

          case 14:
            exam = _context7.sent;
            res.status(200).json({
              exam_id: exam._id
            });
            _context7.next = 21;
            break;

          case 18:
            _context7.prev = 18;
            _context7.t0 = _context7["catch"](0);
            res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
              message: new Error(_context7.t0).message
            });

          case 21:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 18]]);
  }));

  return function createHomeworkByPdf(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

var updateHomework = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _homework.homeworkService.updateHomework(req.params.id, req.body);

          case 3:
            result = _context8.sent;
            res.status(_constants.httpStatusCode.OK).json({
              result: result
            });
            _context8.next = 10;
            break;

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](0);
            res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
              message: new Error(_context8.t0).message
            });

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 7]]);
  }));

  return function updateHomework(_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}();

var deleteHomework = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _homework.homeworkService.deleteHomework(req.body.id);

          case 3:
            result = _context9.sent;
            res.status(_constants.httpStatusCode.OK).json({
              result: result
            });
            _context9.next = 10;
            break;

          case 7:
            _context9.prev = 7;
            _context9.t0 = _context9["catch"](0);
            res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
              message: new Error(_context9.t0).message
            });

          case 10:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 7]]);
  }));

  return function deleteHomework(_x16, _x17) {
    return _ref9.apply(this, arguments);
  };
}();

var homeworkController = {
  getHomeworkByClassroom: getHomeworkByClassroom,
  createHomework: createHomework,
  getHomeworkDetail: getHomeworkDetail,
  finishHomework: finishHomework,
  getResultHomework: getResultHomework,
  createHomeworkByPdf: createHomeworkByPdf,
  updateHomework: updateHomework,
  deleteHomework: deleteHomework
};
exports.homeworkController = homeworkController;