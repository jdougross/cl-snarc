import Airtable from "airtable";
import { Logger as CustomLogger } from "@/app/logger";

const logger = new CustomLogger();

const apiKey = process.env.TOUR_CONTACT_STORAGE_API_KEY || "";
const baseId = process.env.TOUR_CONTACT_STORAGE_BASE_ID || "";
const baseName = process.env.TOUR_CONTACT_STORAGE_BASE_NAME || "";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey,
});

const base = Airtable.base(baseId);

export const getAll = async () => {
  try {
    const res = await base(baseName).select({}).firstPage();

    const tourContacts = res.map(({ fields }) => fields);
    return tourContacts;
  } catch (error) {
    logger.error(`TourContacts: error retrieving tour contacts`, {
      data: {},
      error,
    });
    throw new Error(`TourContacts: error retrieving tour contacts`);
  }
};
