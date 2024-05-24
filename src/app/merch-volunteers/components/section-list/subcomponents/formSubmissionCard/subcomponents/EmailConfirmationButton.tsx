"use client";

import { Button, StyleProps, Text } from "@chakra-ui/react";
import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import { useContext } from "react";
import { ContactContext } from "@/app/merch-volunteers";

export const EmailConfirmationButton = (props: {
  active: boolean;
  entry: FormSubmissionEntry;
  style?: StyleProps;
}) => {
  const { active, entry, style } = props;
  const setModalEntry = useContext(ContactContext);

  const handleClick = () => {
    active && setModalEntry(entry);
  };

  return (
    <Button
      // p="5%"
      disabled={!active}
      onClick={handleClick}
      bg="brand.positive.primary"
      textColor="brand.text.secondary"
      {...style}
    >
      <Text>Confirm w/ Email</Text>
    </Button>
  );
};
