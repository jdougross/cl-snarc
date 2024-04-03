import { NextRequest, NextResponse } from "next/server";
import * as GuestList from "./guestList";
import { FormSubmissionEntry } from "@/app/merch-volunteers/types";

// TODO: better way to validate shape of object
interface RequestWithFormSubmissionEntry extends Request {
  json: () => Promise<FormSubmissionEntry>;
}

const sampleEntry = {
  submitted: "3/5/2024 0:23:58",
  dateCity: "04/11/2024  Roanoke, VA  5 Points Music Sanctuary",
  date: "04/11/2024",
  city: "Roanoke, VA",
  venue: "5 Points Music Sanctuary",
  name: "Doug Ross",
  phone: "(222) 222-2222",
  email: "jdougross@gmail.com",
  skills: "test",
  plusOne: false,
  comments: "test",
  confirmed: false,
};

export async function GET(request: NextRequest) {
  try {
    // TODO: get show date from request params
    const showDate = "04/11/2024";
    const guestList = await GuestList.getGuestListByShowDate(showDate);

    return NextResponse.json(
      { message: "guest list retrieved", guestList },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "error retrieving guest list" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const entry = await request.json();

  try {
    const result = await GuestList.addMerchSeller(entry);
    return NextResponse.json(
      { message: `added ${entry.name} to guest list`, data: result },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: `error adding ${entry.name} to guest list`, err },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const entry = await request.json();

  try {
    const result = await GuestList.removeMerchSeller(entry);
    return NextResponse.json(
      { message: `removed ${entry.name} from guest list`, data: result },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: `error removing ${entry.name} from guest list`, err },
      { status: 500 },
    );
  }
}
