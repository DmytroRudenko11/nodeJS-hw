const Contact = require("../models/contact");

const { HttpError } = require("../helpers");
const { controllerDecorator } = require("../utils/controller-decorator");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const listContacts = await Contact.find({ owner }, "-updatedAt");
  res.json(listContacts);
};

const getContactsById = async (req, res) => {
  console.log(req.params.id);
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw HttpError(404, `Contact with "${id}" ID is not found`);
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updatedContact);
};

const updateFavorite = async (req, res) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updatedContact);
};

const deleteContact = async (req, res) => {
  const deletedContact = await Contact.findByIdAndRemove(req.params.id);
  if (!deletedContact) {
    throw HttpError(404, "Not found");
  }
  res.json(deletedContact);
};

module.exports = {
  getContacts: controllerDecorator(getContacts),
  getContactsById: controllerDecorator(getContactsById),
  addContact: controllerDecorator(addContact),
  updateContact: controllerDecorator(updateContact),
  updateFavorite: controllerDecorator(updateFavorite),
  deleteContact: controllerDecorator(deleteContact),
};
