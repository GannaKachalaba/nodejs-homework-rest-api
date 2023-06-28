const { httpError, ctrlWrapper } = require("../../helpers");

const getCurrent = async (req, res) => {
  const { email, name } = req.user;
  if (!req.user) {
    throw httpError(401, "Not authorized");
  }
  res.status(200).join({ email, name });
};

module.export = {
  getCurrent: ctrlWrapper(getCurrent),
};
