import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OrderPage } from '../order/order';
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  received : boolean = false;
  constructor(
    public navCtrl: NavController,
    public sharedService : SharedServiceProvider) {
    
    /**
     * since we do not have an api to fetch new orders we are using timer here
    */
    let interval = setInterval(() => {
      this.received = true
      clearInterval(interval);
    }, 2000)
  }

  /**
   * On accepting an order this function is called
  */
  accept(){
    this.sharedService.getTimer(true)
            .subscribe((res)=>{
                console.log(res)
    })
    this.navCtrl.push(OrderPage)
  }

}
