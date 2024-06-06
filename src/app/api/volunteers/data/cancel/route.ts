import * as FormSubmissions from "@/app/api/formSubmissions/formSubmissions";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const entry = await request.json();
  const { name, date } = entry;

  try {
    const data = await FormSubmissions.markEntryCanceled(entry);

    // console.log(`Successfully marked volunteer ${name} as canceled for ${date}`)
    return NextResponse.json(
      { message: "Successfully canceled volunteer", data },
      { status: 200 },
    );
  } catch (error) {
    // console.log(`Cancel: error`, { data: { date, name , method: `PUT` }, error })

    return NextResponse.json(
      {
        message: `error when canceling ${entry.name} for ${entry.date}`,
        error,
      },
      { status: 500 },
    );
  }
}
