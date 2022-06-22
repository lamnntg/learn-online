"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBase64 = void 0;

var getBase64 = function getBase64(file) {
  return new Promise(function (resolve, reject) {
    var reader = new window.FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      return resolve(reader.result);
    };

    reader.onerror = function (error) {
      return reject(error);
    };
  });
};

exports.getBase64 = getBase64;