import { google } from "googleapis";

const scopes = ["https://spreadsheets.google.com/feeds/"];

export const auth = new google.auth.GoogleAuth({
  keyFile: process.cwd() + "/service_account.json",
  scopes,
});
