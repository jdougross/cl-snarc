import { NextRequest, NextResponse } from "next/server";
import { generateConfirmationEmail } from "./utils";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  // TODO: sanitize input here or on FE?
  // validate email address?

  const entry = await request.json();

  const user = process.env.GOOGLE_APP_EMAIL;
  const pass = process.env.GOOGLE_APP_PASS;
  const safeDestination = process.env.SAFE_EMAIL; // TODO: remove when ready

  if (!user || !pass) {
    console.log("app not configured");
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

  const { html, subject } = generateConfirmationEmail(entry);
  const mailOptions = {
    from: user,
    to: safeDestination, // TODO: remove when ready
    subject,
    html,
  };

  try {
    const mailerResponse = await transporter.sendMail(mailOptions);
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
