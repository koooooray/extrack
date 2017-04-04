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
      Id: 0,
      Colors: {}
    };

    return this.userConfiguration.toArray()
      .then(res => {
        if(res && res.length > 0){
          this.UserConfig = res[0];
        }else {
          for (var i = 33; i <= 126; i++) {
            newConfig.Colors["char" + i] = '#'+Math.floor(Math.random()*16777215).toString(16);
          };
          this.UserConfig = newConfig;
          this.userConfiguration.add(newConfig);
        }
      })
      .catch(ex=>{
        console.log(ex);
      });
  }

  getColor(char: number) : string{
    return this.UserConfig.Colors["char" + char];
  }
}
