import jwt from "jsonwebtoken";
import { ConfirmedLanding } from "./ConfirmedLanding";

export default async function Page({
  params: { token },
}: {
  params: { token: string };
}) {
  // TODO: what happens if JWT verification fails?
  const jwtKey = process.env.CONFIRMATION_PRIVATE_KEY || "";
  const decoded = jwt.verify(token, jwtKey) as jwt.JwtPayload;

  const email = (decoded.email as string) || "";
  const date = (decoded.date as string) || "";
  const body = JSON.stringify({ date, email });

  const res = await fetch(
    `${process.env.BASE_URL}/api/volunteers/data/acknowledge`,
    {
      method: "POST",
      body,
      cache: "no-store",
    },
  );

  // console.log({ email, date, body, res });

  /**
   * TODO: add an errorLanding page
   */

  return <ConfirmedLanding date={decoded?.date} />;
}
