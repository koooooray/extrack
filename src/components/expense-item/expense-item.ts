import {Component, Input, OnInit} from "@angular/core";
import {Expense} from "../../app/models/expense.model";
import {UserConfigurationService} from "../../app/services/user-configuration.service";
import {NavController} from "ionic-angular";
import {DetailPage} from "../../pages/detail/detail";

@Component({
  selector: 'expense-item',
  templateUrl: 'expense-item.html'
})
export class ExpenseItemComponent implements OnInit{

  text: string;

  @Input()
    expense: Expense;
    private currency : string = "EUR";

    constructor(private configurationService: UserConfigurationService, private navController: NavController){}
    onClickItem(expense: Expense){
      this.navController.push(DetailPage, {"Id": expense.Id });
    }
    ngOnInit(): void {
      this.configurationService.getUserConfiguration().then(result => this.currency = result && result.Currency ? result.Currency : "EUR");
  }

}
