const express = require("express");

const validateContact = require("../../middlewares/validateContact");
const validationFavorite = require("../../middlewares/validationFavorite ");
const isValidId = require("../../middlewares/isValidId");
const validation = require("../../middlewares/validation");
const authenticate = require("../../middlewares/authenticate");

const { schemas } = require("../../models/contact");
const { ctrlContacts } = require("../../controllers");

const router = express.Router();

router.get("/", authenticate, ctrlContacts.listContacts);

router.get("/:id", authenticate, isValidId, ctrlContacts.getById);

router.post(
  "/",
  authenticate,
  validation(schemas.addSchema),
  ctrlContacts.addContact
);

router.delete("/:id", authenticate, isValidId, ctrlContacts.removeContact);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateContact,
  validation(schemas.addSchema),
  ctrlContacts.updateContact
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateContact,
  validationFavorite,
  validation(schemas.updateFavoriteSchema),
  ctrlContacts.updateStatusContact
);

module.exports = router;
