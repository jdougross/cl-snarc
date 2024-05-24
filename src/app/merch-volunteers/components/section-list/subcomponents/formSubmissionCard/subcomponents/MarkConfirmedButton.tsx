"use client";

import { Button, StyleProps, Text } from "@chakra-ui/react";
import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import { useContext } from "react";
import { FetchContext } from "@/app/merch-volunteers";

export const MarkConfirmedButton = (props: {
  active: boolean;
  entry: FormSubmissionEntry;
  style?: StyleProps;
}) => {
  const { active, entry, style } = props;

  const refetch = useContext(FetchContext);

  const handleClick = async () => {
    // TODO: factor out a markConfirmed(entry) method that can be called by other components
    const updatedValue = !entry.confirmed;
    const body = JSON.stringify({ ...entry, confirmed: updatedValue });

    const res = await fetch("/api/volunteers/data/confirm", {
      method: "PUT",
      body,
      cache: "no-store",
    });
    const data = await res.json();

    refetch();
  };

  return (
    <Button disabled={!active} onClick={handleClick} {...style}>
      <Text>{entry.confirmed ? "Unmark Confirmed" : "Mark Confirmed"}</Text>
    </Button>
  );
};
