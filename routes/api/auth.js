const express = require("express");
const { validation, authenticate, upload } = require("../../middlewares");
const {
  ModelUs: { schemasUser },
} = require("../../models");
const ctrl = require("../../controllers/users");

const router = express.Router();

router.post(
  "/register",
  validation(schemasUser.joiRegisterSchema),
  ctrl.register
);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/verify",
  validation(schemasUser.joiVerifyEmailSchema),
  ctrl.resendVerifyEmail
);

router.post("/login", validation(schemasUser.joiLoginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
