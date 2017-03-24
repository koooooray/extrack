import {UserConfiguration} from "../models/user-configuration.model";
export class UserConfigurationService{
  config: UserConfiguration  = {
    Currency: "EUR",
    Theme: "basic",
    ExpenseCategories: [
      "Home", "Holidays", "Auto"
    ]
  };

  getUserConfiguration(): Promise<UserConfiguration>{
    return Promise.resolve(this.config)
  }

  addCategory(newCategory: string) {
    this.config.ExpenseCategories.push(newCategory);
  }
}
