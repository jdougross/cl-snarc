"use client";

import { Button, StyleProps, Text, useToast } from "@chakra-ui/react";
import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import { cancelVolunteer } from "./utils/cancelVolunteer";

export const CancelVolunteerButton = (props: {
  active: boolean;
  entry: FormSubmissionEntry;
  style?: StyleProps;
}) => {
  const { active, entry, style } = props;
  const toast = useToast();

  const handleClick = async () => {
    cancelVolunteer(entry, toast);
  };

  return (
    <Button
      disabled={!active}
      onClick={handleClick}
      bg="brand.negative.primary"
      textColor="brand.text.secondary"
      {...style}
    >
      <Text>Cancel Volunteer</Text>
    </Button>
  );
};
