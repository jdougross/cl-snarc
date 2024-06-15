import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import { Text, VStack } from "@chakra-ui/react";

export const CommentsAndSkills = (props: { entry: FormSubmissionEntry }) => {
  const { entry } = props;
  return (
    <VStack align={"left"}>
      <Text>{entry.skills}</Text>
      <Text>{entry.comments}</Text>
    </VStack>
  );
};
