"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.qaRouter = void 0;

var _express = _interopRequireDefault(require("express"));

var _authJwt = require("../middlewares/authJwt");

var _qa = require("../controllers/qa.controller");

var router = _express["default"].Router();

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
  next();
});
router.get('/get/all', [_authJwt.authJwt.verifyToken], _qa.qaController.getAllQuestions);
router.get('/get/by-user/:id', [_authJwt.authJwt.verifyToken], _qa.qaController.getAllQuestionsByUser);
router.post('/create', [_authJwt.authJwt.verifyToken], _qa.qaController.createQA);
router.get('/get/:id', [_authJwt.authJwt.verifyToken], _qa.qaController.getQuestionById);
router["delete"]('/delete/:id', [_authJwt.authJwt.verifyToken], _qa.qaController.deleteQuestionById);
router.put('/:id', [_authJwt.authJwt.verifyToken], _qa.qaController.updateQuestionById);
router.get('/get-answers/:id', [_authJwt.authJwt.verifyToken], _qa.qaController.getUserAnswer);
router.post('/store-answers', [_authJwt.authJwt.verifyToken], _qa.qaController.storeUserAnswer);
var qaRouter = router;
exports.qaRouter = qaRouter;