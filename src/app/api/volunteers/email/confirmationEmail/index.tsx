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
    <div style={styles.backgroundContainer}>
      <div style={styles.contentSection}>
        <div>
          <h2>{email.headingText}</h2>

          <p>{email.greetingLine}</p>
          <p>{email.confirmationLine}</p>

          <div style={styles.acknowledgeButton}>
            <a href={webhookUrl}>
              <p style={styles.acknowledgeButtonText}>
                {email.acknowledgeLink}
              </p>
            </a>
          </div>

          <p>{email.guestListLine}</p>

          <p>
            {email.timingLine}
            <a href={info.volunteerDetailsUrl} style={styles.link}>
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
  const subject = `CONFIRMED! Thank you for volunteering with Carbon Leaf - ${entry.date}`;

  console.log(html);
  return { html, subject };
};
