const express = require("express");

const router = express.Router();

const { isValidId } = require("../../middlewares");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contactsSchemas");

const contactsControlles = require("../../contollers/contacts-controllers.js");

router.get("/", contactsControlles.getContacts);

router.get("/:id", isValidId, contactsControlles.getContactsById);

router.post(
  "/",
  validateBody(schemas.addSchema),
  contactsControlles.addContact
);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.addSchema),
  contactsControlles.updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  contactsControlles.updateFavorite
);

router.delete("/:id", isValidId, contactsControlles.deleteContact);

module.exports = router;
