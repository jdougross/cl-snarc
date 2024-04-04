import jwt from "jsonwebtoken";

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

  const res = await fetch("http://localhost:3000/api/volunteers/data", {
    method: "POST",
    body,
    cache: "no-store",
  });

  // TODO: jeuj this up a good bit to not look janky.
  return (
    <div>
      Thanks for confirming! Looking forward to seeing you at the show! -Carbon
      Leaf
    </div>
  );
}
