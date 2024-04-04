import { google } from "googleapis";
import {
  FormSubmissionEntry,
  ValidSpreadsheetKeys,
} from "@/app/merch-volunteers/types";
import { findRangeOfCellByHeader, parseSheetsRowsWithHeaders } from "./utils";

const scopes = ["https://spreadsheets.google.com/feeds/"];

export const auth = new google.auth.GoogleAuth({
  keyFile: process.cwd() + "/service_account.json",
  scopes,
});

const sheets = google.sheets({ version: "v4", auth });
const spreadsheetId = process.env.STORAGE_ITEM_ID;

export const getAllRows = async () => {
  return await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "current!A:J",
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

    return Promise.resolve(updateResponse.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
