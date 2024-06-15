import jwt from "jsonwebtoken";
import { FormSubmissionEntry } from "@/app/merch-volunteers/types";

const jwtKey = process.env.CONFIRMATION_PRIVATE_KEY || "";

export const generateTokenUrl = (entry: FormSubmissionEntry) => {
  const { email, date } = entry;
  const url = `${process.env.BASE_URL}/${process.env.CONFIRMATION_LISTENER_BASE_URL}`;

  const token = jwt.sign({ email, date }, jwtKey);
  return `${url}/${token}`;
};
