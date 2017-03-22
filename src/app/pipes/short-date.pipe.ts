import {PipeTransform, Pipe} from "@angular/core";
import {DatePipe} from "@angular/common";

@Pipe({
  name: "shortdate"
})
export class ShortDatePipe implements PipeTransform{
  constructor(private datePipe: DatePipe){}

  transform(value: any, ...args: any[]): string {
    const date = new Date(value);
    const now = new Date();
    let ampm = "";
    let format = "dd/MM/yyyy";
    if(date.toDateString() === now.toDateString()){
      const hours = date.getHours();
      ampm = hours >= 12 ? ' PM' : ' AM';
      format = "hh:mm";
    }
    else if(date.getFullYear() === now.getFullYear()){
      format = "MMM dd";
    }
    return `${this.datePipe.transform(date, format)}${ampm}`;
  }
}
