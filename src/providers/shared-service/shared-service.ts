import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { Observable } from 'rxjs/Observable';


@Injectable()
export class SharedServiceProvider {

  protected timer: Observable<number>;
  protected interval: any;

  constructor() {
    console.log('Hello SharedServiceProvider Provider');
  }



  /**
   * Timer accross components to track time taken
  */
  getTimer(reset?: boolean): Observable<number> {
    if (reset && this.interval) {
      this.stopTimer();
    }

    if (!this.timer || reset) {
      let i = 0;
      let source = new BehaviorSubject(0);
      this.interval = setInterval(() => {
        source.next(++i);
      }, 1000)
      this.timer = source.asObservable();
    }

    return this.timer;
  }

  /**
   * To stop timer 
  */
  stopTimer() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

}
