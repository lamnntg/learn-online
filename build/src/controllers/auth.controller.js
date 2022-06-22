"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authWebController = void 0;

var _auth = _interopRequireDefault(require("../models/auth"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _auth2 = _interopRequireDefault(require("../config/auth"));

var User = _auth["default"].user;
var Role = _auth["default"].role;

var signup = function signup(req, res) {
  var user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: _bcryptjs["default"].hashSync(req.body.password, 8)
  });
  user.save(function (err, user) {
    if (err) {
      res.status(500).send({
        message: err
      });
      return;
    }

    if (req.body.roles) {
      Role.find({
        name: {
          $in: req.body.roles
        }
      }, function (err, roles) {
        if (err) {
          res.status(500).send({
            message: err
          });
          return;
        }

        user.roles = roles.map(function (role) {
          return role._id;
        });
        user.save(function (err) {
          if (err) {
            res.status(500).send({
              message: err
            });
            return;
          }

          res.send({
            message: "User was registered successfully!"
          });
        });
      });
    } else {
      Role.findOne({
        name: "user"
      }, function (err, role) {
        if (err) {
          res.status(500).send({
            message: err
          });
          return;
        }

        user.roles = [role._id];
        user.save(function (err) {
          if (err) {
            res.status(500).send({
              message: err
            });
            return;
          }

          res.send({
            message: "User was registered successfully!"
          });
        });
      });
    }
  });
};

var signin = function signin(req, res) {
  User.findOne({
    username: req.body.username
  }).populate("roles", "-__v").exec(function (err, user) {
    if (err) {
      res.status(500).send({
        message: err
      });
      return;
    }

    if (!user) {
      return res.status(404).send({
        message: "User Not found."
      });
    } //TODO : ban user -> check status account


    var passwordIsValid = _bcryptjs["default"].compareSync(req.body.password, user.password);

    if (req.body.password == user.password) {
      passwordIsValid = true;
    }

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    var token = _jsonwebtoken["default"].sign({
      id: user.id
    }, _auth2["default"].secret, {
      expiresIn: 86400 // 24 hours

    });

    var authorities = [];

    for (var i = 0; i < user.roles.length; i++) {
      authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    }

    res.status(200).send({
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      description: user.description,
      address: user.address,
      status: user.status,
      avatar_url: user.avatar_url,
      roles: authorities,
      accessToken: token
    });
  });
};

var authWebController = {
  signup: signup,
  signin: signin
};
exports.authWebController = authWebController;