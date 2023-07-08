const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const { httpError, ctrlWrapper, sendEmail } = require("../../helpers");
const { uuid } = require("uuid");
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
  const verificationToken = uuid();
  const createHashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: createHashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Confirmation of registration on the website!",
    html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}" target="_blank"a>Натисніть для підтверження sendEmail</a>`,
  };

  await sendEmail(mail);

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
