import * as FormSubmissions from "@/app/api/formSubmissions/formSubmissions";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const entry = await request.json();
  try {
    const data = await FormSubmissions.markEntryCanceled(entry);

    return NextResponse.json(
      { message: "Successfully canceled volunteer", data },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: `error when canceling ${entry.name} for ${entry.date}`,
        err,
      },
      { status: 500 },
    );
  }
}
