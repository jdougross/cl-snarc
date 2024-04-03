import { NextResponse } from "next/server";
import { google } from "googleapis";
import { auth } from "../../../auth/googleAuth";

// const sheets = google.sheets({ version: "v4", auth });

export async function GET() {
  // const sheetsResponse = await getAllVolunteerSubmissions()

  // const data = parseSheetsRowsWithHeaders(sheetsResponse.data);
  const data = {};
  return NextResponse.json({ message: "response!", data }, { status: 200 });
}
