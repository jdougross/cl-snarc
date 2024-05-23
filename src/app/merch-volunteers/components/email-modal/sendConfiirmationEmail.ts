import { FormSubmissionEntry } from "../../types";

export const sendConfirmationEmail = async (
  entry: FormSubmissionEntry,
  toast: ({}: Record<string, string | number>) => void,
) => {
  // confirmed will always be TRUE on this path
  const body = JSON.stringify({ ...entry, confirmed: true });

  // TODO: this should produce error toasts, it does not
  // const body = JSON.stringify({ entry, confirmed: true });

  const duration = 5000; // toast duration

  try {
    const emailResponse = await fetch("/api/volunteers/email", {
      method: "POST",
      body,
      cache: "no-store",
    });

    const emailResponseData = await emailResponse.json();
    console.log(JSON.stringify(emailResponseData, null, 2));

    toast({
      title: "Success: Email",
      description: `Successfully emailed ${entry?.email} related to show on ${entry?.date}`,
      status: "success",
      duration,
      position: "top",
    });
  } catch (err) {
    console.log(" - Error sending email - ", err);
    toast({
      title: "Error: Email",
      description: `There was an error emailing to address ${entry?.email} related to show on ${entry?.date}`,
      status: "error",
      duration,
      position: "top",
    });
  }

  try {
    const checkboxResponse = await fetch("/api/volunteers/data/confirm", {
      method: "PUT",
      body,
      cache: "no-store",
    });

    const checkboxResponseData = await checkboxResponse.json();
    console.log(JSON.stringify(checkboxResponseData, null, 2));

    toast({
      title: "Success: Storage",
      description: `Successfully updated ${entry?.email} as confirmed for show on ${entry?.date}`,
      status: "success",
      duration,
      position: "top",
    });
  } catch (err) {
    console.log(" - Error updating google sheet - ", err);
    toast({
      title: "Error: Storage",
      description: `There was an error updating google sheet for ${entry?.email} related to show on ${entry?.date}`,
      status: "error",
      duration,
      position: "top",
    });
  }

  try {
    const guetsListResponse = await fetch("/api/guestList", {
      method: "POST",
      body,
      cache: "no-store",
    });

    const guestListResponseData = await guetsListResponse.json();
    console.log(JSON.stringify(guestListResponseData, null, 2));

    toast({
      title: "Success: Guest List",
      description: `Successfully added ${entry?.name} to guest list on ${entry?.date}`,
      status: "success",
      duration,
      position: "top",
    });
  } catch (err) {
    console.log(" - Error updating guest list - ", err);
    toast({
      title: "Error: Guest List",
      description: `There was an error updating guest list for ${entry?.name} related to show on ${entry?.date}`,
      status: "error",
      duration,
      position: "top",
    });
  }
};
