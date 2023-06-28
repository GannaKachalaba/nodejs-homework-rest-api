const { httpError, ctrlWrapper } = require("../../helpers");
const { User } = require("../../models/user");
const bcrtypt = require("bcrypt");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, "Email in use");
  }
  const createHashPassword = await bcrtypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: createHashPassword,
  });
  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
