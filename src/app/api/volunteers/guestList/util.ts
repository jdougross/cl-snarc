import { FormSubmissionEntry } from "@/app/merch-volunteers/types";

export const formatGuestListSellerLine = (entry: FormSubmissionEntry) => {
  const { city, date, email, name, plusOne, venue } = entry;
  return `${name} ${plusOne ? "+1 " : ""}(merch)`;
};
