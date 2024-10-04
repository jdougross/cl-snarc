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
  const countEmailedVolunteers = entries.reduce((acc, cur) => {
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

  const volunteersCanceled = entries.filter((e) => e.canceled);
  const volunteersAcknowledged = entries.filter(
    (e) => e.acknowledged && !e.canceled,
  );
  const volunteersAwaiting = entries.filter(
    (e) => !e.canceled && e.confirmed && !e.acknowledged,
  );

  const displayCanceled = !!volunteersCanceled.length;
  const displayAcknowledged = !!volunteersAcknowledged.length;
  const displayAwaiting = !!volunteersAwaiting.length;

  const countAcknowledgedVolunteers = volunteersAcknowledged.reduce(
    (acc, cur) => {
      return acc + (cur.plusOne ? 2 : 1);
    },
    0,
  );

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
          <Text>{countEmailedVolunteers} </Text>
        </Flex>
        <Flex justifyContent={"space-between"}>
          <Text>{`Acknowledged:`} </Text>
          <Text>{countAcknowledgedVolunteers} </Text>
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
          {displayCanceled && (
            <Flex alignItems={"center"}>
              <WarningIcon color="red.500" />
              <Text mx={1}>Canceled</Text>
            </Flex>
          )}
          {displayAcknowledged && (
            <Flex alignItems={"center"}>
              <CheckCircleIcon color="brand.icon.primary" />
              <Text mx={1}>Acknowledged</Text>
            </Flex>
          )}
          {displayAwaiting && (
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
