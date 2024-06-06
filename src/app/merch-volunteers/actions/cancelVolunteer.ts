import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import { toasts } from "./toasts/toasts";

export const cancelVolunteer = async (
  entry: FormSubmissionEntry,
  toast: ({}: Record<string, string | number>) => void,
) => {
  const body = JSON.stringify({ ...entry });

  try {
    const formSubmissionsResponse = await fetch("/api/volunteers/data/cancel", {
      method: "PUT",
      body,
      cache: "no-store",
    });

    const formSubmissionsRepsonseData = await formSubmissionsResponse.json();
    toasts.cancelVolunteer.success({ entry, toast });
  } catch (error) {
    toasts.cancelVolunteer.error({ entry, toast });
    return;
  }

  try {
    const guestListResponse = await fetch("/api/guestList", {
      method: "DELETE",
      body,
      cache: "no-store",
    });

    const guestListResponseData = await guestListResponse.json();
    toasts.removeFromGuestList.success({ entry, toast });
  } catch (error) {
    toasts.removeFromGuestList.error({ entry, toast });
  }
};
