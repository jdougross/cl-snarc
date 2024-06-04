import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import { getTourContactInfo } from "./getTourContactInfo";

export const generateEmailText = (params: {
  info: ReturnType<typeof getTourContactInfo>;
  entry: FormSubmissionEntry;
}) => {
  const { info, entry } = params;
  const { name, date, venue } = entry;

  const parsedName = name?.split(" ").slice(0, -1).join(" ");

  const headingText = `Confirmed! Thanks for Volunteering!`;
  const greetingLine = `Hi ${name ? parsedName : "there"},`;
  const confirmationLine = `Thank you for volunteering to work the Merch table for the Carbon Leaf show on ${date} at ${venue}!  You have been confirmed.`;
  const acknowledgeLink = `Please take a moment and click here to let us know you've gotten this message.`;
  const guestListLine = `Your name (with a +1 if you can bring a helper) will be on the band’s guest list at the box office.  You also get a merch item each, so don’t forget to grab it before the night is over!`;
  const timingLine = `We like for volunteers to arrive 20 minutes before doors to get oriented, and to be available to sell through the night til about 20-30 minutes after the band’s performance. For show details and door times, visit `;
  const contactLine = `${info.tourContactPosition} ${info.tourContactName} is your contact. Please text/call ${info.tourContactIndirectPronoun} at ${info.tourContactPhone} upon arrival so that he can show you in and review things.  If there are any issues, please let us know with as much advance as possible at `;
  const questionsLine = `Let us know if you have any questions, otherwise, THANK YOU and have a fun night!`;
  const signatureLine = `- Carbon Leaf`;

  return {
    headingText,
    greetingLine,
    confirmationLine,
    acknowledgeLink,
    guestListLine,
    timingLine,
    contactLine,
    questionsLine,
    signatureLine,
  };
};
