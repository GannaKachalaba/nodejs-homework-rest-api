const fs = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === id);
  return result || null;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const updatedContacts = contacts.findIndex((item) => item.id === id);
  if (updatedContacts === -1) {
    return null;
  }

  const [removeContact] = contacts.splice(updatedContacts, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removeContact;
};

const addContact = async ({ name, email, phone }) => {
  if (!name) {
    throw new Error("Missing required name field");
  }

  const contacts = await listContacts();
  const newContact = {
    id: uuid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (id, body) => {
  if (!Object.keys(body).length) {
    throw new Error("missing fields");
  }

  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((contact) => contact.id === id);

  if (contactIndex === -1) {
    return null;
  }

  const contactToUpdate = contacts[contactIndex];
  Object.assign(contactToUpdate, body);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contactToUpdate;
};
module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
