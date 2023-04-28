const express = require("express");

const router = express.Router();

const contactsControlles = require("../../contollers/contacts-controllers.js");

router.get("/", contactsControlles.getContacts);

router.get("/:id", contactsControlles.getContactsById);

router.post("/", contactsControlles.addContact);

router.put("/:id", contactsControlles.updateContact);

router.delete("/:id", contactsControlles.deleteContact);

module.exports = router;
