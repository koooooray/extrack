import {PipeTransform, Pipe} from "@angular/core";
import * as moment from "moment"
import Moment = moment.Moment;

@Pipe({
  name: "shortdate"
})
export class ShortDatePipe implements PipeTransform{

  transform(value: Moment, ...args: any[]): string {
    var nowMoment = moment();
    if(moment(value).isSame(nowMoment, 'day')){
      return value.format("dddd HH:mm a");
    }else if (moment(value).isSame(nowMoment, 'year')){
      return value.format("D MMMM");
    }
    return value.format("D MMM YYYY");
  }
}
