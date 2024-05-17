import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
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

  return (
    <Flex
      w="100%"
      p="1%"
      alignItems={"center"}
      justifyContent={"flex-start"}
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
        {`Confirmed (incl +1's): ${confirmedVolunteerCount}`}
      </Text>
    </Flex>
  );
};
