"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homeworkService = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _homework = require("../models/homework.model");

var _classroom = require("../models/classroom.model");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _express = _interopRequireDefault(require("express"));

var _question = require("../models/question.model");

var _answer = require("../models/answer.model");

var _lodash = require("lodash");

/**
 * getHomeworkClassroom
 * @param {int} id
 * @returns
 */
var getHomeworkClassroom = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id) {
    var classroom, homeworks;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _classroom.ClassroomModel.findOne({
              _id: _mongoose["default"].Types.ObjectId(id)
            });

          case 3:
            classroom = _context.sent;

            if (classroom) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", {
              error: true,
              message: "Classroom not found"
            });

          case 6:
            homeworks = _homework.HomeworkModel.find({
              classroom: _mongoose["default"].Types.ObjectId(id)
            }).populate({
              path: "author",
              populate: {
                path: "roles"
              }
            }).exec();
            return _context.abrupt("return", homeworks);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function getHomeworkClassroom(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * createHomework
 * @param {int} id
 * @returns
 */


var createHomework = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
    var newHomework;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            newHomework = new _homework.HomeworkModel({
              title: data.title,
              description: data.description,
              classroom: _mongoose["default"].Types.ObjectId(data.classroom),
              types: data.types,
              startTime: data.startTime,
              questions: [],
              author: _mongoose["default"].Types.ObjectId(data.author),
              time: data.time
            });
            data.questions.forEach(function (question) {
              var newQuestion = new _question.QuestionModel({
                question: question.questionText,
                url: question.questionImage,
                homework: _mongoose["default"].Types.ObjectId(newHomework._id),
                author: _mongoose["default"].Types.ObjectId(data.author),
                point: question.point,
                type: question.type,
                answers: []
              });
              newHomework.questions.push(newQuestion._id);
              question.options.forEach(function (option) {
                var answer = new _answer.AnswerModel({
                  answer: option.optionText,
                  isCorrect: option.isCorrect,
                  url: option.optionImage ? option.optionImage : null,
                  question: _mongoose["default"].Types.ObjectId(newQuestion._id)
                });
                answer.save();
                newQuestion.answers.push(answer._id);
              });
              newQuestion.save();
            });
            _context2.next = 5;
            return newHomework.save();

          case 5:
            return _context2.abrupt("return", newHomework);

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            throw new Error(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function createHomework(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * handleImagesExam
 * @returns
 */


var handleImagesUrlExam = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(classroomId, userId, data) {
    var questions;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            questions = data.map(function (question) {
              return {
                questionText: 'Trả lời câu hỏi trong hình ảnh dưới',
                questionImage: question,
                author: userId,
                point: 1,
                type: 'choose',
                options: []
              };
            });
            return _context3.abrupt("return", {
              title: 'Exam PDF',
              description: 'Exam PDF',
              classroom: classroomId,
              types: 'multiple choice',
              startTime: null,
              questions: questions,
              author: userId,
              time: 60
            });

          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3["catch"](0);
            throw new Error(_context3.t0);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 5]]);
  }));

  return function handleImagesUrlExam(_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var updateHomework = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id, data) {
    var homework, newHomework, responses;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _homework.HomeworkModel.findOne({
              _id: _mongoose["default"].Types.ObjectId(id)
            });

          case 3:
            homework = _context4.sent;

            if (!(homework === null)) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", {
              error: true,
              message: "Homework not found"
            });

          case 6:
            newHomework = {
              title: data.title,
              description: data.description,
              classroom: _mongoose["default"].Types.ObjectId(data.classroom),
              types: data.types,
              startTime: data.startTime,
              questions: [],
              author: _mongoose["default"].Types.ObjectId(data.author),
              time: data.time
            };
            data.questions.forEach(function (question) {
              var newQuestion = new _question.QuestionModel({
                question: question.questionText,
                url: question.questionImage,
                homework: _mongoose["default"].Types.ObjectId(newHomework._id),
                author: _mongoose["default"].Types.ObjectId(data.author),
                point: question.point,
                type: question.type,
                answers: []
              });
              newHomework.questions.push(newQuestion._id);
              question.options.forEach(function (option) {
                var answer = new _answer.AnswerModel({
                  answer: option.optionText,
                  isCorrect: option.isCorrect,
                  url: option.optionImage ? option.optionImage : null,
                  question: _mongoose["default"].Types.ObjectId(newQuestion._id)
                });
                answer.save();
                newQuestion.answers.push(answer._id);
              });
              newQuestion.save();
            });
            _context4.next = 10;
            return _homework.HomeworkModel.findOneAndUpdate({
              _id: _mongoose["default"].Types.ObjectId(id)
            }, newHomework);

          case 10:
            responses = _context4.sent;
            return _context4.abrupt("return", responses);

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](0);
            throw new Error(_context4.t0);

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 14]]);
  }));

  return function updateHomework(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

var deleteHomework = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _homework.HomeworkModel.findByIdAndRemove(id);

          case 3:
            _question.QuestionModel.find({
              homework: _mongoose["default"].Types.ObjectId(id)
            }).exec(function (err, questions) {
              questions.map( /*#__PURE__*/function () {
                var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(question) {
                  return _regenerator["default"].wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.next = 2;
                          return _answer.AnswerModel.deleteMany({
                            question: _mongoose["default"].Types.ObjectId(question._id)
                          });

                        case 2:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                }));

                return function (_x9) {
                  return _ref6.apply(this, arguments);
                };
              }());
            });

            _context6.next = 6;
            return _question.QuestionModel.deleteMany({
              homework: _mongoose["default"].Types.ObjectId(id)
            });

          case 6:
            return _context6.abrupt("return", true);

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);
            throw new Error(_context6.t0);

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 9]]);
  }));

  return function deleteHomework(_x8) {
    return _ref5.apply(this, arguments);
  };
}();

var homeworkService = {
  getHomeworkClassroom: getHomeworkClassroom,
  createHomework: createHomework,
  handleImagesUrlExam: handleImagesUrlExam,
  updateHomework: updateHomework,
  deleteHomework: deleteHomework
};
exports.homeworkService = homeworkService;