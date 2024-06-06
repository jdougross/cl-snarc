import * as FormSubmissions from "@/app/api/formSubmissions/formSubmissions";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const entry = await request.json();
  try {
    const data = await FormSubmissions.markEntryEmailSent(entry);

    return NextResponse.json(
      { message: "Successfully logged email-send to volunteer", data },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `error when logging email-send to ${entry.email} for ${entry.date}`,
        error,
      },
      { status: 500 },
    );
  }
}
