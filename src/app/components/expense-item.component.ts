import {Component, Input, OnInit} from "@angular/core";
import {Expense} from "../models/expense.model";
import {NavController} from "ionic-angular";
import {DetailPage} from "../../pages/detail/detail";
import {UserConfigurationService} from "../services/user-configuration.service";
@Component({
  selector: "expense-item",
  template: `
<button ion-item (click)="onClickItem(expense)">
  <ion-avatar item-left>
    <img src="../../assets/images/avatar.png">
  </ion-avatar>
  <h2>{{expense.Amount | currency:currency:true}}</h2>
  <h5>{{expense.Description}}</h5>
  <ion-note item-right>
    <div class="date" text-right>{{expense.Date | shortdate }}</div>
    <div class="type" text-right>{{expense.Type }}</div>
  </ion-note>
</button>
`,
  styles: [`
    h2 { font-weight: bold; }
    .date {
      align-self: flex-start;
      font-size: 1.2rem;
    }
    .type {
      align-self: flex-end;
      font-size: 1.6rem;
      font-weight: bold;
    }
  `]
})
export class ExpenseItemComponent implements OnInit{

  @Input()
  expense: Expense;
  private currency : string = "EUR";

  constructor(private configurationService: UserConfigurationService, private navController: NavController){}
  onClickItem(expense: Expense){
    this.navController.push(DetailPage, {"Id": expense.Id });
  }
  ngOnInit(): void {
    this.configurationService.getUserCurrency().then(result => this.currency = result);
  }
}
