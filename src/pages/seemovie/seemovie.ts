import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the SeemoviePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-seemovie',
  templateUrl: 'seemovie.html',
})
export class SeemoviePage {

  isLoggedIn: any;
  filmData: any;
  userInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.isLoggedIn = localStorage.getItem('muid');
    this.filmData = navParams.get('filmData');

    if (!this.isLoggedIn) {
      let alert = this.alertCtrl.create({
        enableBackdropDismiss: false,
        subTitle: "Not logged in",
        buttons: [{
          text: 'ok',
          handler: () => {
            this.navCtrl.setRoot('HomePage');
          }
        }]
      });
      alert.present();
    } else {

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeemoviePage');
  }

}
