import Dexie from "dexie";
import {Expense} from "../models/expense.model";
import {UserConfiguration} from "../models/user-configuration.model";

export class DatabaseService extends Dexie{

  protected expenses : Dexie.Table<Expense, string>;
  protected userConfiguration: Dexie.Table<UserConfiguration, number>;

  constructor(){
    super("expense_tracker");
    this.version(1).stores({
      expenses: "Id, Date",
      userConfiguration: "Id"
    })
  }

}
