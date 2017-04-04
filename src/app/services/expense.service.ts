import {Expense} from "../models/expense.model";
import uuidV4 from "uuid/v4";
import * as moment from "moment";
import Moment = moment.Moment;
import {Observable} from "rxjs";
import set = Reflect.set;
import {LoadingService} from "./loading.service";
import {Inject} from "@angular/core";
import Dexie from "dexie";
import {DatabaseService} from "./database.service";
import {GroupedExpenses} from "../models/groupedexpenses.model";

export class ExpenseService extends DatabaseService{
  constructor(@Inject(LoadingService) private loadingService: LoadingService){
    super();
  }

  emptyExpense(): Expense{
    return {
      Location: "",
      Description: "",
      Amount: undefined,
      Id: uuidV4(),
      Type: "",
      Date: this.getNowDate(),
    };
  }

  getExpenses():Observable<Array<Expense>>{
    this.loadingService.toggleLoading(true);
    return new Observable(observer => {
      this.expenses
        .toArray()
        .then(expenses => {
          observer.next(expenses);
          this.loadingService.toggleLoading(false);
        });
    });
  }

  getGroupedExpenses():Observable<GroupedExpenses>{
    this.loadingService.toggleLoading(true);
    return new Observable(observer => {
      this.expenses
        .toArray()
        .then(expenses => {
          const groupedExpenses = this.groupByDate(expenses);
          const result : GroupedExpenses[]= [];
          Object.keys(groupedExpenses).map((date:string)=>{
            console.log(date);
            result.push({
              Date: date,
              Expenses: groupedExpenses[date]
            });
          });
          observer.next(result);
          this.loadingService.toggleLoading(false);
        });
    });
  }

  queryExpenses(filter: string): Observable<Array<Expense>>{
    this.loadingService.toggleLoading(true);
    return new Observable(observer => {
      this.expenses.filter(expense =>{
        const filterInput = filter.toLowerCase();
        return expense.Description.toLowerCase().indexOf(filterInput) > -1 ||
          expense.Type.toLowerCase().indexOf(filterInput) > -1 ||
          expense.Amount.toString().indexOf(filterInput) > -1;
        }).toArray()
        .then(expenses => {
          observer.next(expenses);
          this.loadingService.toggleLoading(false);
        });



        // .where("Description").startsWithAnyOfIgnoreCase(filter)
        // .or("Type").startsWithAnyOfIgnoreCase(filter)
        // .toArray()
        // .then(expenses => {
        //   observer.next(expenses);
        //   this.loadingService.toggleLoading(false);
        // });
    });
  }

  getExpenseById(id:string):Dexie.Promise<Expense>{
    return this.expenses.get(id);
  }

  putExpense(expense: Expense):Dexie.Promise<string>{
    return this.expenses.put(expense);
  }

  deleteExpense(id:string):Dexie.Promise<void>{
    return this.expenses.delete(id);
  }

  getNowDate(): string{
    return moment().toISOString();
  }

  groupByDate (expenses) {
    return expenses.reduce((grouped: any, expense: Expense)=>{
      const reducedDate = moment(expense.Date).format("DD MM YYYY");
      if(grouped[reducedDate]){
        grouped[reducedDate].push(expense);
      }else{
        grouped[reducedDate] = [expense];
      }
      return grouped;
    }, {});
  }

}
