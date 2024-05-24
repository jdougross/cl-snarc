import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import { Text } from "@chakra-ui/react";

export const VolunteerDetails = (props: { entry: FormSubmissionEntry }) => {
  const { entry } = props;
  /**
   * TODO: wrap long emails? break at the "@"? Example: 2/20 show
   */

  return (
    <>
      <Text>{entry.name}</Text>
      <Text>{entry.email}</Text>
      <Text>{entry.phone}</Text>
      <Text>{`Plus One?: ${entry.plusOne ? "Yes" : "No"}`}</Text>
    </>
  );
};
