import { Component } from '@angular/core';
import {ExpenseService} from "../../app/services/expense.service";
import {Expense} from "../../app/models/expense.model";
import {NavController} from "ionic-angular";
import {SearchPage} from "../search/search";
import {DetailPage} from "../detail/detail";
import {Observable} from "rxjs";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  private expenses: Observable<Expense[]>;
  constructor(private expenseService: ExpenseService, private navController: NavController) {}

  ionViewDidLoad() {
  }

  ionViewWillEnter(){
    this.expenses = this.expenseService.getExpenses();
  }

  onSearchClicked(){
    this.navController.push(SearchPage);
  }

  onAddExpenseClicked(){
    this.navController.push(DetailPage, {"Id": undefined });
  }


}
