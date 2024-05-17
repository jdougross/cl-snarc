"use client";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { theme } from "../../../theme";
import { SectionHeader } from "./SectionHeader";
import { FormSubmissionCard } from "./FormSubmissionCard";
import { SectionData } from "../SectionList";

export const SectionsAccordion = (props: {
  sectionsToDisplay: string[];
  sectionListData: Record<string, SectionData>;
}) => {
  const { sectionsToDisplay, sectionListData } = props;
  const { colors } = theme.light;

  return (
    <Accordion allowMultiple defaultIndex={[]}>
      {sectionsToDisplay.map((sectionKey) => {
        const { section, entries } = sectionListData[sectionKey];

        const emails = new Set();
        entries.forEach((e) => {
          let isDuplicate = false;
          if (emails.has(e.email)) {
            isDuplicate = true;
          }
          emails.add(e.email);
          Object.assign(e, { isDuplicate });
        });

        return (
          <AccordionItem
            key={section.dateCity}
            backgroundColor={colors.offBackground}
            m="1%"
          >
            <AccordionButton>
              <SectionHeader entries={entries} section={section} />
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {entries.map((entry) => {
                const isDuplicate = true;

                return (
                  <FormSubmissionCard
                    entry={entry}
                    isDuplicate={!!entry?.isDuplicate}
                    key={JSON.stringify(entry)}
                  />
                );
              })}
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
