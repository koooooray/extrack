import {Component, Input, OnInit} from "@angular/core";
import {Expense} from "../../app/models/expense.model";
import {UserConfigurationService} from "../../app/services/user-configuration.service";
import {NavController} from "ionic-angular";
import {DetailPage} from "../../pages/detail/detail";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'expense-item',
  templateUrl: 'expense-item.html'
})
export class ExpenseItemComponent implements OnInit{

  text: string;

  @Input()
  expense: Expense;
  @Input()
  filter: string;
  private currency : string = "EUR";
  private bg: string;

  constructor(private sanitizer: DomSanitizer, private configurationService: UserConfigurationService, private navController: NavController){}
  onClickItem(expense: Expense){
    this.navController.push(DetailPage, {"Id": expense.Id });
  }
  ngOnInit(): void {
    this.bg = this.configurationService.getColor(this.expense.Description.charCodeAt(0));
    this.currency = this.configurationService.UserConfig.Currency;
  }
}
