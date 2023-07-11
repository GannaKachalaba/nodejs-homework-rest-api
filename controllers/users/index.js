const { register } = require("./register");
const { verifyEmail } = require("./verifyEmail");
const { login } = require("./login");
const { getCurrent } = require("./getCurrent");
const { logout } = require("./logout");
const { updateAvatar } = require("./updateAvatar");
const { resendVerifyEmail } = require("./resendVerifyEmail");

module.exports = {
  register,
  verifyEmail,
  login,
  getCurrent,
  logout,
  updateAvatar,
  resendVerifyEmail,
};
