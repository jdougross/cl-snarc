import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import { Flex, StyleProps, Text } from "@chakra-ui/react";

export const VolunteerStatus = (props: {
  entry: FormSubmissionEntry;
  style?: StyleProps;
}) => {
  const { entry } = props;

  // TODO: bug: duplicate entries miss "emailed" field
  const text = deriveStatusText(entry);

  const canceled = {
    textColor: "brand.text.secondary",
    bg: "brand.negative.error",
  };

  const awaiting = {
    textColor: "brand.text.primary",
    bg: "brand.background.secondary",
  };

  const confirmed = {
    textColor: "brand.text.secondary",
    bg: "brand.positive.primary",
  };

  const statusProps = entry.canceled
    ? canceled
    : entry.acknowledged
      ? confirmed
      : awaiting;

  return (
    <Flex
      border="1px"
      borderColor="brand.borders.primary"
      {...props.style}
      {...statusProps}
    >
      <Text>{text}</Text>
    </Flex>
  );
};

const deriveStatusText = (entry: FormSubmissionEntry) => {
  if (entry.canceled) return "Canceled";
  if (entry.acknowledged) return "Acknowledged";
  if (entry.emailed) return "Awaiting Response";
  if (entry.confirmed) return "Confirmed (manual)";
  else return "";
};
