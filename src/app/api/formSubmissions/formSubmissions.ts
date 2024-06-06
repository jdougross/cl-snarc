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

    console.debug(`FormSubmissions: retrieved form submissions`);
    return Promise.resolve(data);
  } catch (error) {
    console.error(`FormSubmissions: error retrieving all form submissions`, {
      error,
    });
    return Promise.reject(error);
  }
};

export const updateEntryConfirmed = async (entry: FormSubmissionEntry) => {
  const { date, name } = entry;

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

    console.log(`FormSubmissions: marked entry as confirmed`, {
      data: { date, name },
    });
    return Promise.resolve(updateResponse.data);
  } catch (error) {
    console.error(`FormSubmissions: error updating an entry as confirmed`, {
      data: { date, name },
      error,
    });
    return Promise.reject(error);
  }
};

export const markEntryAcknowledged = async (entry: FormSubmissionEntry) => {
  /**
   * TODO - consider doing this as a timestamp rather than a true t/f
   */

  const { date, name } = entry;

  try {
    const sheetsResponse = await getAllRows();

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

    console.log(`FormSubmissions: marked entry as acknowledged`, {
      data: { date, name },
    });
    return Promise.resolve(updateResponse.data);
  } catch (error) {
    console.error(`FormSubmissions: error marking entry as acknowledged`, {
      data: { date, name },
      error,
    });
    return Promise.reject(error);
  }
};

export const markEntryCanceled = async (entry: FormSubmissionEntry) => {
  /**
   * TODO - include id of admin making this cancellation for remote log?
   * TODO - make this timestamp just a date rather than a full ISO to make it easier to manually update if need be?
   */

  const { date, name } = entry;
  const timeStamp = new Date().toISOString();

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

    console.log(`FormSubmissions: marked entry as canceled`, {
      data: { date, name },
    });
    return Promise.resolve(updateResponse.data);
  } catch (error) {
    console.error(`FormSubmissions: error marking entry as canceled`, {
      data: { date, name },
      error,
    });
    return Promise.reject(error);
  }
};

export const markEntryEmailSent = async (entry: FormSubmissionEntry) => {
  /**
   * TODO - include id of admin making this cancellation for remote log?
   * TODO - make this timestamp just a date rather than a full ISO to make it easier to manually update if need be?
   */

  const { date, name } = entry;
  const timeStamp = new Date().toISOString();

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

    console.log(`FormSubmissions: marked entry as confirmed`, {
      data: { date, name },
    });
    return Promise.resolve(updateResponse.data);
  } catch (error) {
    console.error(`FormSubmissions: error logging sending of email`, {
      data: { date, name },
      error,
    });
    return Promise.reject(error);
  }
};
