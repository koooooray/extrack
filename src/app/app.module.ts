import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ListPage} from "../pages/list/list";
import {ExpenseService} from "./services/expense.service";
import {UserConfigurationService} from "./services/user-configuration.service";
import {SearchPage} from "../pages/search/search";
import {DetailPage} from "../pages/detail/detail";
import {DatePipe} from "@angular/common";
import {ExpenseItemComponent} from "../components/expense-item/expense-item";
import {ShortDatePipe} from "../pipes/short-date";

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    SearchPage,
    DetailPage,
    ExpenseItemComponent,
    ShortDatePipe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    SearchPage,
    DetailPage
  ],
  providers: [
    ExpenseService,
    UserConfigurationService,
    DatePipe,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
