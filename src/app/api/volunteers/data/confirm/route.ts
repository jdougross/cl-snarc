import * as FormSubmissions from "@/app/api/formSubmissions/formSubmissions";
import { NextResponse } from "next/server";

// Manually update the "confirmed?" field in storage
export async function PUT(request: Request) {
  // TODO: sanitize input here or on FE?
  const entry = await request.json();
  try {
    const data = await FormSubmissions.updateEntryConfirmed(entry);
    return NextResponse.json(
      { message: "Successfully updated confirmed status!", data },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `error when manually confirming ${entry.name} for ${entry.date}`,
        error,
      },
      { status: 500 },
    );
  }
}
