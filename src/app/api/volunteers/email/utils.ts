import jwt from "jsonwebtoken";
import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
// import {
//   getDetailsUrl,
//   getPointOfContact,
//   getTourManagerEmail,
// } from "../../../../../config";

// const pointOfContact = getPointOfContact();
// const emailTM = getTourManagerEmail();
// const detailsUrl = getDetailsUrl();

const tourContactPosition = process.env.TOUR_CONTACT_POSITION;
const tourContactName = process.env.TOUR_CONTACT_NAME;
const tourContactPhone = process.env.TOUR_CONTACT_PHONE;
const tourContactIndirectPronoun = process.env.TOUR_CONTACT_INDIRECT_PRONOUN;
const tourContactEmail = process.env.TOUR_CONTACT_EMAIL;
const volunteerDetailsUrl = process.env.VOLUNTEER_DETAILS_URL;

const jwtKey = process.env.CONFIRMATION_PRIVATE_KEY || "";

const generateTokenUrl = (entry: FormSubmissionEntry) => {
  const { email, date } = entry;
  const url = `${process.env.BASE_URL}/${process.env.CONFIRMATION_LISTENER_BASE_URL}`;

  const token = jwt.sign({ email, date }, jwtKey);
  return `${url}/${token}`;
};

const generateMessage = (entry: FormSubmissionEntry) => {
  const { city, date, email, name, venue } = entry;

  const webhookUrl = generateTokenUrl(entry);

  // allow for folks to put in a first name with sapces, like "Mary Kay"
  // treat hyphenated last name as one element
  let parsedName = name?.split(" ").slice(0, -1).join(" ");

  return `Hi ${name ? parsedName : "there"}!

  <p>Thank you for volunteering for Merchandise for the Carbon Leaf show on ${date} at ${venue}!  You have been confirmed.
  </p>

  <p>Please take a moment and <a href=${webhookUrl}>click here</a> - that'll let us know you've gotten this message.
  </p>

  <p>Your name (with a +1 if you can bring a helper) will be on the band’s guest list at the box office.  You also get a merch item each, so don’t forget to grab it before the night is over!
  </p>

  <p>We like for volunteers to arrive 20 minutes before doors to get oriented, and to be available to sell through the night til about 20-30 minutes after the band’s performance. For show details and door times, visit <a href=${volunteerDetailsUrl}>${volunteerDetailsUrl}</a>.
  </p>

  <p>${tourContactPosition} ${tourContactName} is your contact. Please text/call ${tourContactIndirectPronoun} @ ${tourContactPhone} upon arrival so that he can show you in and review things.  If there are any issues, please let us know with as much advance as possible. [${tourContactEmail}] 
  </p>

  <p>Let us know if you have any questions, otherwise, THANK YOU and have a fun night!
  </p>

  <p>- Carbon Leaf
  </p>`;
};

export const generateConfirmationEmail = (entry: FormSubmissionEntry) => {
  const subject = `CONFIRMED! Thank you for volunteering with Carbon Leaf`;
  const html = generateMessage(entry);

  return { html, subject };
};
