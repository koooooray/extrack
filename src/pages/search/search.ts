import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
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
  @ViewChild("focusInput") myInput;
  private expenseFilter: string = "";
  private searchInitiated: Boolean = false;
  private filter : FormControl = new FormControl();
  private filterText: string;
  private expenses: Observable<Expense[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private expenseService: ExpenseService, private platform: Platform, private keyboard: Keyboard) {
    this.expenses = this.filter.valueChanges
      .debounceTime(700)
      .distinctUntilChanged()
      .switchMap(filter => {
        this.searchInitiated = true;
        if(filter && filter.length > 2){
          this.filterText = filter;
          return this.expenseService.queryExpenses(filter);
        } else {
          return this.expenses;
        }
      });
  }

  ionViewDidLoad(){
    setTimeout(()=>{
      if(this.platform.is('cordova')){
        this.keyboard.show();
      }
      this.myInput.setFocus();
    }, 500);
  }

}
