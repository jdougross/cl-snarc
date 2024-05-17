export const sortSectionsByDate = (a: string, b: string) => {
  const date1 = new Date(a.split(" ")[0]).getTime();
  const date2 = new Date(b.split(" ")[0]).getTime();

  return date1 - date2;
};

export const shouldDisplaySection = (
  rules: Record<string, boolean>,
  section: Record<string, string>,
  entries: any[],
) => {
  const { hidePastDates } = rules;

  const sectionDate = new Date(section.date);
  if (hidePastDates && sectionDate.getTime() < new Date().getTime()) {
    return false;
  }

  // TODO: remove when sending real emails
  // if (!entries.some((entry) => entry.email === "jdougross@gmail.com")) {
  //   return false;
  // }

  return true;
};
