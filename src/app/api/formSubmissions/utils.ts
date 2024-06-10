import {
  FormSubmissionEntry,
  ValidSpreadsheetKeys,
} from "@/app/merch-volunteers/types";
import { sheets_v4 } from "googleapis";

export const parseSheetsRowsWithHeaders = ({
  values,
}: sheets_v4.Schema$ValueRange) => {
  if (!values || values.length < 2) {
    throw new Error("Invalid values returned from storage");
  }

  if (values.some((row) => row.length > values[0].length)) {
    throw new Error("Header row of different length than value rows");
  }

  const headers = values[0] as ValidSpreadsheetKeys[];
  const rows = values.slice(1);

  const result: Record<string, string>[] = rows.map((row) => {
    const obj: Record<string, string> = {};

    row.forEach((entry, i) => {
      obj[headers[i]] = entry;
    });

    return obj;
  });

  return result;
};

// some dates show as MM/DD/YYYY vs YYYY-MM-DD
const compareDateStrings = (a: string, b: string) => {
  const x = new Date(a);
  const y = new Date(b);

  return x.toISOString().split("T")[0] == y.toISOString().split("T")[0];
};

// Check to modify only the intended range
const compareValueToTargetByHeaders = (
  value: string[],
  target: FormSubmissionEntry,
  headers: ValidSpreadsheetKeys[],
) => {
  const { date } = target;

  const emailIndex = headers.indexOf(ValidSpreadsheetKeys.EMAIL);
  const dateCityIndex = headers.indexOf(ValidSpreadsheetKeys.DATE_CITY);
  const submittedIndex = headers.indexOf(ValidSpreadsheetKeys.SUBMITTED);

  const dateCityDate = value[dateCityIndex].split(" ")[0];

  // Submitted now optional now because Acknowledge route only uses email / dates
  return (
    value[emailIndex] == target.email &&
    compareDateStrings(date, dateCityDate) &&
    (!target.submitted || value[submittedIndex] == target.submitted)
  );
};

export const findRangeOfCellByHeader = (params: {
  entry: FormSubmissionEntry;
  header: ValidSpreadsheetKeys;
  valueRange: sheets_v4.Schema$ValueRange;
}) => {
  const { entry, header, valueRange } = params;

  const { range, values } = valueRange;

  if (!values || values.length < 2 || typeof range != "string") {
    throw new Error("Invalid values returned from storage");
  }

  if (values.some((row) => row.length > values[0].length)) {
    throw new Error("Header row of different length than value rows");
  }

  if (!range.includes("!A1:")) {
    throw new Error("Range of data does not begin at expected location");
  }

  const headers = values[0];

  const rowIndex = values.findIndex((value) =>
    compareValueToTargetByHeaders(value, entry, headers),
  );

  if (!rowIndex || rowIndex === -1) {
    throw new Error("Could not find index in storage to update value");
  }

  /*
   * Google Sheets UI has no 0 row, but data involves 0 index.
   * adding 1 to row and col in order to access correct spreadsheet cell
   */
  const confirmedRow = 1 + rowIndex;
  const confirmedColumn = String.fromCharCode(1 + 64 + headers.indexOf(header));
  const sheet = range.match(`^[a-zA-Z0-9]+`)?.toString();

  return `${sheet}!${confirmedColumn}${confirmedRow}`;
};
