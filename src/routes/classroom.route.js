import express from "express";
import { authJwt } from "../middlewares/authJwt";
import { classroomController } from "../controllers/classroom.controller";

const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/create",
  [authJwt.verifyToken, authJwt.isModerator],
  classroomController.createClassroom
);

router.get(
  "/get/by-moderator/:id",
  [authJwt.verifyToken, authJwt.isModerator],
  classroomController.getClassroomByModerator
);

router.get(
  "/get/by-user/:id",
  [authJwt.verifyToken],
  classroomController.getClassroomByUser
);

router.post(
  "/:id/update/user",
  [authJwt.verifyToken, authJwt.isModerator],
  classroomController.updateUserClassroom
);

router.post(
  "/:id/update/moderator",
  [authJwt.verifyToken, authJwt.isModerator],
  classroomController.updateModeratorClassroom
);

router.post(
  "/join",
  [authJwt.verifyToken],
  classroomController.joinClassroom
);

router.get(
  "/:id",
  [authJwt.verifyToken],
  classroomController.getClassroomById
);

router.post(
  "/:id/notification/create",
  [authJwt.verifyToken],
  classroomController.createClassroomNotification
);

router.get(
  "/:id/notifications",
  [authJwt.verifyToken],
  classroomController.getClassroomNotifications
);

router.put(
  "/notification/:id/update",
  [authJwt.verifyToken, authJwt.isModerator],
  classroomController.updateClassroomNotification
);

router.delete(
  "/notification/:id/delete",
  [authJwt.verifyToken, authJwt.isModerator],
  classroomController.deleteClassroomNotification
);

router.get(
  "/:id/documents",
  [authJwt.verifyToken],
  classroomController.getDocuments
);

router.post(
  "/:id/document/create",
  [authJwt.verifyToken, authJwt.isModerator],
  classroomController.createDocument
);

router.delete(
  "/document/:id/delete",
  [authJwt.verifyToken, authJwt.isModerator],
  classroomController.deleteDocument
);

export const classroomRouter = router;
