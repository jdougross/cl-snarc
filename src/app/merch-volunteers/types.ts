export interface RawFormSubmissionEntry {
  "Submitted On": string;
  "Date  City": string;
  Name: string;
  Phone: string;
  "Email Address": string;
  "Special Skills": string;
  "Can you bring a 1": string;
  "Additional Questions or Comments": string;
  "Confirmed?": string;
  "Acknowledged Email": boolean;
}

// TODO: do some of these params need to be optional based on routes we use?
export interface FormSubmissionEntry {
  submitted: string;
  date: string;
  city: string;
  venue: string;
  name: string;
  phone: string;
  email: string;
  skills: string;
  plusOne: boolean;
  comments: string;
  confirmed: boolean;
  acknowledged: boolean;
}

export enum ValidSpreadsheetKeys {
  SUBMITTED = "Submitted On",
  DATE_CITY = "Date  City",
  NAME = "Name",
  PHONE = "Phone",
  EMAIL = "Email Address",
  SKILLS = "Special Skills",
  PLUS_ONE = "Can you bring a 1",
  COMMENTS = "Additional Questions or Comments",
  CONFIRMED = "Confirmed?",
  ACKNOWLEDGED = "Acknowledged Email",
}
