import {Expense} from "../models/expense.model";

export class ExpenseService{
  private expenses : Expense[] = [{
    Title: "IKEA",
    Description: "IKEA",
    Id: "1",
    Type: "Home",
    Date: new Date(),
    Amount: 1050
  },{
    Title: "Benzin",
    Description: "Benzin nach München",
    Id: "2",
    Type: "Auto",
    Date: new Date(),
    Amount: 1050
  },{
    Title: "Supermerket",
    Description: "Kaisers und DM",
    Id: "3",
    Type: "Home",
    Date: new Date(),
    Amount: 56
  },{
    Title: "Skiurlaub",
    Description: "Skipässe und Hotel in Zell",
    Id: "4",
    Type: "Holidays",
    Date: new Date(),
    Amount: 900
  }];
  private emptyExpense: Expense = {
    Title: "",
    Description: "",
    Id: "",
    Type: "",
    Date: new Date(),
    Amount: 0
  };

  getExpenses():Promise<Expense[]>{
    return Promise.resolve(this.expenses);
  }

  getExpenseById(id:string):Promise<Expense>{
    const expense = this.expenses.find(exp => exp.Id === id);
    if(expense){
      return Promise.resolve(expense);
    }else{
      return Promise.resolve(Object.assign({}, this.emptyExpense));
    }
  }

  deleteExpense(id:string):void{
    const index = this.expenses.findIndex(exp => exp.Id === id);
    if(index > -1){
      this.expenses.splice(index, 1);
    }
  }

}
