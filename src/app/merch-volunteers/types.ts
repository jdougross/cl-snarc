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
  submitted = "Submitted On",
  dateCity = "Date  City",
  name = "Name",
  phone = "Phone",
  email = "Email Address",
  skills = "Special Skills",
  plusOne = "Can you bring a 1",
  comments = "Additional Questions or Comments",
  confirmed = "Confirmed?",
  acknowledged = "Acknowledged Email",
}
