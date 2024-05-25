export const formatHeaderDate = (d: string) => {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export const formatVenueName = (v: string) => {
  if (v.length > 21) {
    return v.slice(0, 21) + "...";
  } else {
    return v;
  }
};
