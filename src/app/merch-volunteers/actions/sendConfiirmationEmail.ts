import { FormSubmissionEntry } from "../types";
import { toasts } from "./toasts/toasts";

export const sendConfirmationEmail = async (
  entry: FormSubmissionEntry,
  toast: ({}: Record<string, string | number>) => void,
) => {
  // confirmed will always be TRUE on this path
  const body = JSON.stringify({ ...entry, confirmed: true });

  // TODO: this should produce error toasts, it does not

  try {
    const emailResponse = await fetch("/api/volunteers/email", {
      method: "POST",
      body,
      cache: "no-store",
    });

    const emailResponseData = await emailResponse.json();
    toasts.sendConfirmationEmail.success({ entry, toast });
  } catch (err) {
    toasts.sendConfirmationEmail.error({ entry, toast });
    return;
  }

  /**
   * TODO: merge timestamp here and checkbox into one call
   */

  try {
    const timestampResponse = await fetch("/api/volunteers/data/email", {
      method: "PUT",
      body,
      cache: "no-store",
    });

    const timestampResponseData = await timestampResponse.json();
    toasts.markVolunteerConfirmed.success({ entry, toast });
  } catch (err) {
    toasts.markVolunteerConfirmed.error({ entry, toast });
  }

  try {
    const checkboxResponse = await fetch("/api/volunteers/data/confirm", {
      method: "PUT",
      body,
      cache: "no-store",
    });

    const checkboxResponseData = await checkboxResponse.json();
    toasts.markVolunteerConfirmed.success({ entry, toast });
  } catch (err) {
    toasts.markVolunteerConfirmed.error({ entry, toast });
  }

  try {
    const guestListResponse = await fetch("/api/guestList", {
      method: "POST",
      body,
      cache: "no-store",
    });

    const guestListResponseData = await guestListResponse.json();
    toasts.addToGuestList.success({ entry, toast });
  } catch (err) {
    toasts.addToGuestList.error({ entry, toast });
  }
};
