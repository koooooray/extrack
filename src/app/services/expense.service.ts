import {Expense} from "../models/expense.model";
import uuidV4 from "uuid/v4";
import * as moment from "moment";
import Moment = moment.Moment;
import {Observable} from "rxjs";
import set = Reflect.set;
import {LoadingService} from "./loading.service";
import {Inject} from "@angular/core";

export class ExpenseService{
  private expenses : Expense[] = [{
    Location: "IKEA",
    Description: "IKEA",
    Id: uuidV4(),
    Type: "Home",
    Date: this.getNowDate(),
    Amount: 1050
  },{
    Location: "Benzin",
    Description: "Benzin nach München",
    Id: uuidV4(),
    Type: "Auto",
    Date: this.getNowDate(),
    Amount: 1050
  },{
    Location: "Supermerket",
    Description: "Kaisers und DM",
    Id: uuidV4(),
    Type: "Home",
    Date: this.getNowDate(),
    Amount: 56
  },{
    Location: "Benzin",
    Description: "Benzin nach München",
    Id: uuidV4(),
    Type: "Auto",
    Date: this.getNowDate(),
    Amount: 1050
  },{
    Location: "Skiurlaub",
    Description: "Skipässe und Hotel in Zell",
    Id: uuidV4(),
    Type: "Holidays",
    Date: this.getNowDate(),
    Amount: 900
  }];

  constructor(@Inject(LoadingService) private loadingService: LoadingService){}

  private emptyExpense(): Expense{
    return {
      Location: "",
      Description: "",
      Id: uuidV4(),
      Type: "",
      Date: this.getNowDate(),
    };
  }


  getExpenses():Promise<Expense[]>{
    return Promise.resolve(this.expenses);
  }

  getExpenseById(id:string):Promise<Expense>{
    const expense = this.expenses.find(exp => exp.Id === id);
    if(expense){
      return Promise.resolve(expense);
    }else{
      return Promise.resolve(Object.assign({}, this.emptyExpense()));
    }
  }

  addUpdateExpense(expense: Expense){
    const currentExpense = this.expenses.find(exp => exp.Id === expense.Id);
    if(currentExpense){
      Object.assign(currentExpense, expense);
      return Promise.resolve(currentExpense);
    }else{
      this.expenses.push(expense);
      const currentExpense = this.expenses.find(exp => exp.Id === expense.Id);
      return Promise.resolve(currentExpense);
    }
  }

  deleteExpense(id:string):void{
    const index = this.expenses.findIndex(exp => exp.Id === id);
    if(index > -1){
      this.expenses.splice(index, 1);
    }
  }

  filterExpense(filter: string): Observable<Array<Expense>>{
    this.loadingService.toggleLoading(true);
    const filterToLower = filter.toLowerCase();
    return new Observable(observer => {
      setTimeout(()=>{
        observer.next(this.expenses.filter(val => {
          this.loadingService.toggleLoading(false);
          if(val.Type && val.Type.toLowerCase().indexOf(filterToLower) > -1){
            return true;
          }
          if(val.Description && val.Description.toLowerCase().indexOf(filterToLower) > -1){
            return true;
          }
          return val.Amount == parseInt(filterToLower);
        }));
      }, 800)
    });
  }

  getNowDate(): string{
    return moment().toISOString();
  }

}
