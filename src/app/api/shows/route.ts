import { NextRequest, NextResponse } from "next/server";
import * as Shows from "./shows";

export async function GET(request: NextRequest) {
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
