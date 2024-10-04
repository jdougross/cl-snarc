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
  const dateCity = entry[ValidSpreadsheetKeys.DATE_CITY];
  const split = dateCity.split(" ");
  const stateIndex =
    split.findIndex((e) => e.length === 2 && e === e.toUpperCase()) + 1;

  const date = split[0];
  const city = split.slice(1, stateIndex).join(" ").trim();
  const venue = split.slice(stateIndex).join(" ").trim();

  const confirmed =
    entry[ValidSpreadsheetKeys.CONFIRMED] === "TRUE" ? true : false;

  const acknowledged =
    entry[ValidSpreadsheetKeys.ACKNOWLEDGED] === "TRUE" ? true : false;

  const plusOne = entry[ValidSpreadsheetKeys.PLUS_ONE].includes("Yes")
    ? true
    : false;

  const formatted = {
    submitted: entry[ValidSpreadsheetKeys.SUBMITTED],
    dateCity,
    date,
    city,
    venue,
    name: entry[ValidSpreadsheetKeys.NAME],
    phone: entry[ValidSpreadsheetKeys.PHONE],
    email: entry[ValidSpreadsheetKeys.EMAIL],
    skills: entry[ValidSpreadsheetKeys.SKILLS],
    plusOne,
    comments: entry[ValidSpreadsheetKeys.COMMENTS],
    confirmed,
    acknowledged,
    canceled: entry[ValidSpreadsheetKeys.CANCELED],
    emailed: entry[ValidSpreadsheetKeys.EMAILED],
  };

  return formatted;
};

export const formatDateString = (s: string) => {
  if (!s) return undefined;

  // JS does not like dates at format yyyy-mm-dd due to TZ offset

  const d = new Date(s.replaceAll("-", "/"));
  const yyyy = d.getFullYear();
  const mm = `0${d.getMonth() + 1}`.slice(-2);
  const dd = `0${d.getDate()}`.slice(-2);

  console.log(`${s} ==> ${mm}/${dd}/${yyyy}`);
  return `${mm}/${dd}/${yyyy}`;
};

export const formatSpreadsheetData = (
  // data: Record<string, string>[],
  data: {
    volunteerData: Record<string, string>[];
    showsData: Record<string, string>[];
  },
): SpreadsheetDataOutput => {
  // separate schema validation for spreadsheet data?
  // Header row has same number of keys as other entries?

  // sort the entries by submittedOn?  or is this done by default?
  // should sectionList be nested array, or object with keys?  where do we sort?

  const { volunteerData, showsData } = data;
  const byDate = {} as Record<string, SectionListData>;

  const showsByDate = new Map();
  showsData.forEach((e) => showsByDate.set(e.date, e));

  showsData.forEach((e) => {
    byDate[e.date] = {
      section: {
        city: e.location,
        date: e.date,
        venue: e.venue,
      },
      entries: [] as FormSubmissionEntry[],
    };
  });

  // get a better setup for header data - sort by date, but have access to date, city, etc

  const entries = volunteerData.map((v) => formatSubmissionEntry(v));

  // TODO: parse showsData for available shows?

  entries.forEach((entry) => {
    const { city, date, dateCity, venue } = entry;

    if (!byDate[date]) {
      byDate[date] = {
        section: {
          city,
          date,
          // dateCity,
          venue,
        },
        entries: [] as FormSubmissionEntry[],
      };
    }

    byDate[date].entries.push(entry);
  });

  return { entries, byDate };
};
