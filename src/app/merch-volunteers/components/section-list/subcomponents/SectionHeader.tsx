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
  const headerText = `${formattedDate} - ${section.city}`;
  const confirmedVolunteerCount = entries.reduce(
    (acc, cur) => (acc += cur.confirmed ? (cur.plusOne ? 2 : 1) : 0),
    0,
  );

  return (
    <Flex w="100%">
      <Text p="1%"> {headerText}</Text>
      <Text p="1%"> {`Submissions: ${entries.length}`}</Text>
      <Text p="1%"> {`Confirmed (incl +1's): ${confirmedVolunteerCount}`}</Text>
    </Flex>
  );
};
