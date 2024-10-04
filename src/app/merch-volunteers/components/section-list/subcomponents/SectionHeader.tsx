import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import {
  CheckCircleIcon,
  EmailIcon,
  QuestionOutlineIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { formatHeaderDate, formatVenueName } from "./utils";

export const SectionHeader = (props: {
  entries: FormSubmissionEntry[];
  section: any;
}) => {
  const { entries, section } = props;

  const formattedDate = formatHeaderDate(section.date);
  const formattedVenueName = formatVenueName(section.venue);

  const uniqueEmails = new Set();
  const confirmedVolunteerCount = entries.reduce((acc, cur) => {
    // don't re-count duplicate submissions as extra volunteers
    if (uniqueEmails.has(cur.email)) {
      return acc;
    }
    uniqueEmails.add(cur.email);

    if (!cur.confirmed) {
      return acc;
    }

    return acc + (cur.plusOne ? 2 : 1);
  }, 0);

  const canceled = entries.some((e) => e.canceled);
  // const emailed = entries.some((e) => e.emailed);
  const acknowledged = entries.some((e) => e.acknowledged && !e.canceled);
  const awaiting = entries.some(
    (e) => !e.canceled && e.confirmed && !e.acknowledged,
  );
  // const allConfirmedVolunteerssAcknowledged = (acknowledged && entries.every((e) => e.confirmed === e.acknowledged));

  /*
    TODO: add logic and display for following:
    "Email Sent / Awaiting Responses"
    "Volunteer(s) Confirmed / Acknowledged"
    "Volunteer Canceled"
  */

  return (
    <Flex
      w="100%"
      alignItems={"center"}
      justifyContent={"space-between"}
      textAlign={"left"}
    >
      <VStack align={"left"} w={"25%"} mx={2}>
        <Text fontWeight={"semibold"}>{formattedDate}</Text>
        <Box>
          <Text>{section.city}</Text>
          <Text>{formattedVenueName}</Text>
        </Box>
      </VStack>

      <Flex
        direction={"column"}
        justifyContent={"space-between"}
        w={"22%"}
        mx={2}
      >
        {/**
         * TODO: factor the below into a subcomponent
         */}

        <Flex justifyContent={"space-between"}>
          <Text>{`Entries:`} </Text>
          <Text>{entries.length} </Text>
        </Flex>
        <Flex justifyContent={"space-between"}>
          <Text>{`Emailed:`} </Text>
          <Text>{confirmedVolunteerCount} </Text>
        </Flex>
        <Flex justifyContent={"space-between"}>
          <Text>{`Confirmed:`} </Text>
          <Text>{0} </Text>
        </Flex>
      </Flex>

      <Flex
        direction={"column"}
        alignItems="flex-start"
        justifyContent="flex-start"
        w={"20%"}
        ml={8}
      >
        <div>
          {canceled && (
            <Flex alignItems={"center"}>
              <WarningIcon color="red.500" />
              <Text mx={1}>Canceled</Text>
            </Flex>
          )}
          {acknowledged && (
            <Flex alignItems={"center"}>
              <CheckCircleIcon color="brand.icon.primary" />
              <Text mx={1}>Acknowledged</Text>
            </Flex>
          )}
          {/* {emailed && !allConfirmedVolunteerssAcknowledged && !awaiting && (
            <Flex alignItems={"center"}>
              <EmailIcon color="brand.icon.primary" />
              <Text mx={1}>Email Sent</Text>
            </Flex>
          )} */}
          {awaiting && (
            <Flex alignItems={"center"}>
              <QuestionOutlineIcon color="brand.icon.primary" />
              <Text mx={1}>Awaiting</Text>
            </Flex>
          )}
        </div>
      </Flex>
    </Flex>
  );
};
