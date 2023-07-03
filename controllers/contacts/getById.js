const { httpError, ctrlWrapper } = require("../../helpers");
const {
  ModelCon: { Contact },
} = require("../../models");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById({ _id: id });
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = {
  getById: ctrlWrapper(getById),
};
