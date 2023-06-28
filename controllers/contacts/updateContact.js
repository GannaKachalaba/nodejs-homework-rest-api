const { httpError, ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models/contact");

const updateContact = async (req, res) => {
  const { body, params } = req;
  const { id } = params;
  const result = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = {
  updateContact: ctrlWrapper(updateContact),
};
