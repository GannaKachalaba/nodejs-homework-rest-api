const contactsOperations = require("../../models/contacts");

const listContacts = async (req, res) => {
  const contacts = await contactsOperations.listContacts();
  res.json(contacts);
};

module.exports = listContacts;
