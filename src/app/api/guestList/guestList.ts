import { NextRequest, NextResponse } from "next/server";
import Airtable, { FieldSet, Record } from "airtable";
import { FormSubmissionEntry } from "@/app/merch-volunteers/types";
import { formatGuestListSellerLine } from "./utils";

/**
 * TODO: add merch seller contact field in AT
 * TODO: update MERCH STATUS field of AT
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
    throw new Error(`GuestList: error - unexpected format`);
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
      throw new Error(
        `GuestList: error multiple records retrieved for date: ${showDate}`,
      );
    }

    console.debug(`GuestList: record retrieved for show date: ${showDate}`);
    return res[0];
  } catch (error) {
    console.error(`GuestList: error retrieving guest list`, {
      data: { showDate },
      error,
    });
    throw new Error(
      `GuestList: error retrieving guest list for date: ${showDate}`,
    );
  }
};

export const getGuestListByShowDate = async (showDate: string) => {
  const record = await getRecordByShowDate(showDate);
  return parseGuestListFromRecord(record);
};

export const addMerchSeller = async (entry: FormSubmissionEntry) => {
  // TODO: add a Merch Seller Contact Info page somewhere in here... maybe under Merch Help?
  // TODO: consider adding / comparing +1 if needed?
  const { date, name } = entry;

  try {
    const record = await getRecordByShowDate(date);
    const guestList = parseGuestListFromRecord(record);
    const filteredList = guestList.filter((line) => !line.includes(name));

    if (filteredList.length !== guestList.length) {
      console.log(`GuestList: merch seller already listed on guest list`, {
        data: { date, name },
      });
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

      console.log(`GuestList: merch seller successfully added to guest list`, {
        data: { date, name },
      });
      return Promise.resolve(updatedGuestList);
    }
  } catch (error) {
    console.error(`Guestlist: error adding merch seller`, {
      data: { date, name },
      error,
    });
    return Promise.reject(error);
  }
};

export const removeMerchSeller = async (entry: FormSubmissionEntry) => {
  const { date, name } = entry;

  try {
    const record = await getRecordByShowDate(date);

    const guestList = parseGuestListFromRecord(record);
    const filteredList = guestList.filter((line) => !line.includes(name));

    if (filteredList.length === guestList.length) {
      console.log(`GuestList: merch seller not listed on guest list`, {
        data: { date, name },
      });
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

      console.log(
        `GuestList: merch seller successfully removed from guest list`,
        { data: { date, name } },
      );
      return Promise.resolve(updatedGuestList);
    }
  } catch (error) {
    console.error(`Guestlist: error removing merch seller`, {
      data: { date, name },
      error,
    });
    return Promise.reject(error);
  }
};
