"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRouter = void 0;

var _express = _interopRequireDefault(require("express"));

var _authJwt = require("../middlewares/authJwt");

var _user = require("../controllers/user.controller");

var router = _express["default"].Router();

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
  next();
});
router.get('/test/all', _user.userController.allAccess);
router.get('/test/user', [_authJwt.authJwt.verifyToken, _authJwt.authJwt.isModerator], _user.userController.userBoard);
router.get('/test/mod', [_authJwt.authJwt.verifyToken, _authJwt.authJwt.isModerator], _user.userController.moderatorBoard);
router.get('/test/admin', [_authJwt.authJwt.verifyToken, _authJwt.authJwt.isAdmin], _user.userController.adminBoard);
router.put('/:id/update', [_authJwt.authJwt.verifyToken], _user.userController.updateUser);
router.post('/avatar/update', [_authJwt.authJwt.verifyToken], _user.userController.updateAvatar);
router.post('/get-invite', [_authJwt.authJwt.verifyToken], _user.userController.getClassroomInvite);
router.post('/submit-invite', [_authJwt.authJwt.verifyToken], _user.userController.submitInvite);
router.get('/:id', [_authJwt.authJwt.verifyToken], _user.userController.getUserById);
var userRouter = router;
exports.userRouter = userRouter;