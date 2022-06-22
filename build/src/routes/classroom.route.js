"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classroomRouter = void 0;

var _express = _interopRequireDefault(require("express"));

var _authJwt = require("../middlewares/authJwt");

var _classroom = require("../controllers/classroom.controller");

var router = _express["default"].Router();

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});
router.post("/create", [_authJwt.authJwt.verifyToken, _authJwt.authJwt.isModerator], _classroom.classroomController.createClassroom);
router.get("/get/by-moderator/:id", [_authJwt.authJwt.verifyToken, _authJwt.authJwt.isModerator], _classroom.classroomController.getClassroomByModerator);
router.get("/get/by-user/:id", [_authJwt.authJwt.verifyToken], _classroom.classroomController.getClassroomByUser);
router.post("/:id/update/user", [_authJwt.authJwt.verifyToken, _authJwt.authJwt.isModerator], _classroom.classroomController.updateUserClassroom);
router.get("/:id/get-users/pending", [_authJwt.authJwt.verifyToken], _classroom.classroomController.getUsersPending);
router.post("/:id/users/import", [_authJwt.authJwt.verifyToken, _authJwt.authJwt.isModerator], _classroom.classroomController.storeUsersImport);
router.post("/:id/update/moderator", [_authJwt.authJwt.verifyToken, _authJwt.authJwt.isModerator], _classroom.classroomController.updateModeratorClassroom);
router.post("/join", [_authJwt.authJwt.verifyToken], _classroom.classroomController.joinClassroom);
router.get("/:id", [_authJwt.authJwt.verifyToken], _classroom.classroomController.getClassroomById);
router.post("/:id/notification/create", [_authJwt.authJwt.verifyToken], _classroom.classroomController.createClassroomNotification);
router.get("/:id/notifications", [_authJwt.authJwt.verifyToken], _classroom.classroomController.getClassroomNotifications);
router.put("/notification/:id/update", [_authJwt.authJwt.verifyToken, _authJwt.authJwt.isModerator], _classroom.classroomController.updateClassroomNotification);
router["delete"]("/notification/:id/delete", [_authJwt.authJwt.verifyToken, _authJwt.authJwt.isModerator], _classroom.classroomController.deleteClassroomNotification);
router.get("/:id/documents", [_authJwt.authJwt.verifyToken], _classroom.classroomController.getDocuments);
router.post("/:id/document/create", [_authJwt.authJwt.verifyToken, _authJwt.authJwt.isModerator], _classroom.classroomController.createDocument);
router["delete"]("/document/:id/delete", [_authJwt.authJwt.verifyToken, _authJwt.authJwt.isModerator], _classroom.classroomController.deleteDocument);
var classroomRouter = router;
exports.classroomRouter = classroomRouter;
4;