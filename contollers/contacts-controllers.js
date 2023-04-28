const Joi = require("joi");

const contacts = require("../models/contacts");
const { HttpError } = require("../helpers");
const { controllerDecorator } = require("../utils/controller-decorator");

const addSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": `"Name" is a required field ` }),
  email: Joi.string().email().required().messages({
    "any.required": `"Email" is a required field`,
    "string.email": "Email must be a valid email",
  }),
  phone: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "any.required": `"Phone" is a required field`,
      "string.pattern.base": "Phone should include only digits",
      "string.length": "Phone length must be 11 characters long",
    }),
});

const getContacts = async (req, res) => {
  const listContacts = await contacts.listContacts();
  res.json(listContacts);
};

const getContactsById = async (req, res) => {
  const contact = await contacts.getContactById(req.params.id);
  if (!contact) {
    throw HttpError(404, `Contact with "${req.params.id}" ID is not found`);
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const newContact = await contacts.addContact(req.body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const updatedContact = await contacts.updateContact(req.params.id, req.body);
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updatedContact);
};

const deleteContact = async (req, res) => {
  const deletedContact = await contacts.removeContact(req.params.id);
  res.json(deletedContact);
};

module.exports = {
  getContacts: controllerDecorator(getContacts),
  getContactsById: controllerDecorator(getContactsById),
  addContact: controllerDecorator(addContact),
  updateContact: controllerDecorator(updateContact),
  deleteContact: controllerDecorator(deleteContact),
};
