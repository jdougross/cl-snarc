import { NextResponse } from "next/server";
import * as FormSubmissions from "@/app/api/formSubmissions/formSubmissions";

// Update the "acknowledged" field in storage
export async function POST(request: Request) {
  const entry = await request.json();
  const { date, name } = entry;

  try {
    const data = await FormSubmissions.markEntryAcknowledged(entry);

    /**
     * TODO: turn "acknowledged" route ino a timestamp thing
     */

    // console.log(`Successfully marked volunteer ${name} on ${date} as acknowledged`);
    return NextResponse.json(
      { message: "volunteer acknowledged email confirmation", data },
      { status: 200 },
    );
  } catch (error) {
    // console.log(`Acknowledge: error marking volunteer as acknowledged`, { data: { date, name }, error })
    return NextResponse.json(
      {
        message: `error when acknowledging email receipt for ${entry.name} re: ${entry.date}`,
        error,
      },
      { status: 500 },
    );
  }
}
