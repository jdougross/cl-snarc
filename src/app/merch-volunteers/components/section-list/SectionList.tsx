"use client";

import { useState } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { lightButtonProps } from "../../theme";
import { shouldDisplaySection, sortSectionsByDate } from "./utils";
import { SectionsAccordion } from "./subcomponents/SectionsAccordion";
import { FormSubmissionEntry } from "../../types";

export interface SectionData {
  section: Record<string, string>;
  entries: FormSubmissionEntry[];
}

export const SectionList = (props: {
  sectionListData: Record<string, SectionData>;
}) => {
  const [hidePastDates, setHidePastDates] = useState(false);
  const { sectionListData } = props;
  const sectionsInOrder = Object.keys(sectionListData).sort((a, b) =>
    sortSectionsByDate(a, b),
  );

  const sectionsToDisplay = sectionsInOrder.filter((sectionKey) => {
    const { section, entries } = sectionListData[sectionKey];
    const rules = {
      hidePastDates,
    };
    return shouldDisplaySection(rules, section, entries);
  });

  return (
    <Flex flexDirection="column" w="100%">
      <Flex flexDirection="row">
        <Button
          onClick={() => setHidePastDates(!hidePastDates)}
          {...lightButtonProps}
        >
          {hidePastDates ? "Show Past Dates" : "Hide Past Dates"}
        </Button>
      </Flex>
      <SectionsAccordion
        sectionsToDisplay={sectionsToDisplay}
        sectionListData={sectionListData}
      />
    </Flex>
  );
};
