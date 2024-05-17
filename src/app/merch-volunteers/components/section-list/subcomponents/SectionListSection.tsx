import { FormSubmissionCard } from "./FormSubmissionCard";
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { theme } from "../../../theme";
import { SectionHeader } from "./SectionHeader";
import { FormSubmissionEntry } from "@/app/merch-volunteers/types";

export const SectionListSection = (props: {
  section: Record<string, string>;
  entries: FormSubmissionEntry[];
}) => {
  const { section, entries } = props;
  const { colors } = theme.light;

  return (
    <AccordionItem
      key={section.dateCity}
      backgroundColor={colors.offBackground}
    >
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
