import {UserConfiguration} from "../models/user-configuration.model";
export class UserConfigurationService{
  config: UserConfiguration  = {
    Currency: "EUR",
    Theme: "basic",
    ExpenseCategories: [
      "Home", "Holidays", "Auto"
    ]
  };

  getUserCurrency(): Promise<string>{
    return Promise.resolve(this.config.Currency)
  }

}
