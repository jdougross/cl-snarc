import Airtable from "airtable";
import { Logger as CustomLogger } from "@/app/logger";
import { formatDateString } from "@/app/merch-volunteers/utils";
import { AirTableFields, MerchStatusValue } from "../guestList/guestList";

const logger = new CustomLogger();

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

const reasonsSellerNotNeeded = [
  MerchStatusValue.PRIVATE,
  MerchStatusValue.NO_MERCH,
  MerchStatusValue.VENUE_SELLS,
];

type ShowDateListKey = "location" | "venue" | "date";
type ShowDateList = Record<ShowDateListKey, string>[];

export const getAllShowDates = async () => {
  try {
    const res = await base(baseName)
      .select({
        filterByFormula: `DATESTR(${AirTableFields.DATE}) > '2024-01-01'`,
      })
      .firstPage();

    const data = [] as ShowDateList;

    res.forEach((value) => {
      const {
        [AirTableFields.LOCATION]: LocationField,
        [AirTableFields.VENUE]: VenueField,
        [AirTableFields.DATE]: DateField,
        [AirTableFields.MERCH_STATUS]: MerchStatusField,
      } = value.fields;

      // If AT says no merch sales needed, don't list in SNARC
      // MerchStatusField is Mulit-Select (array), but should only have one entry
      if (
        Array.isArray(MerchStatusField) &&
        MerchStatusField.some((value) => reasonsSellerNotNeeded.includes(value))
      ) {
        return;
      }

      // AirTable Dates are 2024-09-25 - we need them as 09/25/2024

      const formattedDate = formatDateString(String(DateField));

      const location = String(LocationField);
      const venue = String(VenueField);

      if (!DateField || !formattedDate) {
        console.log(
          "bad value for date format",
          JSON.stringify(value.fields, null, 2),
        );
        return;
      }

      data.push({ location, venue, date: formattedDate });
    });

    data.sort((a, b) => {
      return Number(new Date(a.date)) - Number(new Date(b.date));
    });

    return data;
  } catch (error) {
    logger.error(`Shows: error retrieving shows list`, {
      error,
    });
    throw new Error(`Shows: error retrieving show dates list from storage`);
  }
};
