const { httpError, ctrlWrapper } = require("../../helpers");
const {
  ModelUs: { User },
} = require("../../models");

const bcrypt = require("bcrypt");
const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, "Email in use");
  }

  const createHashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: createHashPassword,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      name: newUser.name,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
