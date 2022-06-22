"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.questionService = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _imgBB = require("../apis/imgBB.api");

var _userQuestion = require("../models/userQuestion.model");

var updateQuestionById = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id, data) {
    var qa, question, result, value;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _userQuestion.UserQuestionModel.findOne({
              _id: _mongoose["default"].Types.ObjectId(id)
            });

          case 3:
            question = _context.sent;

            if (question) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", {
              error: true,
              message: 'Question not found'
            });

          case 6:
            if (!data.image) {
              _context.next = 11;
              break;
            }

            _context.next = 9;
            return (0, _imgBB.uploadImage)(data.image).then(function (result) {
              qa = {
                title: data.title,
                description: data.desc,
                url: result,
                author: data.author,
                content: data.content
              };
            });

          case 9:
            _context.next = 13;
            break;

          case 11:
            result = data.image === false ? '' : question.url;
            qa = {
              title: data.title,
              description: data.desc,
              url: result,
              author: data.author,
              content: data.content
            };

          case 13:
            _context.next = 15;
            return _userQuestion.UserQuestionModel.findByIdAndUpdate({
              _id: _mongoose["default"].Types.ObjectId(id)
            }, qa);

          case 15:
            value = _context.sent;
            return _context.abrupt("return", value);

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 19]]);
  }));

  return function updateQuestionById(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var questionService = {
  updateQuestionById: updateQuestionById
};
exports.questionService = questionService;