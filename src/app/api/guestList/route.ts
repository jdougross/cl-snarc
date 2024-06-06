import { NextRequest, NextResponse } from "next/server";
import * as GuestList from "./guestList";
import { FormSubmissionEntry } from "@/app/merch-volunteers/types";

// TODO: better way to validate shape of object
interface RequestWithFormSubmissionEntry extends Request {
  json: () => Promise<FormSubmissionEntry>;
}

export async function GET(request: NextRequest) {
  // TODO: get show date from request params
  const showDate = "04/11/2024";

  try {
    const guestList = await GuestList.getGuestListByShowDate(showDate);

    return NextResponse.json(
      { message: "guest list retrieved", guestList },
      { status: 200 },
    );
  } catch (error) {
    // console.log(`/guestList error`, { data: { showDate, method: `GET` }, error })
    return NextResponse.json(
      { message: "error retrieving guest list", error },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const entry = await request.json();
  const { name, date } = entry;

  try {
    const result = await GuestList.addMerchSeller(entry);
    return NextResponse.json(
      { message: `added ${entry.name} to guest list`, data: result },
      { status: 200 },
    );
  } catch (error) {
    // console.log(`/guestList error`, { data: { date, name , method: `POST` }, error })
    return NextResponse.json(
      { message: `error adding ${entry.name} to guest list`, error },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const entry = await request.json();
  const { name, date } = entry;

  try {
    const result = await GuestList.removeMerchSeller(entry);
    return NextResponse.json(
      { message: `removed ${entry.name} from guest list`, data: result },
      { status: 200 },
    );
  } catch (error) {
    // console.log(`/guestList error`, { data: { date, name , method: `DELETE` }, error })
    return NextResponse.json(
      { message: `error removing ${entry.name} from guest list`, error },
      { status: 500 },
    );
  }
}
