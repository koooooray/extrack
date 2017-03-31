import {Observable, Observer} from "rxjs";
import {Injectable} from "@angular/core";
@Injectable()
export class LoadingService{

  loading$: Observable<Boolean>;
  i: number = 0;
  private observer: Observer<Boolean>;

  constructor(){
    this.loading$ = new Observable(obs => {
      this.observer = obs;
    }).share();
  }

  toggleLoading(value: Boolean):void{
    this.observer.next(value);
  }

}
