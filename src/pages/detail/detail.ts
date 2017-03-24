import {Component, ViewChild} from '@angular/core';
import {Expense} from "../../app/models/expense.model";
import {ExpenseService} from "../../app/services/expense.service";
import {NavParams, Select} from "ionic-angular";
import * as moment from "moment"
import Moment = moment.Moment;
import {UserConfigurationService} from "../../app/services/user-configuration.service";

@Component({
  selector: 'page-list',
  templateUrl: 'detail.html'
})
export class DetailPage {

  private isInEditMode = false;
  private expense : Expense;
  private loading = true;
  private useCurrentDate = false;
  private specificDate: Date;
  private expenseCategories : string[];
  private selectedType: string;
  @ViewChild("userCategorySelector") userCategorySelector: Select;

  constructor(private userConfigService: UserConfigurationService, private expenseService: ExpenseService, private navparam: NavParams){}

  ionViewDidLoad() {
    const id = this.navparam.get("Id");
    this.isInEditMode = !id;
    this.useCurrentDate = !id;
    this.userConfigService.getUserConfiguration().then(config => this.expenseCategories = config.ExpenseCategories)
    this.expenseService.getExpenseById(id).then(expense => {
      this.expense = expense;
      this.specificDate = moment(this.expense).toDate();
      this.loading = false;
    });
  }

  onEditClicked():void{
    this.isInEditMode = true;
  }

  onSaveClicked():void{
    if(this.expenseCategories.indexOf(this.expense.Type) === -1){
      this.userConfigService.addCategory(this.expense.Type);
    }
    this.expenseService.addUpdateExpense(this.expense).then(() => this.isInEditMode = false);
  }

  onSelectCategoriesClicked(): void{
    this.userCategorySelector.open();
    console.log(this.userCategorySelector);
  }

  onChangeSelectCategories(): void{
    this.expense.Type = this.selectedType;
  }

}
