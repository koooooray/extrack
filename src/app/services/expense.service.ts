import {Expense} from "../models/expense.model";
import uuidV4 from "uuid/v4";
import * as moment from "moment";
import Moment = moment.Moment;

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
    Location: "Skiurlaub",
    Description: "Skipässe und Hotel in Zell",
    Id: uuidV4(),
    Type: "Holidays",
    Date: this.getNowDate(),
    Amount: 900
  }];

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

  getNowDate(): string{
    return moment().toISOString();
  }

}
