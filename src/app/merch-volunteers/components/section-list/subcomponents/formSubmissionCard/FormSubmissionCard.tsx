import { Flex, Text } from "@chakra-ui/react";
import { EmailConfirmationButton } from "./subcomponents/EmailConfirmationButton";
import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import { VolunteerStatus } from "./subcomponents/VolunteerStatus";
import { CancelVolunteerButton } from "./subcomponents/CancelVolunteerButton";
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
      minH={200} // NOTE: watch for long skills-and-comments sections
      borderColor="brand.borders.primary"
      borderWidth="thin"
      key={entry.submitted}
      {...formatProps}
    >
      <Flex
        flexDirection="column"
        justifyContent="flex-start"
        h="100%"
        w={"25%"}
        p={2}
      >
        <VolunteerDetails entry={entry} />
      </Flex>
      <Flex
        flexDirection="column"
        justifyContent="flex-start"
        maxW={400} // NOTE: related to minWidth of MerchVolunteers component
        w="100%"
        h="100%"
        p={2}
        mr={2}
        fontStyle={"italic"}
        fontWeight={"light"}
      >
        <CommentsAndSkills entry={entry} />
      </Flex>

      {!isDuplicate && (
        <Flex
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          py={2}
          m={4}
          h={"100%"}
          w={"30%"}
        >
          <StatusAndActions entry={entry} />
        </Flex>
      )}
    </Flex>
  );
};
