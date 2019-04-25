import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginDetails: any = {
    userName: "",
    userPwd: ""
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertController: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  login() {
    /**
     * Since we don not have an api to check we are statically checkiong the username and password are empty are not
    */
    if (this.loginDetails.userName != "" && this.loginDetails.userPwd != "") {
      this.navCtrl.push(HomePage)
    } else {
      this.showAlertMessage("OOPS !!!", "User credentials cannot be empty");
    }
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
