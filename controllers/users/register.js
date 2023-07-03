const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const { httpError, ctrlWrapper } = require("../../helpers");
const {
  ModelUs: { User },
} = require("../../models");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email);

  const createHashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: createHashPassword,
    avatarURL,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
