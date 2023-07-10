const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const { httpError, ctrlWrapper } = require("../../helpers");
const { v4: uuid } = require("uuid");
const {
  ModelUs: { User },
} = require("../../models");

const { BASE_URL } = process.env;
const sendEmail = require("../../helpers/sendEmail");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email);
  const verificationToken = uuid();
  const createHashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: createHashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
