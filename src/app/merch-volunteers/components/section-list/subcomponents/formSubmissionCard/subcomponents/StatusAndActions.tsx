import { EmailConfirmationButton } from "./EmailConfirmationButton";
import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import { VolunteerStatus } from "./VolunteerStatus";
import { CancelVolunteerButton } from "./CancelVolunteerButton";

export const StatusAndActions = (props: { entry: FormSubmissionEntry }) => {
  const { entry } = props;
  const buttonStyle = {
    w: "100%",
    h: "30%",
    m: "2%",
  };

  return (
    <>
      <VolunteerStatus entry={entry} style={buttonStyle} />
      {!entry.acknowledged && (
        <EmailConfirmationButton
          active={true}
          entry={entry}
          style={buttonStyle}
        />
      )}
      {!entry.canceled && (
        <CancelVolunteerButton
          active={true}
          entry={entry}
          style={buttonStyle}
        />
      )}
    </>
  );
};
