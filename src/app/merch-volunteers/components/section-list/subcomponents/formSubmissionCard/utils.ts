import { FormSubmissionEntry } from "@/app/merch-volunteers/types";

export const deriveFormat = (params: {
  entry: FormSubmissionEntry;
  isDuplicate?: boolean;
}) => {
  const { entry, isDuplicate } = params;
  const isCanceled = !!entry.canceled;

  const normalFormat = {
    backgroundColor: entry.confirmed
      ? "brand.positive.secondary"
      : "brand.background.primary",
    textColor: "brand.text",
    fontStyle: "normal",
  };

  const duplicateFormat = {
    backgroundColor: "brand.background.primary",
    textColor: "brand.text.tertiary",
    fontStyle: "italic",
  };

  const canceledFormat = {
    backgroundColor: "brand.negative.secondary",
    textColor: "brand.text.secondary",
    fontStyle: "italic",
  };

  if (isCanceled) {
    return canceledFormat;
  } else if (isDuplicate) {
    return duplicateFormat;
  } else {
    return normalFormat;
  }
};
