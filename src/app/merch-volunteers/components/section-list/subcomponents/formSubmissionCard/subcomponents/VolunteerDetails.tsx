import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import { Box, Text } from "@chakra-ui/react";

export const VolunteerDetails = (props: { entry: FormSubmissionEntry }) => {
  const { entry } = props;
  /**
   * TODO: wrap long emails? break at the "@"? Example: 2/20 show
   */

  return (
    <Box>
      <Text fontWeight={"semibold"} fontSize={"lg"} pb={2}>
        {entry.name}
      </Text>
      <Text py={1}>{entry.email}</Text>
      <Text py={1}>{entry.phone}</Text>
      <Text py={1}>{`Plus One?: ${entry.plusOne ? "Yes" : "No"}`}</Text>
    </Box>
  );
};
