import { Flex } from "@chakra-ui/react";
import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import { CommentsAndSkills } from "./subcomponents/CommentsAndSkills";
import { VolunteerDetails } from "./subcomponents/VolunteerDetails";
import { StatusAndActions } from "./subcomponents/StatusAndActions";
import { deriveFormat } from "./utils";

export const FormSubmissionCard = (props: {
  entry: FormSubmissionEntry;
  isDuplicate?: boolean;
}) => {
  const { entry, isDuplicate } = props;
  const formatProps = deriveFormat({ entry, isDuplicate });

  return (
    <Flex
      alignItems="flex-start"
      justifyContent="space-between"
      m={2}
      w={"100%"}
      minH={175} // NOTE - feels arbitrary
      borderColor="brand.borders.primary"
      borderWidth="thin"
      key={entry.submitted}
      {...formatProps}
    >
      <Flex
        flexDirection="column"
        justifyContent="flex-start"
        h="100%"
        minW={"25%"}
        p={2}
      >
        <VolunteerDetails entry={entry} />
      </Flex>
      <Flex
        flexDirection="column"
        justifyContent="flex-start"
        // maxW={400} // NOTE: related to minWidth of MerchVolunteers component
        // w="100%"
        minW="40%"
        // minH={175}
        p={2}
        fontStyle={"italic"}
        fontWeight={"light"}
      >
        <CommentsAndSkills entry={entry} />
      </Flex>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        my={4}
        mx={2}
        minW={"30%"}
      >
        {!isDuplicate && <StatusAndActions entry={entry} />}
      </Flex>
    </Flex>
  );
};
