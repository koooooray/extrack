import { Component } from '@angular/core';

/*
  Generated class for the ExpenseItemComponent component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'expense-item-component',
  templateUrl: 'expense-item-component.html'
})
export class ExpenseItemComponentComponent {

  text: string;

  constructor() {
    console.log('Hello ExpenseItemComponent Component');
    this.text = 'Hello World';
  }

}
