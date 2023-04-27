const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contactList = await fs.readFile(contactsPath);
  return JSON.parse(contactList);
};

const getContactById = async (contactId) => {
  const contactList = await listContacts();
  const contact = contactList.find((contact) => contact.id === contactId);
  return contact || null;
};

const addContact = async (body) => {
  const contactList = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contactList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return newContact;
};

const updateContact = async (id, body) => {
  const contactList = await listContacts();
  const contactIndex = contactList.findIndex((contact) => contact.id === id);
  if (contactIndex === -1) {
    return null;
  }
  contactList[contactIndex] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return contactList[contactIndex];
};

const removeContact = async (contactId) => {
  const contactList = await listContacts();
  const contactIndex = contactList.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    return null;
  }
  const [deletedContact] = contactList.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return deletedContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
