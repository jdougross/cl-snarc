import { Flex, Text } from "@chakra-ui/react";
import { EmailConfirmationButton } from "./buttons/EmailConfirmationButton";
import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import { VolunteerStatus } from "./buttons/VolunteerStatus";
import { CancelVolunteerButton } from "./buttons/CancelVolunteerButton";

export const FormSubmissionCard = (props: {
  entry: FormSubmissionEntry;
  isDuplicate?: boolean;
}) => {
  const { entry, isDuplicate } = props;
  const isCanceled = !!props.entry.canceled;

  const normalFormat = {
    backgroundColor: entry.confirmed
      ? "brand.positive.secondary"
      : "brand.background.primary",
    textColor: "brand.text",
    fontStyle: "normal",
  };

  const duplicateFormat = {
    backgroundColor: "brand.background.primary",
    textColor: "brand.text.tertiary",
    fontStyle: "italic",
  };

  const canceledFormat = {
    backgroundColor: "brand.negative.secondary",
    textColor: "brand.text.secondary",
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
      minHeight="200px"
      borderColor="brand.borders.primary"
      borderWidth="thin"
      key={entry.submitted}
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
            <VolunteerStatus entry={entry} />
            {!entry.acknowledged && (
              <EmailConfirmationButton active={true} entry={entry} />
            )}
            {!entry.canceled && (
              <CancelVolunteerButton active={true} entry={entry} />
            )}
          </>
        )}
      </Flex>
    </Flex>
  );
};
