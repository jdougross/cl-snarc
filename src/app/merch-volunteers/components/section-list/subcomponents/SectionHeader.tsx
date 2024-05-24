import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";

export const SectionHeader = (props: {
  entries: FormSubmissionEntry[];
  section: any;
}) => {
  const { entries, section } = props;

  const formattedDate = new Date(section.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  let formattedVenueName =
    section.venue.length > 21
      ? section.venue.slice(0, 21) + "..."
      : section.venue;

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
      // w="100%"
      p={4}
      alignItems={"center"}
      justifyContent={"space-between"}
      textAlign={"left"}
    >
      <Text w={"6rem"}> {formattedDate}</Text>
      <Flex direction="column" w={"12rem"}>
        <Text> {section.city}</Text>
        <Text> {formattedVenueName}</Text>
      </Flex>
      <Text w={"10rem"}> {`Submissions: ${entries.length}`}</Text>
      <Text w={"18rem"}>
        {" "}
        {`Reached Out To (incl +1's): ${confirmedVolunteerCount}`}
      </Text>
      {entries.some((e) => e.acknowledged) && (
        // TODO: logic for "email sent vs no action"
        <Flex alignItems="center" justifyContent="center">
          <CheckCircleIcon color="brand.icon.primary" />
          <Text px="1rem">Vol Confimed</Text>
        </Flex>
      )}
    </Flex>
  );
};
