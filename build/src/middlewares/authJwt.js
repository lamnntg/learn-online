"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authJwt = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _auth = _interopRequireDefault(require("../config/auth"));

var _auth2 = _interopRequireDefault(require("../models/auth"));

var User = _auth2["default"].user;
var Role = _auth2["default"].role;

var verifyToken = function verifyToken(req, res, next) {
  var token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  _jsonwebtoken["default"].verify(token, _auth["default"].secret, function (err, decoded) {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }

    req.userId = decoded.id;
    next();
  });
};

var isAdmin = function isAdmin(req, res, next) {
  User.findById(req.userId).exec(function (err, user) {
    if (err) {
      res.status(500).send({
        message: err
      });
      return;
    }

    Role.find({
      _id: {
        $in: user.roles
      }
    }, function (err, roles) {
      if (err) {
        res.status(500).send({
          message: err
        });
        return;
      }

      for (var i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

var isModerator = function isModerator(req, res, next) {
  User.findById(req.userId).exec(function (err, user) {
    if (err) {
      res.status(500).send({
        message: err
      });
      return;
    }

    Role.find({
      _id: {
        $in: user.roles
      }
    }, function (err, roles) {
      if (err) {
        res.status(500).send({
          message: err
        });
        return;
      }

      for (var i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
      return;
    });
  });
};

var authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator
};
exports.authJwt = authJwt;