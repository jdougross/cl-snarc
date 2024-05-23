import { theme } from "@/app/merch-volunteers/theme";
import { CheckCircleIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";

export const AcknowledgedReceipt = ({
  status = false,
}: {
  status?: boolean;
}) => {
  const layout = {
    borderWidth: "1px",
    borderColor: "#000",
    borderRadius: "0.5rem",
    padding: "1rem",
    margin: "0.5rem",
    minWidth: "15rem",
    height: "2.5rem",
  };

  const positiveStyle = {
    ...layout,
    textColor: theme.light.colors.text,
    fontStyle: "normal",
  };

  const negativeStyle = {
    ...layout,
    textColor: theme.light.colors.text,
    fontStyle: "italic",
  };

  const icon = status ? (
    <CheckCircleIcon color={theme.dark.colors.positive} />
  ) : (
    <QuestionOutlineIcon />
  );
  const text = status ? "Acknowledged" : "Awaiting Repsonse";

  const styleProps = status ? positiveStyle : negativeStyle;

  return (
    <Flex alignItems="center" justifyContent="space-evenly" {...styleProps}>
      {icon}
      <Text p="1rem">{text}</Text>
    </Flex>
  );
};
