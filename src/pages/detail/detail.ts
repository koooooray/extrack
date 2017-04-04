import {Component, ViewChild} from '@angular/core';
import {Expense} from "../../app/models/expense.model";
import {ExpenseService} from "../../app/services/expense.service";
import {NavParams, Select, NavController, ActionSheetController, Platform} from "ionic-angular";
import * as moment from "moment"
import Moment = moment.Moment;
import {UserConfigurationService} from "../../app/services/user-configuration.service";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {DomSanitizer} from "@angular/platform-browser";

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
              private actionSheetCtrl: ActionSheetController,
              private camera: Camera,
              private sanitizer: DomSanitizer,
              private platform: Platform){}

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
    this.actionSheetCtrl.create({
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
    }).present();
  }
  onDeletePhoto(event){
    event.stopPropagation();
    this.actionSheetCtrl.create({
      title: 'Do You want to delete this Photo?',
      buttons: [
        {
          text: 'Yes, delete',
          role: 'destructive',
          cssClass: "delete-action-button",
          icon: "trash",
          handler: () => {
            this.expense.Photo = "";
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          icon: "close",
          handler: () => {
          }
        }
      ]
    }).present();
  }
  onPromtPhoto(){
    if(!this.platform.is('cordova')){
      return;
    }
    this.actionSheetCtrl.create({
      title: 'Do You want to change this Photo?',
      buttons: [
        {
          text: 'Yes, change',
          role: 'destructive',
          cssClass: "delete-action-button",
          icon: "trash",
          handler: () => {
            this.onTakePhoto();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          icon: "close",
          handler: () => {
          }
        }
      ]
    }).present();
  }
  onTakePhoto(){
    if(!this.platform.is('cordova')){
      return;
    }
    const options: CameraOptions = {
      quality: 50,
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((picture)=>{
      this.expense.Photo = picture;
    }, (error)=>{
      // handle
    });
  }

}
