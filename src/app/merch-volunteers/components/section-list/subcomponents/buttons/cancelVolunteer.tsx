import { FormSubmissionEntry } from "@/app/merch-volunteers/types";

export const cancelVolunteer = async (
  entry: FormSubmissionEntry,
  toast: ({}: Record<string, string | number>) => void,
) => {
  const duration = 5000; // toast duration
  const body = JSON.stringify({ ...entry });

  try {
    const formSubmissionsResponse = await fetch("/api/volunteers/data/cancel", {
      method: "PUT",
      body,
      cache: "no-store",
    });

    const formSubmissionsRepsonseData = await formSubmissionsResponse.json();
    // console.log(JSON.stringify(formSubmissionsRepsonseData, null, 2));

    toast({
      title: "Success: Canceled Volunteer",
      description: `Successfully canceled ${entry?.email} related to show on ${entry?.date}`,
      status: "success",
      duration,
      position: "top",
    });
  } catch (err) {
    // console.log(" - Error canceling volunteer - ", err);
    toast({
      title: "Error: Cancel",
      description: `There was an error canceling volunteer ${entry?.email} related to show on ${entry?.date}`,
      status: "error",
      duration,
      position: "top",
    });
  }

  try {
    const guestListResponse = await fetch("/api/guestList", {
      method: "DELETE",
      body,
      cache: "no-store",
    });

    const guestListResponseData = await guestListResponse.json();
    // console.log(JSON.stringify(guestListResponseData, null, 2));

    toast({
      title: "Success: Remove from Guest List",
      description: `Successfully removed ${entry?.name} from guest list for show on ${entry?.date}`,
      status: "success",
      duration,
      position: "top",
    });
  } catch (err) {
    // console.log(" - Error removing volunteer from guest list - ", err);
    toast({
      title: "Error: Cancel",
      description: `There was an error removing volunteer ${entry?.name} from the guest list related to show on ${entry?.date}`,
      status: "error",
      duration,
      position: "top",
    });
  }
};
