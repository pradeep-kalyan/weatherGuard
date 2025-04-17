// utils/mailer.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const send_mail = (toEmail, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: toEmail,
    subject: subject,
    text: text,
  };

  return transporter.sendMail(mailOptions);
};
