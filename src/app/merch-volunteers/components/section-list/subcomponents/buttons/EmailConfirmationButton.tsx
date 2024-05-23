"use client";

import { Button, Text } from "@chakra-ui/react";
import { buttonProps } from "../../../../../theme";
import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import { useContext } from "react";
import { ContactContext } from "@/app/merch-volunteers";

export const EmailConfirmationButton = (props: {
  active: boolean;
  entry: FormSubmissionEntry;
}) => {
  const { active, entry } = props;
  const setModalEntry = useContext(ContactContext);

  const handleClick = () => {
    active && setModalEntry(entry);
  };

  return (
    <Button
      p="5%"
      disabled={!active}
      onClick={handleClick}
      bg="brand.positive.primary"
      textColor="brand.text.secondary"
      {...buttonProps}
    >
      <Text>Confirm w/ Email</Text>
    </Button>
  );
};
