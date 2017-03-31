import { Component } from '@angular/core';
import {LoadingService} from "../../app/services/loading.service";
@Component({
  selector: 'loading',
  templateUrl: 'loading.html'
})
export class LoadingComponent {
  visible: Boolean = false;

  constructor(private loadingService: LoadingService) {
    this.loadingService.loading$.subscribe(isVisible => {
      console.log(isVisible);
      this.visible = isVisible;
    });
  }
}
