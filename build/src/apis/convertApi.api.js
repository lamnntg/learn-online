"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertPdf2Image = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _environments = require("../config/environments");

var _formData = _interopRequireDefault(require("form-data"));

var convertPdf2Image = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(pdfFile) {
    var bodyFormData, urls;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            bodyFormData = new _formData["default"]();
            bodyFormData.append('File', pdfFile);
            _context.next = 4;
            return (0, _axios["default"])({
              method: 'post',
              url: "https://v2.convertapi.com/convert/pdf/to/png?Secret=".concat(_environments.env.CONVERT_API_SECRET_KEY, "&StoreFile=true"),
              headers: bodyFormData.getHeaders(),
              data: bodyFormData
            }).then(function (resolve) {
              console.log(resolve);
              resolve.Files.forEach(function (file) {
                urls.push(file.Url);
              });
            })["catch"](function (error) {
              return console.log(error);
            });

          case 4:
            return _context.abrupt("return", urls);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function convertPdf2Image(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.convertPdf2Image = convertPdf2Image;