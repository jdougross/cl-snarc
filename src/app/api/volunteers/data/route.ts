import { NextResponse } from "next/server";
import * as FormSubmissions from "@/app/api/formSubmissions/formSubmissions";

export async function GET() {
  try {
    const data = await FormSubmissions.getAllVolunteerSubmissions();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    // console.log(`/volunteers error`, { data: { method: `GET` }, error })
    return NextResponse.json(
      { message: "error retrieving form submission records", error },
      { status: 500 },
    );
  }
}
