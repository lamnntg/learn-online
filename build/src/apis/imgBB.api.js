"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImage = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _environments = require("../config/environments");

var _formData = _interopRequireDefault(require("form-data"));

var _lodash = require("lodash");

var uploadImage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(imageBase64) {
    var bodyFormData, base64Content, url;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            bodyFormData = new _formData["default"]();
            base64Content = imageBase64.replace(/^data:image\/[a-z]+;base64,/, ""); // bodyFormData.append('key', env.IMGBB_API_KEY)

            bodyFormData.append('image', base64Content);
            _context.next = 5;
            return (0, _axios["default"])({
              method: 'post',
              url: "https://api.imgbb.com/1/upload?key=".concat(_environments.env.IMGBB_API_KEY),
              headers: bodyFormData.getHeaders(),
              data: bodyFormData
            }).then(function (resolve) {
              url = resolve.data.data.image.url;
            })["catch"](function (error) {
              return console.log(error);
            });

          case 5:
            return _context.abrupt("return", url);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function uploadImage(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.uploadImage = uploadImage;