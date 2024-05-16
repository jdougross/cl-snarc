"use client";

import { useState } from "react";
import { Accordion, Flex, Button, ExpandedIndex } from "@chakra-ui/react";
import { buttonProps } from "../../theme";
import { SectionListSection } from "./subcomponents/SectionListSection";
import { shouldDisplaySection, sortSectionsByDate } from "./utils";

const SectionsAccordion = (props: {
  // accordionProps?: {
  //   allAccordionsCollapsed: boolean;
  //   setAllAccordionsCollapsed: (b: boolean) => void;
  //   defaultIndex: number[]
  // };
  sectionsToDisplay: string[];
  sectionListData: Record<string, any>;
}) => {
  const { sectionsToDisplay, sectionListData /* accordionProps */ } = props;

  return (
    <Accordion
      allowMultiple
      defaultIndex={Array.from(
        Array(Object.keys(sectionListData).length).keys(),
      )}
      // {...accordionDisplay}
    >
      {sectionsToDisplay.map((sectionKey) => {
        const { section, entries } = sectionListData[sectionKey];
        return (
          <SectionListSection
            section={section}
            entries={entries}
            key={section.dateCity}
          />
        );
      })}
    </Accordion>
  );
};

export const SectionList = (props: {
  sectionListData: Record<string, any>;
}) => {
  // const [ allAccordionsCollapsed, setAllAccordionsCollapsed ] = useState(false);
  const [hidePastDates, setHidePastDates] = useState(false);

  const { sectionListData } = props;
  const sectionsInOrder = Object.keys(sectionListData).sort((a, b) =>
    sortSectionsByDate(a, b),
  );

  // this is currently disabling toggle and is not worth the trouble.
  // maybe have a wrapper for filtering the views and passing down sLD as props?
  // Or - may have to pass in index (not defaultIndex)
  // and write a new onChange function to handle default functionality
  // const allAccordionsOpen = Array.from(Array(Object.keys(sectionListData).length).keys());

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
        {/* <Button
            onClick={() => setAllAccordionsCollapsed(!allAccordionsCollapsed)}
            children={allAccordionsCollapsed ? "Expand All" : "Collapse All"}
            {...buttonProps}
          /> */}
        <Button
          onClick={() => setHidePastDates(!hidePastDates)}
          {...buttonProps}
        >
          {hidePastDates ? "Show Past Dates" : "Hide Past Dates"}
        </Button>
      </Flex>
      <SectionsAccordion
        // accordionProps={{ allAccordionsCollapsed, setAllAccordionsCollapsed, defaultIndex: allAccordionsOpen }}
        sectionsToDisplay={sectionsToDisplay}
        sectionListData={sectionListData}
      />
    </Flex>
  );
};
