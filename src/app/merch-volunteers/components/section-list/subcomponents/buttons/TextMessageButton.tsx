"use client";

import { Button, Text } from "@chakra-ui/react";
import { buttonProps } from "../../../../../theme";
import { FormSubmissionEntry } from "@/app/merch-volunteers/types";

export const TextMessageButton = (props: {
  active: boolean;
  entry: FormSubmissionEntry;
}) => {
  const { active, entry } = props;

  const handleClick = () => {
    console.log("click!");
  };

  return (
    <Button p="5%" disabled={!active} onClick={handleClick} {...buttonProps}>
      <Text>Send SMS</Text>
    </Button>
  );
};
