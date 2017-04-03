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

  queryExpenses(filter: string): Observable<Array<Expense>>{
    this.loadingService.toggleLoading(true);
    return new Observable(observer => {
      this.expenses
        .where("Description").equalsIgnoreCase(filter)
        .or("Type").equalsIgnoreCase(filter)
        .or("Amount").equals(parseInt(filter))
        .toArray()
        .then(expenses => {
          observer.next(expenses);
          this.loadingService.toggleLoading(false);
        });
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

}
