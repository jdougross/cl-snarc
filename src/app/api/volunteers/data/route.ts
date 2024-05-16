import { NextResponse } from "next/server";
import * as FormSubmissions from "@/app/api/formSubmissions/formSubmissions";

export async function GET() {
  try {
    const data = await FormSubmissions.getAllVolunteerSubmissions();
    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "error retrieving form submission records", err },
      { status: 500 },
    );
  }
}

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
  } catch (err) {
    return NextResponse.json(
      {
        message: `error when manually confirming ${entry.name} for ${entry.date}`,
        err,
      },
      { status: 500 },
    );
  }
}
