import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';



declare var google;

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  orderPicked: boolean = false;

  deliveryTime: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sharedService: SharedServiceProvider,
    public alertController: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
    this.loadMap(-34.9290, 138.6010);

    this.sharedService.getTimer(false)
      .subscribe((res) => {
        console.log(res)
        this.deliveryTime = res;
      })
  }


  /**
   * For loading a map in the view
  */
  loadMap(lat: any, lng: any) {
    let latLng = new google.maps.LatLng(lat, lng);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.addMarker()
  }

  /**
   * Placing a marker on Map
  */
  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Order store postion!</h4>";

    this.addInfoWindow(marker, content);

  }

  /**
   * Placing a dummy info window for marker
  */
  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  /**
   * When order is picked we are updating map with delivery location details( Dummy values)
  */
  picked() {
    this.orderPicked = true;
    let interval = setInterval(() => {
      this.loadMap(17.4457107, 78.3465634);
      clearInterval(interval);
    }, 400)
  }

  /**
   * Once the order is delivered the timer is stoped and time taken is displayed
  */
  orderDelivered() {
    this.sharedService.stopTimer()

    let secondsToMinutes = Math.floor(this.deliveryTime / 60) + ':' + ('0' + Math.floor(this.deliveryTime % 60)).slice(-2);
    this.showAlertMessage("Great", "you have delivered in " + secondsToMinutes + " mins")
  }

  /**
 * Alert Message
*/
  showAlertMessage(subtitle: string, message: string) {
    let confirm = this.alertController.create({
      subTitle: subtitle,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }
}
