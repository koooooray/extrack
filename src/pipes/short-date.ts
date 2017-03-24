import {PipeTransform, Pipe} from "@angular/core";
import * as moment from "moment"
import Moment = moment.Moment;

@Pipe({
  name: "shortdate"
})
export class ShortDatePipe implements PipeTransform{

  transform(value: string, ...args: any[]): string {
    const nowMoment = moment();
    const valMoment = moment(value);
    if(valMoment.isSame(nowMoment, 'day')){
      return valMoment.format("HH:mm a");
    }else if (valMoment.isSame(nowMoment, 'year')){
      return valMoment.format("D MMMM");
    }
    return valMoment.format("D MMM YYYY");
  }
}
