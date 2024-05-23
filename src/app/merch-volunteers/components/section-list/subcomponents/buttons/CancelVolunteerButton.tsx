"use client";

import { Button, Text, useToast } from "@chakra-ui/react";
import { buttonProps, theme } from "../../../../theme";
import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import { cancelVolunteer } from "./cancelVolunteer";

export const CancelVolunteerButton = (props: {
  active: boolean;
  entry: FormSubmissionEntry;
}) => {
  const { active, entry } = props;
  const toast = useToast();

  const handleClick = async () => {
    cancelVolunteer(entry, toast);
  };

  return (
    <Button
      p="5%"
      disabled={!active}
      onClick={handleClick}
      {...buttonProps}
      bg={theme.dark.colors.negative}
    >
      <Text>Cancel Volunteer</Text>
    </Button>
  );
};
