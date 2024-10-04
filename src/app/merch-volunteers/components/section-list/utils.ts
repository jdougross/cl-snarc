export const sortSectionsByDate = (a: string, b: string) => {
  const date1 = new Date(a.split(" ")[0]).getTime();
  const date2 = new Date(b.split(" ")[0]).getTime();

  return date1 - date2;
};

const isTodayOrLater = (d: string) => {
  const roundedDate = new Date(new Date(d).toLocaleDateString());
  const roundedNow = new Date(new Date().toLocaleDateString());
  return roundedDate >= roundedNow;
};

export const shouldDisplaySection = (
  rules: Record<string, boolean>,
  section: Record<string, string>,
  entries: any[],
) => {
  const { hidePastDates } = rules;

  if (hidePastDates && !isTodayOrLater(section.date)) {
    return false;
  }

  return true;
};
