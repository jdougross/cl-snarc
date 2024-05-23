import { Flex, Icon, Text } from "@chakra-ui/react";
import { EmailConfirmationButton } from "./buttons/EmailConfirmationButton";
import { lightButtonProps, theme } from "../../../theme";
import { MarkConfirmedButton } from "./buttons/MarkConfirmedButton";
import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import { CheckCircleIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { AcknowledgedReceipt } from "./AcknowledgedReceipt";
import { CancelVolunteerButton } from "./buttons/CancelVolunteerButton";

// TODO: add unconfirm / cancel volunteer option

export const FormSubmissionCard = (props: {
  entry: FormSubmissionEntry;
  isDuplicate?: boolean;
}) => {
  const { entry, isDuplicate } = props;
  const isCanceled = !!props.entry.canceled;
  // const { confirmed } = entry;
  const { colors } = theme.light;

  const backgroundColor = entry.confirmed ? colors.positive : colors.background;

  const normalFormat = {
    // backgroundColor: confirmed ? colors.positive : colors.background,
    textColor: "#000",
    fontStyle: "normal",
  };

  const duplicateFormat = {
    // backgroundColor: colors.background,
    textColor: "#BBB",
    fontStyle: "italic",
  };

  const canceledFormat = {
    backgroundColor: "#DCC",
    textColor: "#000",
    fontStyle: "italic",
  };

  const formatProps = isCanceled
    ? canceledFormat
    : isDuplicate
      ? duplicateFormat
      : normalFormat;

  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      p="1%"
      m="1%"
      borderColor={colors.borders}
      borderWidth="thin"
      key={entry.submitted}
      backgroundColor={backgroundColor}
      {...formatProps}
    >
      <Flex flexDirection="column" justifyContent="flex-start" w={"30%"}>
        <Text>{entry.name}</Text>
        <Text>{entry.email}</Text>
        <Text>{entry.phone}</Text>
        <Text>{`Plus One?: ${entry.plusOne ? "Yes" : "No"}`}</Text>
      </Flex>
      <Flex flexDirection="column" justifyContent="space-between" w={"40%"}>
        <Text>{entry.skills}</Text>
        <Text>{entry.comments}</Text>
      </Flex>
      <Flex
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="center"
        p="1%"
        m="1%"
        w={"30%"}
      >
        {!isDuplicate && (
          <>
            <AcknowledgedReceipt status={entry.acknowledged} />
            {!entry.acknowledged && (
              <EmailConfirmationButton active={true} entry={entry} />
            )}
            <MarkConfirmedButton active={false} entry={entry} />
            <CancelVolunteerButton active={true} entry={entry} />
          </>
        )}
      </Flex>
    </Flex>
  );
};
