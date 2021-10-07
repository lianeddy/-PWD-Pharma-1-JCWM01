const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "devdwikyryan@gmail.com",
    pass: "ublcuhglrxaztmve",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
