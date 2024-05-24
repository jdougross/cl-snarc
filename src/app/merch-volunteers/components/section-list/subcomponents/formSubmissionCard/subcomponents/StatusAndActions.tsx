import { EmailConfirmationButton } from "./EmailConfirmationButton";
import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import { VolunteerStatus } from "./VolunteerStatus";
import { CancelVolunteerButton } from "./CancelVolunteerButton";
import { Box } from "@chakra-ui/react";

export const StatusAndActions = (props: { entry: FormSubmissionEntry }) => {
  const { entry } = props;

  /**
   * NOTE: passing some style props explicitly to all subcomponents
   * so that VolunteerStatus (text) matches default props of Buttons
   */

  const style = {
    minH: 10,
    my: 1,
    // h: "100%",
    w: "100%",
    fontWeight: "semibold",
    fontSize: "md",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Box h={"100%"} w={"100%"}>
      <VolunteerStatus entry={entry} style={style} />
      {!entry.acknowledged && (
        <EmailConfirmationButton active={true} entry={entry} style={style} />
      )}
      {!entry.canceled && (
        <CancelVolunteerButton active={true} entry={entry} style={style} />
      )}
    </Box>
  );
};
