import { NextResponse } from "next/server";
import * as FormSubmissions from "@/app/api/formSubmissions/formSubmissions";

// Update the "acknowledged" field in storage
export async function POST(request: Request) {
  const entry = await request.json();

  try {
    const data = await FormSubmissions.markEntryAcknowledged(entry);

    // console.log({ data })

    return NextResponse.json(
      { message: "volunteer acknowledged email confirmation", data },
      { status: 200 },
    );
  } catch (err) {
    // console.log({ err })
    return NextResponse.json(
      {
        message: `error when acknowledging email receipt for ${entry.name} re: ${entry.date}`,
        err,
      },
      { status: 500 },
    );
  }
}
