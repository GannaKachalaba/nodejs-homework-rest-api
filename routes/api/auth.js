const express = require("express");
const { validation, authenticate } = require("../../middlewares");
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

router.post("/login", validation(schemasUser.joiLoginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

module.exports = router;
