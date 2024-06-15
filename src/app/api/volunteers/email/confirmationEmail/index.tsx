import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import { generateTokenUrl } from "./generateTokenUrl";
import { getTourContactInfo } from "./getTourContactInfo";
import { generateEmailText } from "./emailText";
import * as styles from "./styles";

const ConfirmationEmail = ({ entry }: { entry: FormSubmissionEntry }) => {
  const info = getTourContactInfo();
  const webhookUrl = generateTokenUrl(entry);
  const email = generateEmailText({ info, entry });

  /**
   * TODO: email address as a mailto link
   */

  return (
    <div style={styles.backgroundContainerStyle}>
      <div style={styles.contentSectionStyle}>
        <div>
          <h2>{email.headingText}</h2>

          <p>{email.greetingLine}</p>
          <p>{email.confirmationLine}</p>

          <div>
            <a href={webhookUrl} style={styles.linkStyle}>
              {email.acknowledgeLink}
            </a>
          </div>

          <p>{email.guestListLine}</p>

          <p>
            {email.timingLine}
            <a href={info.volunteerDetailsUrl} style={styles.linkStyle}>
              {info.volunteerDetailsDisplayUrl}
            </a>
            {`.`}
          </p>

          <p>
            {email.contactLine}
            <a>{info.tourContactEmail}</a>
            {`.`}
          </p>
          <p>{email.questionsLine}</p>
          <p>{email.signatureLine}</p>
        </div>
      </div>
    </div>
  );
};

export const generateConfirmationEmail = async (entry: FormSubmissionEntry) => {
  const ReactDOMServer = (await import("react-dom/server")).default;
  const html = ReactDOMServer.renderToString(
    <ConfirmationEmail entry={entry} />,
  );
  const subject = `CONFIRMED! Thank you for volunteering with Carbon Leaf`;

  return { html, subject };
};
