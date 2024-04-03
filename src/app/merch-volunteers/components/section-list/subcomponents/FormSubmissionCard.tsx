import { Flex, Text } from "@chakra-ui/react";
import { EmailConfirmationButton } from "./buttons/EmailConfirmationButton";
import { TextMessageButton } from "./buttons/TextMessageButton";
import { theme } from "../../../theme";
import { MarkConfirmedButton } from "./buttons/MarkConfirmedButton";
import { FormSubmissionEntry } from "@/app/merch-volunteers/types";

export const FormSubmissionCard = (props: { entry: FormSubmissionEntry }) => {
  const { entry } = props;
  const { colors } = theme.light;

  const backgroundColor = entry.confirmed ? colors.positive : colors.background;

  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      p="1%"
      m="1%"
      borderColor={colors.borders}
      borderWidth="thin"
      key={entry.submitted}
      backgroundColor={backgroundColor}
    >
      <Flex flexDirection="column" justifyContent="space-between">
        <Text>{entry.name}</Text>
        <Text>{entry.email}</Text>
        <Text>{entry.phone}</Text>
      </Flex>
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        p="1%"
        m="1%"
      >
        <MarkConfirmedButton active={false} entry={entry} />
        <EmailConfirmationButton active={false} entry={entry} />
        <TextMessageButton active={false} entry={entry} />
      </Flex>
    </Flex>
  );
};
