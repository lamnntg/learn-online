"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authRouter = void 0;

var _express = _interopRequireDefault(require("express"));

var _constants = require("../utillities/constants");

var _auth = require("../controllers/auth.controller");

var _verifySignUp = require("../middlewares/verifySignUp");

var router = _express["default"].Router();

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});
router.post("/signup", [_verifySignUp.verifySignUp.checkDuplicateUsernameOrEmail, _verifySignUp.verifySignUp.checkRolesExisted], _auth.authWebController.signup);
router.post("/signin", _auth.authWebController.signin);
var authRouter = router;
exports.authRouter = authRouter;