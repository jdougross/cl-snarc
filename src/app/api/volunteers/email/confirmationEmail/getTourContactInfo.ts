/**
 * TODO: fetch config of tour contact info from remote/configuratble location
 */

export const getTourContactInfo = () => {
  const tourContactPosition = process.env.TOUR_CONTACT_POSITION;
  const tourContactName = process.env.TOUR_CONTACT_NAME;
  const tourContactPhone = process.env.TOUR_CONTACT_PHONE;
  const tourContactIndirectPronoun = process.env.TOUR_CONTACT_INDIRECT_PRONOUN;
  const tourContactEmail = process.env.TOUR_CONTACT_EMAIL;
  const volunteerDetailsUrl = process.env.VOLUNTEER_DETAILS_URL;

  if (
    !(
      tourContactPosition &&
      tourContactName &&
      tourContactPhone &&
      tourContactIndirectPronoun &&
      tourContactEmail &&
      volunteerDetailsUrl
    )
  ) {
    throw new Error("Missing Tour Manager Contact Config");
  }

  const volunteerDetailsDisplayUrl = volunteerDetailsUrl.replace(
    `http://www.`,
    ``,
  );

  return {
    tourContactEmail,
    tourContactName,
    tourContactIndirectPronoun,
    tourContactPhone,
    tourContactPosition,
    volunteerDetailsUrl,
    volunteerDetailsDisplayUrl,
  };
};
