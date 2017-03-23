import { Component } from '@angular/core';
import {ExpenseService} from "../../app/services/expense.service";
import {Expense} from "../../app/models/expense.model";
import {NavController} from "ionic-angular";
import {SearchPage} from "../search/search";
import {DetailPage} from "../detail/detail";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  private expenses : Expense[] = [];
  constructor(private expenseService: ExpenseService, private navController: NavController) {}

  ionViewDidLoad() {
    this.expenseService.getExpenses().then(result => {
      this.expenses = result
    });
  }

  onSearchClicked(){
    this.navController.push(SearchPage);
  }

  onAddExpenseClicked(){
    this.navController.push(DetailPage, {"Id": undefined });
  }

}
