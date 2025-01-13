import { NextRequest, NextResponse } from "next/server";
import * as TourContacts from "./tourContacts";

export async function GET() {
  try {
    const data = await TourContacts.getAll();

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "error retrieving tour contacts", error },
      { status: 500 },
    );
  }
}
