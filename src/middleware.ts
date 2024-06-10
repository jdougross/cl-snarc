import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";

/**
 * TODO: currently matches all routes - refine
 */

export const middleware = async (req: NextRequest) => {
  const session = await auth();

  if (session && session.user) {
    return NextResponse.next();
  } else {
    return NextResponse.json(
      { errorMessage: `Not Authorized` },
      { status: 401 },
    );
  }
};
