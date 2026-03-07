import nodemailer from "nodemailer";
import { getVerificationEmailHTML } from "./emailTemplates.js";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendVerificationEmail = async (email, verificationToken) => {
  const verificationLink = `${process.env.BASE_URL}/api/auth/verify/${verificationToken}`;

  const emailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Please verify your email",
    text: `Please verify your email by clicking this link: ${verificationLink}`,
    html: getVerificationEmailHTML(verificationLink),
  };

  await transporter.sendMail(emailOptions);
};

export default transporter;
