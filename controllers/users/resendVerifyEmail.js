const { ctrlWrapper, httpError, sendEmail } = require("../../helpers");
const {
  ModelUs: { User },
} = require("../../models");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw httpError(401, "Not found email");
  }

  if (user.verify) {
    throw httpError(400, "Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Confirmation of registration on the website!",
    html: `<a href="http://localhost:3000/api/auth/verify/${user.verificationToken}" target="_blank"a>Click to confirm email</a>`,
  };

  await sendEmail(mail);

  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = {
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
