import { FormSubmissionEntry } from "../../types";

interface toastParams {
  entry: FormSubmissionEntry;
  toast: ({}: Record<string, string | number>) => void;
}

const toastFormat = {
  duration: 5000,
  position: "top",
};

export const toasts = {
  sendConfirmationEmail: {
    success: ({ entry, toast }: toastParams) =>
      toast({
        title: "Success: Email",
        status: "success",
        description: `Successfully emailed ${entry?.email} related to show on ${entry?.date}`,
        ...toastFormat,
      }),
    error: ({ entry, toast }: toastParams) =>
      toast({
        title: "Error: Email",
        status: "error",
        description: `There was an error emailing to address ${entry?.email} related to show on ${entry?.date}`,
        ...toastFormat,
      }),
  },
  addToGuestList: {
    success: ({ entry, toast }: toastParams) =>
      toast({
        title: "Success: Guest List",
        status: "success",
        description: `Successfully added ${entry?.name} to guest list on ${entry?.date}`,
        ...toastFormat,
      }),
    error: ({ entry, toast }: toastParams) =>
      toast({
        title: "Error: Guest List",
        status: "error",
        description: `There was an error updating guest list for ${entry?.name} related to show on ${entry?.date}`,
        ...toastFormat,
      }),
  },
  markVolunteerConfirmed: {
    success: ({ entry, toast }: toastParams) =>
      toast({
        title: "Success: Storage",
        status: "success",
        description: `Successfully updated ${entry?.email} as confirmed for show on ${entry?.date}`,
        ...toastFormat,
      }),
    error: ({ entry, toast }: toastParams) =>
      toast({
        title: "Error: Storage",
        status: "error",
        description: `There was an error updating google sheet for ${entry?.email} related to show on ${entry?.date}`,
        ...toastFormat,
      }),
  },
  cancelVolunteer: {
    success: ({ entry, toast }: toastParams) =>
      toast({
        title: "Success: Canceled Volunteer",
        status: "success",
        description: `Successfully canceled ${entry?.email} related to show on ${entry?.date}`,
        ...toastFormat,
      }),
    error: ({ entry, toast }: toastParams) =>
      toast({
        title: "Error: Cancel",
        status: "error",
        description: `There was an error canceling volunteer ${entry?.email} related to show on ${entry?.date}`,
        ...toastFormat,
      }),
  },
  removeFromGuestList: {
    success: ({ entry, toast }: toastParams) =>
      toast({
        title: "Success: Remove from Guest List",
        status: "success",
        description: `Successfully removed ${entry?.name} from guest list for show on ${entry?.date}`,
        ...toastFormat,
      }),
    error: ({ entry, toast }: toastParams) =>
      toast({
        title: "Error: Remove From Guest List",
        status: "error",
        description: `There was an error removing volunteer ${entry?.name} from the guest list related to show on ${entry?.date}`,
        ...toastFormat,
      }),
  },
};
