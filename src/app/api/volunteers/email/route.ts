import { NextRequest, NextResponse } from "next/server";
import { generateConfirmationEmail } from "./confirmationEmail";
import nodemailer from "nodemailer";
import { Logger as CustomLogger } from "@/app/logger";

const logger = new CustomLogger();

export async function POST(request: NextRequest) {
  // TODO: sanitize input here or on FE?
  // validate email address?

  const entry = await request.json();
  const { date, email, name } = entry;

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

  // SAFEGUARD FOR DEV MDOE
  const toEmail =
    process.env.NODE_ENV === "development" ? safeDestination : email;

  const mailOptions = {
    from: user,
    to: toEmail,
    // to: safeDestination, // TODO: remove when ready
    subject,
    html,
  };

  try {
    // TODO: remove
    // console.log({ mailOptions });

    const mailerResponse = await transporter.sendMail(mailOptions);

    // TODO: Check if MailerResponse is OK?

    logger.info(`Email: confirmation email successfully sent`, {
      data: { date, name, mailerResponse },
    });

    return NextResponse.json(
      { message: "email successfully sent" },
      { status: 200 },
    );
  } catch (error) {
    logger.error(`Email: error sending confirmation email`, {
      data: { date, name },
      error,
    });

    return NextResponse.json(
      { message: "error sending email", error },
      { status: 500 },
    );
  }
}
