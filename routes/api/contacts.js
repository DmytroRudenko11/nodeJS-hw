const express = require("express");

const router = express.Router();

const { isValidId } = require("../../middlewares");
const { validateBody } = require("../../middlewares");
const { authenticate } = require("../../middlewares");
const schemas = require("../../schemas/contactsSchemas");

const contactsControlles = require("../../contollers/contacts-controllers.js");

router.get("/", authenticate, contactsControlles.getContacts);

router.get("/:id", authenticate, isValidId, contactsControlles.getContactsById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  contactsControlles.addContact
);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  contactsControlles.updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  contactsControlles.updateFavorite
);

router.delete(
  "/:id",
  authenticate,
  isValidId,
  contactsControlles.deleteContact
);

module.exports = router;
