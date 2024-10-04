import { NextRequest, NextResponse } from "next/server";
import * as Shows from "./shows";

export async function GET(request: NextRequest) {
  // TODO: get show date from request params
  const showDate = "04/11/2024";

  try {
    const showDates = await Shows.getAllShowDates();

    return NextResponse.json(
      { message: "show dates list", data: showDates },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "error retrieving show dates list", error },
      { status: 500 },
    );
  }
}
