import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ListPage} from "../pages/list/list";
import {DetailPage} from "../pages/detail/detail";
import {UserConfigurationService} from "./services/user-configuration.service";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = ListPage;
  private configLoaded: boolean = false;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private userConfigurationService: UserConfigurationService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.userConfigurationService.loadUserConfiguration()
        .then(()=>{
          this.configLoaded = true;
        });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
