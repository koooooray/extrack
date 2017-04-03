import {UserConfiguration} from "../models/user-configuration.model";
import {DatabaseService} from "./database.service";
export class UserConfigurationService extends DatabaseService{
  public UserConfig: UserConfiguration;
  constructor(){
    super();
  }

  addCategory(newCategory: string) {
    if(newCategory && newCategory.length >3){
      this.UserConfig.ExpenseCategories.push(newCategory);
      this.userConfiguration.put(this.UserConfig);
    }
  }

  loadUserConfiguration() {
    let newConfig: UserConfiguration = {
      Currency: "EUR",
      Theme: "basic",
      ExpenseCategories: [
        "Home", "Holidays", "Auto"
      ],
      Id: 0
    };

    return this.userConfiguration.toArray()
      .then(res => {
        if(res && res.length > 0){
          this.UserConfig = res[0];
        }else {
          this.UserConfig = newConfig;
          this.userConfiguration.add(newConfig);
        }
      })
      .catch(ex=>{
        console.log(ex);
      });
  }
}
