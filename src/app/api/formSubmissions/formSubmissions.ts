import { google } from "googleapis";
import {
  FormSubmissionEntry,
  ValidSpreadsheetKeys,
} from "@/app/merch-volunteers/types";
import { findRangeOfCellByHeader, parseSheetsRowsWithHeaders } from "./utils";
import { keyFile } from "../../../../keyFile";

const scopes = ["https://spreadsheets.google.com/feeds/"];

export const auth = new google.auth.GoogleAuth({
  credentials: keyFile,
  scopes,
});

const sheets = google.sheets({ version: "v4", auth });
const spreadsheetId = process.env.STORAGE_ITEM_ID;

export const getAllRows = async () => {
  /**
   * NOTE: possible that range param should be unspecified, or limited to just the sheet
   *
   * This needs to be updated anytime a new column is added to storage
   */

  return await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "current!A:L",
  });
};

export const getAllVolunteerSubmissions = async () => {
  try {
    const sheetsResponse = await getAllRows();
    const data = parseSheetsRowsWithHeaders(sheetsResponse.data);
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateEntryConfirmed = async (entry: FormSubmissionEntry) => {
  try {
    const sheetsResponse = await getAllRows();

    const range = findRangeOfCellByHeader({
      entry,
      header: ValidSpreadsheetKeys.CONFIRMED,
      valueRange: sheetsResponse.data,
    });

    const updateResponse = await sheets.spreadsheets.values.update({
      includeValuesInResponse: true,
      range,
      spreadsheetId,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[!!entry.confirmed]],
      },
    });

    return Promise.resolve(updateResponse.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const markEntryAcknowledged = async (entry: FormSubmissionEntry) => {
  /**
   * TODO - consider doing this as a timestamp rather than a true t/f
   */

  try {
    const sheetsResponse = await getAllRows();

    // console.log({ sheetsResponse })
    const range = findRangeOfCellByHeader({
      entry,
      header: ValidSpreadsheetKeys.ACKNOWLEDGED,
      valueRange: sheetsResponse.data,
    });

    const updateResponse = await sheets.spreadsheets.values.update({
      includeValuesInResponse: true,
      range,
      spreadsheetId,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[true]],
      },
    });

    return Promise.resolve(updateResponse.data);
  } catch (err) {
    // console.log({ err })

    return Promise.reject(err);
  }
};

export const markEntryCanceled = async (entry: FormSubmissionEntry) => {
  const timeStamp = new Date().toISOString();

  /**
   * TODO - include id of admin making this cancellation for remote log?
   * TODO - make this timestamp just a date rather than a full ISO to make it easier to manually update if need be?
   */

  try {
    const sheetsResponse = await getAllRows();

    const range = findRangeOfCellByHeader({
      entry,
      header: ValidSpreadsheetKeys.CANCELED,
      valueRange: sheetsResponse.data,
    });

    const updateResponse = await sheets.spreadsheets.values.update({
      includeValuesInResponse: true,
      range,
      spreadsheetId,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[timeStamp]],
      },
    });

    return Promise.resolve(updateResponse.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const markEntryEmailSent = async (entry: FormSubmissionEntry) => {
  const timeStamp = new Date().toISOString();

  /**
   * TODO - include id of admin making this cancellation for remote log?
   * TODO - make this timestamp just a date rather than a full ISO to make it easier to manually update if need be?
   */

  try {
    const sheetsResponse = await getAllRows();

    const range = findRangeOfCellByHeader({
      entry,
      header: ValidSpreadsheetKeys.EMAILED,
      valueRange: sheetsResponse.data,
    });

    const updateResponse = await sheets.spreadsheets.values.update({
      includeValuesInResponse: true,
      range,
      spreadsheetId,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[timeStamp]],
      },
    });

    return Promise.resolve(updateResponse.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
