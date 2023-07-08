const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 587,
  secure: true,
  auth: {
    user: "kachalabahanna@meta.ua",
    pass: META_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "kachalabahanna@meta.ua" };
  await transporter.sendEmail(email);

  return true;
};

module.exports = sendEmail;
