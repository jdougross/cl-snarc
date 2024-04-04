import { NextResponse } from "next/server";

export async function GET() {
  const data = {};
  return NextResponse.json({ message: "response!", data }, { status: 200 });
}
