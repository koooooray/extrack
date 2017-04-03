import {Component, ViewChild} from '@angular/core';
import {Expense} from "../../app/models/expense.model";
import {ExpenseService} from "../../app/services/expense.service";
import {NavParams, Select, NavController, ActionSheetController} from "ionic-angular";
import * as moment from "moment"
import Moment = moment.Moment;
import {UserConfigurationService} from "../../app/services/user-configuration.service";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'page-list',
  templateUrl: 'detail.html'
})
export class DetailPage {

  private expense : Expense = this.expenseService.emptyExpense();
  private useCurrentDate = false;
  private specificDate: Date;
  private expenseCategories : string[];
  private selectedType: string;
  @ViewChild("userCategorySelector") userCategorySelector: Select;

  constructor(private formBuilder: FormBuilder ,
              private userConfigService: UserConfigurationService,
              private expenseService: ExpenseService,
              private navparam: NavParams,
              private nav: NavController,
              private actionSheetCtrl: ActionSheetController){}

  ionViewDidLoad() {
    const id = this.navparam.get("Id");
    this.useCurrentDate = !id;
    this.expenseCategories = this.userConfigService.UserConfig.ExpenseCategories;
    this.expenseService.getExpenseById(id)
      .then(expense => {
        this.expense = expense;
        this.specificDate = moment(this.expense).toDate();
      })
      .catch((ex)=>this.expense=this.expenseService.emptyExpense());
  }

  onSaveClicked():void{
    if(this.expenseCategories.indexOf(this.expense.Type) === -1){
      this.userConfigService.addCategory(this.expense.Type);
    }
    this.expenseService.putExpense(this.expense);
    this.nav.pop();
  }

  onSelectCategoriesClicked(): void{
    this.userCategorySelector.open();
  }

  onChangeSelectCategories(): void{
    this.expense.Type = this.selectedType;
  }

  onDeleteClicked():void{
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure?',
      buttons: [
        {
          text: 'Yes, delete',
          role: 'destructive',
          cssClass: "delete-action-button",
          icon: "trash",
          handler: () => {
            this.expenseService.deleteExpense(this.expense.Id);
            this.nav.pop();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          icon: "close",
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

}
