import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ConfirmPricePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm-price',
  templateUrl: 'confirm-price.html',
})
export class ConfirmPricePage {
  filmData: any;
  isLoggedIn: any;
  selectedDate: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.filmData = navParams.get('filmData');
    this.selectedDate = navParams.get('selectedDate');
    console.log(this.filmData);
    this.isLoggedIn = localStorage.getItem('muid');
  }

  gotoPay() {

    if (!this.isLoggedIn) {
      let alert = this.alertCtrl.create({
        enableBackdropDismiss: false,
        subTitle: "Please login or register to continue",
        buttons: [{
          text: 'ok',
          handler: () => {
            this.navCtrl.setRoot('HomePage');
          }
        }]
      });
      alert.present();
    } else {
      this.navCtrl.push('PaymentPage', {
        filmData: this.filmData,
        selectedDate: this.selectedDate
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPricePage');
  }

}
