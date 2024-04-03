import { NextResponse } from "next/server";
import { google } from "googleapis";
import { auth } from "../../../auth/googleAuth";
import {
  findRangeOfEntryAcknowledgedCell,
  findRangeOfEntryConfirmedCell,
  parseSheetsRowsWithHeaders,
} from "./utils";

// TODO:

const sheets = google.sheets({ version: "v4", auth });
const spreadsheetId = process.env.STORAGE_ITEM_ID;

const getAllVolunteerSubmissions = async () => {
  return await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "current!A:J",
  });
};

export async function GET() {
  const sheetsResponse = await getAllVolunteerSubmissions();

  const data = parseSheetsRowsWithHeaders(sheetsResponse.data);
  return NextResponse.json({ data }, { status: 200 });
}

// TODO: maybe this should be its own route, rather than a weird PUT/POST distinction
export async function POST(request: Request) {
  const entry = await request.json();

  const sheetsResponse = await getAllVolunteerSubmissions();
  const range = findRangeOfEntryAcknowledgedCell({
    entry,
    ValueRange: sheetsResponse.data,
  });

  const updateResponse = await sheets.spreadsheets.values.update({
    includeValuesInResponse: true,
    range,
    spreadsheetId,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[true]],
    },
  });

  const data = updateResponse.data;

  return NextResponse.json(
    { message: "volunteer acknowledged email", data },
    { status: 200 },
  );
}

export async function PUT(request: Request) {
  // TODO: sanitize input here or on FE?

  const entry = await request.json();

  // fetch spreadsheet and derive correct range to update
  const sheetsResponse = await getAllVolunteerSubmissions();
  const range = findRangeOfEntryConfirmedCell({
    entry,
    ValueRange: sheetsResponse.data,
  });

  // update data
  const updateResponse = await sheets.spreadsheets.values.update({
    includeValuesInResponse: true,
    range,
    spreadsheetId,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[!!entry.confirmed]],
    },
  });

  const data = updateResponse.data;

  return NextResponse.json({ message: "response!", data }, { status: 200 });
}
