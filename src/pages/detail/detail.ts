import { Component } from '@angular/core';
import {Expense} from "../../app/models/expense.model";
import {ExpenseService} from "../../app/services/expense.service";
import {NavParams} from "ionic-angular";

@Component({
  selector: 'page-list',
  templateUrl: 'detail.html'
})
export class DetailPage {

  private isInEditMode = false;
  private expense : Expense;
  private loading = true;
  private useCurrentDate = false;

  constructor(private expenseService: ExpenseService, private navparam: NavParams){}

  ionViewDidLoad() {
    const id = this.navparam.get("Id");
    this.isInEditMode = !id;
    this.useCurrentDate = !id;
    this.expenseService.getExpenseById(id).then(expense => {
      this.expense = expense;
      this.loading = false;
    });
  }

  onEditClicked():void{
    this.isInEditMode = true;
  }

  onSaveClicked():void{
    if(this.useCurrentDate){
      this.expense.Date = this.expenseService.getNowDate();
    }
    this.expenseService.addUpdateExpense(this.expense).then(() => this.isInEditMode = false);
  }

}
