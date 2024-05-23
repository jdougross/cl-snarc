import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import { Flex, Text } from "@chakra-ui/react";

export const VolunteerStatus = ({ entry }: { entry: FormSubmissionEntry }) => {
  const layout = {
    borderWidth: "1px",
    borderColor: "brand.borders",
    borderRadius: "0.5rem",
    padding: "1rem",
    margin: "0.5rem",
    minWidth: "15rem",
    height: "2.5rem",
  };

  // const positiveStyle = {
  //   ...layout,
  //   textColor: "brand.text.primary",
  //   fontStyle: "normal",
  // };

  // const negativeStyle = {
  //   ...layout,
  //   textColor: "brand.text.primary",
  //   fontStyle: "italic",
  // };
  // const text = status ? "Acknowledged" : "Awaiting Repsonse";

  // const styleProps = status ? positiveStyle : negativeStyle;

  const text = entry.canceled
    ? "Canceled"
    : entry.acknowledged
      ? "Confirmed"
      : "Awaiting Response";

  return (
    <Flex alignItems="center" justifyContent="space-evenly" {...layout}>
      <Text p="1rem">{text}</Text>
    </Flex>
  );
};
