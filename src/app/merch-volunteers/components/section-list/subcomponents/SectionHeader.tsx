import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import { CheckCircleIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";
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

  /*
    TODO: add logic and display for following:
    "Email Sent / Awaiting Responses"
    "Volunteer(s) Confirmed / Acknowledged"
    "Volunteer Canceled"
  */

  return (
    <Flex
      w="100%"
      alignItems={"flex-start"}
      justifyContent={"space-between"}
      textAlign={"left"}
      fontSize={"xs"}
    >
      <Text w={"15%"} mx={2}>
        {formattedDate}
      </Text>

      <Flex direction="column" w={"25%"} mx={2}>
        <Text>{section.city}</Text>
        <Text>{formattedVenueName}</Text>
      </Flex>

      <Flex
        direction={"column"}
        justifyContent={"space-between"}
        w={"30%"}
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
        w={"25%"}
        mx={2}
      >
        {entries.some((e) => e.acknowledged) && (
          // TODO: logic for "email sent vs no action"
          // TODO: logic for "volunteer canceled"
          <>
            <Flex alignItems={"center"}>
              <CheckCircleIcon color="brand.icon.primary" />
              <Text mx={1}>Confirmed</Text>
            </Flex>
            <Flex alignItems={"center"}>
              <QuestionOutlineIcon color="brand.icon.primary" />
              <Text mx={1}>Awaiting</Text>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};
