const { httpError, ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models/contact");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById({ _id: id });
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(201).json(result);
};

module.exports = {
  getById: ctrlWrapper(getById),
};
