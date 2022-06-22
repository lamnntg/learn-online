"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homeworkRouter = void 0;

var _express = _interopRequireDefault(require("express"));

var _authJwt = require("../middlewares/authJwt");

var _homework = require("../controllers/homework.controller");

var router = _express["default"].Router();

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});
router.get("/get/by-classroom/:id", [_authJwt.authJwt.verifyToken], _homework.homeworkController.getHomeworkByClassroom);
router.get("/:id", [_authJwt.authJwt.verifyToken], _homework.homeworkController.getHomeworkDetail);
router.post("/create", [_authJwt.authJwt.verifyToken, _authJwt.authJwt.isModerator], _homework.homeworkController.createHomework);
router.post("/:id/finish", [_authJwt.authJwt.verifyToken], _homework.homeworkController.finishHomework);
router.get("/:id/result", [_authJwt.authJwt.verifyToken], _homework.homeworkController.getResultHomework);
router.post("/create/by-pdf", [_authJwt.authJwt.verifyToken], _homework.homeworkController.createHomeworkByPdf);
router.post("/:id/update", [_authJwt.authJwt.verifyToken], _homework.homeworkController.updateHomework);
router.post("/delete", [_authJwt.authJwt.verifyToken, _authJwt.authJwt.isModerator], _homework.homeworkController.deleteHomework);
var homeworkRouter = router;
exports.homeworkRouter = homeworkRouter;