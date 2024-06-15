import { NextRequest, NextResponse } from "next/server";
import { generateConfirmationEmail } from "./confirmationEmail";
import nodemailer from "nodemailer";
import { Logger as CustomLogger } from "@/app/logger";

const logger = new CustomLogger();

export async function POST(request: NextRequest) {
  // TODO: sanitize input here or on FE?
  // validate email address?

  const entry = await request.json();

  const user = process.env.GOOGLE_APP_EMAIL;
  const pass = process.env.GOOGLE_APP_PASS;
  const safeDestination = process.env.SAFE_EMAIL; // TODO: remove when ready

  if (!user || !pass) {
    logger.error("app not configured");
    return NextResponse.json(
      { message: "error configuring mail client" },
      { status: 500 },
    );
  }

  const auth = { user, pass };

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth,
  });

  const confirmationEmail = await generateConfirmationEmail(entry);
  const { html, subject } = confirmationEmail;

  const mailOptions = {
    from: user,
    to: safeDestination, // TODO: remove when ready
    subject,
    html,
  };

  try {
    const mailerResponse = await transporter.sendMail(mailOptions);
    /**
     * TODO: log email
     */
    return NextResponse.json(
      { message: "email successfully sent" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "error sending email", error },
      { status: 500 },
    );
  }
}
