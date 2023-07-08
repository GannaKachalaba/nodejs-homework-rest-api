const { ctrlWrapper, httpError } = require("../../helpers");
const {
  ModelUs: { User },
} = require("../../models");

const verifyEmail = async (req, res) => {
  const { varificationToken } = req.params;
  const user = await User.findOne({ varificationToken });
  if (!user) {
    throw httpError(404, "User not found");
  }
  res.status(404).json({
    message: "User not found",
  });
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    varificationToken: "",
  });
  res.status(200).json({
    message: "Verification successful",
  });
};

module.exports = {
  verifyEmail: ctrlWrapper(verifyEmail),
};
