import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import { Flex, StyleProps, Text } from "@chakra-ui/react";

export const VolunteerStatus = (props: {
  entry: FormSubmissionEntry;
  style?: StyleProps;
}) => {
  const { entry } = props;

  const text = entry.canceled
    ? "Canceled"
    : entry.acknowledged
      ? "Confirmed"
      : "Awaiting Response";

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
      alignItems="center"
      justifyContent="space-evenly"
      border="1px"
      borderColor="brand.borders.primary"
      borderRadius={4}
      fontWeight="semibold"
      fontSize="md"
      {...props.style}
      {...statusProps}
    >
      <Text>{text}</Text>
    </Flex>
  );
};
