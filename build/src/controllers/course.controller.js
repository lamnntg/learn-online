"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.courseController = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _constants = require("../utillities/constants");

var _course = require("../models/course.model");

var _courseDetail = require("../models/courseDetail.model");

var _userCourse = require("../models/userCourse.model");

var Schema = _mongoose["default"].Schema;

var getAllCourse = function getAllCourse(req, res) {
  try {
    _course.CourseModel.find({}).exec(function (err, courses) {
      if (err) {
        res.status(500).send({
          message: err
        });
      }

      res.status(_constants.httpStatusCode.OK).json({
        data: courses
      });
    });
  } catch (error) {
    res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: new Error(error).message
    });
  }
};

var createCourse = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, course, courseDetails;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            course = new _course.CourseModel({
              title: req.body.title,
              sub_title: req.body.sub_title,
              description: req.body.description,
              exam_course: null,
              owner: ((_req$body = req.body) === null || _req$body === void 0 ? void 0 : _req$body.owner) || null
            });
            _context2.next = 4;
            return course.save();

          case 4:
            courseDetails = req.body.detail;
            Promise.all(courseDetails.map( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(detail) {
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return new _courseDetail.CourseDetailModel({
                          title: detail.title,
                          course: course._id,
                          url: detail.url,
                          time: detail.time
                        }).save();

                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }()));
            return _context2.abrupt("return", res.status(_constants.httpStatusCode.OK).json({
              message: "Course created successfully"
            }));

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
              message: new Error(_context2.t0).message
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function createCourse(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var saveLogCourse = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;

            _userCourse.UserCourseModel.findOne({
              course: req.body.course_id,
              user: req.body.user_id
            }).exec(function (err, userCourse) {
              if (err) {
                res.status(500).send({
                  message: err
                });
              }
            });

            _context3.next = 7;
            break;

          case 4:
            _context3.prev = 4;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(_constants.httpStatusCode.INTERNAL_SERVER_ERROR).json({
              message: new Error(_context3.t0).message
            }));

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 4]]);
  }));

  return function saveLogCourse(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var courseController = {
  getAllCourse: getAllCourse,
  createCourse: createCourse,
  saveLogCourse: saveLogCourse
};
exports.courseController = courseController;