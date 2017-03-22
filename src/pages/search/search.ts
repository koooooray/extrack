import {Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormControl} from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import {Expense} from "../../app/models/expense.model";
import {ExpenseService} from "../../app/services/expense.service";
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  private filteredExpenses: Expense[];
  private loading: boolean;
  //private filterInput: string;
  private filterInputControl : FormControl;
  constructor(public navCtrl: NavController, public navParams: NavParams, private expenseService: ExpenseService) {
    this.filterInputControl = new FormControl();
  }

  ionViewDidLoad() {
    this.filterInputControl.valueChanges.subscribe(() => {
      this.loading = true;
      this.filteredExpenses = [];
    });
    this.filterInputControl.valueChanges
      .debounceTime(500)
      .subscribe(newVal =>
        {
          this.filteredExpenses = [];
          this.expenseService.getExpenses().then(result => {
            this.filteredExpenses = result;
            this.loading = false;
          });
        }
      );
  }
}
