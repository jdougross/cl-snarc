// "use client"

import { FormSubmissionEntry, ValidSpreadsheetKeys } from "./types";

interface SectionListData {
  section: Record<string, string>;
  entries: FormSubmissionEntry[];
}

interface SpreadsheetDataOutput {
  entries: FormSubmissionEntry[];
  byDate: Record<string, SectionListData>;
}

export const formatSubmissionEntry = (entry: Record<string, string>) => {
  const dateCity = entry["Date  City"];
  const split = dateCity.split(" ");
  const stateIndex =
    split.findIndex((e) => e.length === 2 && e === e.toUpperCase()) + 1;

  const date = split[0];
  const city = split.slice(1, stateIndex).join(" ").trim();
  const venue = split.slice(stateIndex).join(" ").trim();

  const confirmed =
    entry[ValidSpreadsheetKeys.confirmed] === "TRUE" ? true : false;
  const plusOne = entry[ValidSpreadsheetKeys.plusOne].includes("Yes")
    ? true
    : false;

  const formatted = {
    submitted: entry["Submitted On"],
    dateCity,
    date,
    city,
    venue,
    name: entry["Name"],
    phone: entry["Phone"],
    email: entry["Email Address"],
    skills: entry["Special Skills"],
    plusOne,
    comments: entry["Additional Questions or Comments"],
    confirmed,
  };

  return formatted;
};

export const formatSpreadsheetData = (
  data: Record<string, string>[],
): SpreadsheetDataOutput => {
  // separate schema validation for spreadsheet data?
  // Header row has same number of keys as other entries?

  // sort the entries by submittedOn?  or is this done by default?
  // should sectionList be nested array, or object with keys?  where do we sort?

  const byDate = {} as Record<string, SectionListData>;

  // get a better setup for header data - sort by date, but have access to date, city, etc

  const entries = data.map((v) => formatSubmissionEntry(v));

  entries.forEach((entry) => {
    const { city, date, dateCity, venue } = entry;

    if (!byDate[date]) {
      byDate[date] = {
        section: {
          city,
          date,
          dateCity,
          venue,
        },
        entries: [] as FormSubmissionEntry[],
      };
    }

    byDate[date].entries.push(entry);
  });

  return { entries, byDate };
};
