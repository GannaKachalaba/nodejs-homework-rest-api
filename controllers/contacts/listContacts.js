const { ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models/contact");

const listContacts = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const { _id: owner } = req.user;
  const contacts = await Contact.find({ owner, favorite: true }, "", {
    skip,
    limit,
  });
  res.status(200).json(contacts);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
};
