const { httpError, ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models/contact");

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted " });
};

module.exports = {
  removeContact: ctrlWrapper(removeContact),
};
