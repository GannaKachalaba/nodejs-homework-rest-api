const { httpError, ctrlWrapper } = require("../../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw httpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw httpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sing(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByAndUpdate(user._id, { token });
  res.status(200).json({
    token,
  });
};

module.exports = {
  login: ctrlWrapper(login),
};
