/**
 * TODO: fetch config of tour contact info from remote/configuratble location
 */

import { TourContactFields } from "@/app/types/types";

export const getVolunteerDetailsUrlParams = () => {
  const volunteerDetailsUrl = process.env.VOLUNTEER_DETAILS_URL;

  if (!volunteerDetailsUrl) {
    throw new Error("Missing Volunteer Details URL Config");
  }

  /**
   * TODO: remote config
   */
  const volunteerDetailsDisplayUrl = `carbonleaf.com/volunteer-details`;

  return {
    volunteerDetailsUrl,
    volunteerDetailsDisplayUrl,
  };
};

export const getDefaultTourContact = () => {
  const tourContactPosition = process.env.TOUR_CONTACT_POSITION;
  const tourContactName = process.env.TOUR_CONTACT_NAME;
  const tourContactPhone = process.env.TOUR_CONTACT_PHONE;
  const tourContactIndirectPronoun = process.env.TOUR_CONTACT_INDIRECT_PRONOUN;
  const tourContactEmail = process.env.TOUR_CONTACT_EMAIL;

  if (
    !(
      tourContactPosition &&
      tourContactName &&
      tourContactPhone &&
      tourContactIndirectPronoun &&
      tourContactEmail
    )
  ) {
    throw new Error("Missing Default Tour Manager Contact Config");
  }

  return {
    [TourContactFields.EMAIL]: tourContactEmail,
    [TourContactFields.NAME]: tourContactName,
    [TourContactFields.FULLNAME]: tourContactName,
    [TourContactFields.PHONE]: tourContactPhone,
    [TourContactFields.PRONOUN]: tourContactIndirectPronoun,
    [TourContactFields.POSITION]: tourContactPosition,
  };
};
