// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const { META_PASSWORD } = process.env;

// const nodemailerConfig = {
//   service: "meta",
//   host: "smtp.meta.ua",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "kachalabahanna@meta.ua",
//     pass: META_PASSWORD,
//   },
// };

// const transport = nodemailer.createTransport(nodemailerConfig);

// // const sendEmail2 = async (data) => {
// //   const email = { ...data, from: "kachalabahanna@meta.ua" };
// //   await transporter.sendMail(email);

// //   return true;
// // };

// const email = {
//   to: "yowasof134@kameili.com",
//   from: "kachalabahanna@meta.ua",
//   subject: "Test email",
//   html: "<p><strong>Test email</strong>from localhost:3000</p>",
// };

// transport
//   .sendMail(email)
//   .then(() => console.log("Email send seccess from Nodemailer"))
//   .catch((error) => console.log(error.message));
// // module.exports = sendEmail2;
