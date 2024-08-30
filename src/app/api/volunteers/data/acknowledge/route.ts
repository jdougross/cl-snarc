import { NextResponse } from "next/server";
import * as FormSubmissions from "@/app/api/formSubmissions/formSubmissions";

// Update the "acknowledged" field in storage
export async function POST(request: Request) {
  const entry = await request.json();
  const { date, email } = entry;

  console.log("TRYING TO ACKNOWLEDGE", { entry });

  try {
    const data = await FormSubmissions.markEntryAcknowledged(entry);

    /**
     * TODO: turn "acknowledged" route ino a timestamp thing
     */

    return NextResponse.json(
      { message: "volunteer acknowledged email confirmation", data },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `error when acknowledging email receipt for ${email} re: ${date}`,
        error,
      },
      { status: 500 },
    );
  }
}
