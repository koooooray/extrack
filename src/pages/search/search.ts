import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ExpenseService} from "../../app/services/expense.service";
import {FormControl} from "@angular/forms";
import 'rxjs/add/operator/debounceTime.js';
import 'rxjs/add/operator/distinctUntilChanged.js';
import {Subscription, Observable} from "rxjs";
import {Expense} from "../../app/models/expense.model";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  private expenseFilter: string = "";
  private searchInitiated: Boolean = false;
  private filter : FormControl = new FormControl();
  private expenses: Observable<Expense[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private expenseService: ExpenseService) {
    /*this.expenses = this.filter.valueChanges
      .debounceTime(700)
      .distinctUntilChanged()
      .switchMap(filter => {
        this.searchInitiated = true;
        if(filter && filter.length > 2){
          return this.expenseService.filterExpense(filter);
        } else {
          return this.expenses;
        }
      });*/
  }
}
