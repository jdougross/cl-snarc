import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import { Flex, Text } from "@chakra-ui/react";

export const CommentsAndSkills = (props: { entry: FormSubmissionEntry }) => {
  const { entry } = props;
  return (
    <>
      <Text>{entry.skills}</Text>
      <Text>{entry.comments}</Text>
    </>
  );
};
