const contactsOperations = require("../../models/contacts");

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsOperations.removeContact(id);
  if (!result) {
    const error = new Error(`Not found`);
    error.status = 404;
    throw error;
  }
  res.json({ message: "contact deleted " });
};

module.exports = removeContact;
