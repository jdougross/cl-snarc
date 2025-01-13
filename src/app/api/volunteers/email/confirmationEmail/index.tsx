import {
  FormSubmissionEntry,
  TourContact,
  TourContactFields,
} from "@/app/types/types";
import { generateTokenUrl } from "./generateTokenUrl";
import { getVolunteerDetailsUrlParams } from "./getTourContactInfo";
import { generateEmailText } from "./emailText";
import * as styles from "./styles";

interface ConfirmationEmailProps {
  entry: FormSubmissionEntry;
  tourContact: TourContact;
}

const ConfirmationEmail = (props: ConfirmationEmailProps) => {
  const { entry, tourContact } = props;

  const { volunteerDetailsUrl, volunteerDetailsDisplayUrl } =
    getVolunteerDetailsUrlParams();
  const tourContactEmail = tourContact[TourContactFields.EMAIL];
  const webhookUrl = generateTokenUrl(entry);
  const email = generateEmailText({ entry, tourContact });
  const mailtoLlink = `mailto:${tourContactEmail}?subject=Carbon Leaf Merch Volunteer ${entry.date}&cc=carbonleafvolunteers@gmail.com`;

  return (
    <div style={styles.backgroundContainer}>
      <div style={styles.contentSection}>
        <div>
          <h2>{email.headingText}</h2>

          <p>{email.greetingLine}</p>
          <p>{email.confirmationLine}</p>

          <div style={styles.acknowledgeButton}>
            <a href={webhookUrl} style={styles.acknowledgeButtonLinkStyle}>
              <p style={styles.acknowledgeButtonText}>
                {email.acknowledgeLink}
              </p>
            </a>
          </div>

          <p>{email.guestListLine}</p>

          <p>
            {email.timingLine}
            <a href={volunteerDetailsUrl} style={styles.link}>
              {volunteerDetailsDisplayUrl}
            </a>
            {`.`}
          </p>

          <p>
            {email.contactLine}
            <a href={mailtoLlink}>{tourContactEmail}</a>
            {`.`}
          </p>
          <p>{email.questionsLine}</p>
          <p>{email.signatureLine}</p>
        </div>
      </div>
    </div>
  );
};

interface GenerateConfirmationEmailParams {
  entry: FormSubmissionEntry;
  tourContact: TourContact;
}
export const generateConfirmationEmail = async (
  params: GenerateConfirmationEmailParams,
) => {
  const { entry, tourContact } = params;

  const ReactDOMServer = (await import("react-dom/server")).default;
  const html = ReactDOMServer.renderToString(
    <ConfirmationEmail entry={entry} tourContact={tourContact} />,
  );
  const subject = `CONFIRMED! Thank you for volunteering with Carbon Leaf - ${entry.date}`;

  return { html, subject };
};
