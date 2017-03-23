import * as moment from "moment"
import Moment = moment.Moment;

export interface Expense {
  Location: string;
  Description: string;
  Id: string;
  Type: string;
  Date: Moment;
  Photo?: string;
  Amount?: number;
}
