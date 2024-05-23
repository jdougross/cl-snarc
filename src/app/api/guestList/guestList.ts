import { NextRequest, NextResponse } from "next/server";
import Airtable, { FieldSet, Record } from "airtable";
import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import { formatGuestListSellerLine } from "./utils";

/*
  get airtable entry BY DATE

  check entry guest list field for this person
  parse by newLine?
  --> present ? notification, return, leave alone
  --> not present -> add.

  update Merch Status field
  --> add to enum for stages-of-confirmation

  TODO: add merch seller contact field in AT
  TODO: DELETE merch seller... 
  - extra field for canceled in google sheet
  - remove from guest list along with +x
  - handle de-duplication (longer issue)
*/

const apiKey = process.env.GUEST_LIST_STORAGE_API_KEY || "";
const baseId = process.env.GUEST_LIST_STORAGE_BASE_ID || "";
const baseName = process.env.GUEST_LIST_STORAGE_BASE_NAME || "";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey,
});

const base = Airtable.base(baseId);

export enum Fields {
  GUEST_LIST = "Guest List",
  DATE = "Date",
  MERCH_STATUS = "Merch Status",
  MERCH_HELP = "Merch Help",
}

export enum MerchStatus {
  PRIVATE = "PRIVATE",
  NO_MERCH = "NO MERCH",
  CONFIRMED = "CONFIRMED",
  CANCELED = "CANCELED",
  VENUE_SELLS = "VENUE SELLS",
  NEED = "NEED",
  AWAITING_VOLUNTEER_CONF = "waiting on confirmation",
  AWAITING_VENUE_CONF = "Asking Venue",
  WANT_MORE = "Want More",
}

const formatDate = (s: string) => {
  // TODO: handle errors?
  const date = new Date(s);
  return date.toISOString().split("T")[0];
};

const parseListByNewLine = (list: string) => {
  return list.split("\n");
};

const parseGuestListFromRecord = (record: Record<FieldSet>) => {
  const guestList = record.fields[Fields.GUEST_LIST];

  if (typeof guestList === "string") {
    return parseListByNewLine(guestList);
  } else {
    throw new Error("Guest List record in unexpected format");
  }
};

const getRecordByShowDate = async (showDate: string) => {
  try {
    const formattedDate = formatDate(showDate);
    const res = await base(baseName)
      .select({
        // NOTE: entering a view param will prevent finding past / hidden dates
        // view: "advancing view",
        filterByFormula: `DATESTR({${Fields.DATE}}) = '${formattedDate}'`,
      })
      .firstPage();

    // TODO: handle if more than one record is returned
    if (!res.length || res.length != 1) {
      throw new Error("multiple records retrieved from GuestList storage");
    }

    return res[0];
  } catch (error) {
    throw new Error("error retrieving GuestList record for selected date");
  }
};

export const getGuestListByShowDate = async (showDate: string) => {
  const record = await getRecordByShowDate(showDate);
  return parseGuestListFromRecord(record);
};

export const addMerchSeller = async (entry: FormSubmissionEntry) => {
  // TODO: add a Merch Seller Contact Info page somewhere in here... maybe under Merch Help?
  // TODO: consider adding / comparing +1 if needed?

  try {
    const { date, name } = entry;

    const record = await getRecordByShowDate(date);
    const guestList = parseGuestListFromRecord(record);
    const filteredList = guestList.filter((line) => !line.includes(name));

    if (filteredList.length !== guestList.length) {
      Promise.resolve();
    } else {
      const newLine = formatGuestListSellerLine(entry);
      const newList = [newLine].concat(filteredList).join("\n");
      const fieldsToUpdate = {
        [Fields.GUEST_LIST]: newList,
      };

      const res = await base(baseName).update([
        { id: record.id, fields: fieldsToUpdate },
      ]);

      const updatedGuestList = parseGuestListFromRecord(res[0]);

      return Promise.resolve(updatedGuestList);
    }
  } catch (err) {
    return Promise.reject();
  }
};

export const removeMerchSeller = async (entry: FormSubmissionEntry) => {
  try {
    const { date, name } = entry;

    const record = await getRecordByShowDate(date);

    const guestList = parseGuestListFromRecord(record);
    const filteredList = guestList.filter((line) => !line.includes(name));

    if (filteredList.length === guestList.length) {
      Promise.resolve("Guest not present on guest list for this show");
    } else {
      const newList = filteredList.join("\n");
      const fieldsToUpdate = {
        [Fields.GUEST_LIST]: newList,
      };

      const res = await base(baseName).update([
        { id: record.id, fields: fieldsToUpdate },
      ]);

      const updatedGuestList = parseGuestListFromRecord(res[0]);

      return Promise.resolve(updatedGuestList);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};
