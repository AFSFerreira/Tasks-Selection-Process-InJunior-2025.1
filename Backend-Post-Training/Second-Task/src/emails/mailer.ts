import nodemailer from "nodemailer";
import { env } from "src/env";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.NODEMAILER_EMAIL,
    pass: env.NODEMAILER_EMAIL_PASS,
  },
});
