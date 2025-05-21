import nodemailer from "nodemailer";
import config from "../config";

export const sendMail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === "production",
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASS,
    },
  });

  // Send mail
  const info = await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.MAIL_USER}>`, // sender
    to,
    subject,
    html,
  });

  return info;
};
