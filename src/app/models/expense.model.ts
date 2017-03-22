export interface Expense {
  Title: string;
  Description: string;
  Id: string;
  Type: string;
  Date: Date;
  Photo?: string;
  Amount: number;
}
