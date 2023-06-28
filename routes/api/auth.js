const express = require("express");
const { validation, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");
const { ctrlUsers } = require("../../controllers");

const router = express.Router();

router.post(
  "/register",
  validation(schemas.joiRegisterSchema),
  ctrlUsers.register
);

router.post("/login", validation(schemas.joiLoginSchema), ctrlUsers.login);

router.post("/logout", authenticate, ctrlUsers.logout);

router.get("/current", authenticate, ctrlUsers.getCurrent);

module.exports = router;
