const express = require("express");
const {
  validation,
  isValidId,
  authenticate,
  validationFavorite,
} = require("../../middlewares");
const {
  ModelCon: { schemas },
} = require("../../models");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, ctrl.addContact);

router.post("/", authenticate, validation(schemas.addSchema), ctrl.addContact);

router.delete("/:id", authenticate, isValidId, ctrl.removeContact);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validationFavorite,
  validation(schemas.addSchema),

  ctrl.updateContact
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validation(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
