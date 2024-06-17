/**
 * NOTE: placeholder console-logger
 */

import { google } from "googleapis";
import { keyFile } from "../../keyFile";

export class Logger {
  sheets = google.sheets({
    version: "v4",
    auth: new google.auth.GoogleAuth({
      credentials: keyFile,
      scopes: ["https://spreadsheets.google.com/feeds/"],
    }),
  });
  spreadsheetId = process.env.STORAGE_ITEM_ID;
  range = `eventLog`;

  constructor() {}

  private async transport(params?: any) {
    const message =
      params?.length && typeof params[0] === "string" ? params[0] : undefined;

    const data = params[1]?.data;
    const error = params[1]?.error;
    const date = data?.date;
    const name = data?.name;

    /**
     * NOTE: this must remain in-order
     * with respect to columns on google sheet
     */

    const body = {
      timestamp: new Date().toISOString(),
      date,
      name,
      admin: "admin",
      message,
      data: data ? JSON.stringify(data) : null,
      error: error ? JSON.stringify(error) : null,
      payload: params ? JSON.stringify(params) : null,
    };

    /**
     * TODO: catch logger error in another way
     */

    try {
      const addEventResponse = await this.sheets.spreadsheets.values.append({
        range: this.range,
        spreadsheetId: this.spreadsheetId,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [Object.values(body)] },
      });
    } catch (error) {
      console.log("LOGGER ERROR", { error });
    }

    return Promise.resolve();
  }

  info(...args: Array<undefined | string | Object>) {
    this.transport(args);
    console.log(args);
  }

  debug(...args: Array<undefined | string | Object>) {
    this.transport(args);
    console.log(args);
  }

  warn(...args: Array<undefined | string | Object>) {
    this.transport(args);
    console.log(args);
  }

  error(...args: Array<undefined | string | Object>) {
    this.transport(args);
    console.log(args);
  }
}
