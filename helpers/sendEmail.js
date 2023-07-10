const sgEmail = require("@sendgrid/mail");
require("dotenv").config();

const { SANDGRID_API_KEY } = process.env;

sgEmail.setApiKey(SANDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "kacalabaanna@gmail.com" };
  await sgEmail.send(email);
  return true;
};

module.exports = sendEmail;

// const email = {
//   to: "yowasof134@kameili.com",
//   from: "kacalabaanna@gmail.com",
//   subject: "Test email",
//   html: "<p><strong>Test email</strong>from localhost:3000</p>",
// };

// sgEmail
//   .send(email)
//   .then(() => console.log("Email send seccess"))
//   .catch((error) => console.log(error.message));
