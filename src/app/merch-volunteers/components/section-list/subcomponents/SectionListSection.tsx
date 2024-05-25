import { FormSubmissionCard } from "./formSubmissionCard/FormSubmissionCard";
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { SectionHeader } from "./SectionHeader";
import { FormSubmissionEntry } from "@/app/merch-volunteers/types";

export const SectionListSection = (props: {
  section: Record<string, string>;
  entries: FormSubmissionEntry[];
}) => {
  const { section, entries } = props;

  /**
   * TODO:
   *
   * header needs to know:
   *  count of unique submissions
   *  count of confirmed volunteers
   *  count of canceled volunteers
   *
   * panel needs to know:
   *  entries need to know if they're duplicates
   *  entries need to know their status (canceled, emailed, etc)
   *
   */

  return (
    <AccordionItem key={section.dateCity}>
      <AccordionButton>
        <SectionHeader entries={entries} section={section} />
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        {entries.map((entry) => (
          <FormSubmissionCard entry={entry} key={JSON.stringify(entry)} />
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
};
