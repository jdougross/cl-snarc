import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";

/**
 * TODO: currently matches all routes - refine
 */
export const config = {
  matcher: ["/api/formSubmissions", "/api/guestList", "/api/volunteers"],
};

export const middleware = async (req: NextRequest) => {
  const env = process.env.NODE_ENV;

  if (env === "development") {
    return NextResponse.next();
  }

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
