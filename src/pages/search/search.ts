import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Searchbar} from 'ionic-angular';
import {ExpenseService} from "../../app/services/expense.service";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  private expenseFilter: string = "";
  private loading = false;
  @ViewChild("searchBarInput") searchBar : Searchbar;

  constructor(public navCtrl: NavController, public navParams: NavParams, private expenseService: ExpenseService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    console.log(this.searchBar);
  }

  onInput(e):void{
    if(e.value){
      this.loading = true;
      setTimeout(()=>{
        this.expenseService.getExpenses().then(res => {
          this.loading = false;
        });
      }, 1000);
    }
    console.log("input", e)
  }

  onCancel(e):void{

    console.log("onCancel", e)

  }

}
