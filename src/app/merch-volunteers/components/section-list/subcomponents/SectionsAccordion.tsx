"use client";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { SectionHeader } from "./SectionHeader";
import { FormSubmissionCard } from "./formSubmissionCard/FormSubmissionCard";
import { SectionData } from "../SectionList";

export const SectionsAccordion = (props: {
  sectionsToDisplay: string[];
  sectionListData: Record<string, SectionData>;
}) => {
  const { sectionsToDisplay, sectionListData } = props;

  return (
    <Accordion allowMultiple defaultIndex={[]}>
      {sectionsToDisplay.map((sectionKey) => {
        const { section, entries } = sectionListData[sectionKey];

        const emails = new Set();
        const duplicates = new Set();
        entries.forEach((entry) => {
          let isDuplicate = false;
          if (emails.has(entry.email)) {
            isDuplicate = true;
            duplicates.add(entry.email);
          }
          emails.add(entry.email);
          Object.assign(entry, { isDuplicate });
        });

        duplicates.forEach((email) => {
          const multipleEntries = entries.filter((e) => e.email === email);
          const confirmed = multipleEntries.some((e) => e.confirmed);
          const acknowledged = multipleEntries.some((e) => e.acknowledged);
          const canceled = multipleEntries.some((e) => e.canceled);

          entries.forEach((e) => {
            if (e.email === email) {
              Object.assign(e, { confirmed, acknowledged, canceled });
            }
          });
        });

        return (
          <AccordionItem
            key={section.dateCity}
            bg="brand.background.secondary"
            m={4}
          >
            <AccordionButton justifyContent={"space-between"} p={4}>
              <SectionHeader entries={entries} section={section} />
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {entries.map((entry) => (
                <FormSubmissionCard
                  entry={entry}
                  isDuplicate={!!entry?.isDuplicate}
                  key={JSON.stringify(entry)}
                />
              ))}
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
