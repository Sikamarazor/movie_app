import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { ServicesOperatonsProvider } from '../../providers/services-operatons/services-operatons';
import { LocalNotifications } from '@ionic-native/local-notifications';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  isLoggedIn: any;
  filmData: any;
  userInfo: any;
  name: any;
  email: any;
  number: any;
  selectedDate: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController
    , public so: ServicesOperatonsProvider, private localNotifications: LocalNotifications) {
     this.isLoggedIn = localStorage.getItem('muid');

    this.selectedDate = navParams.get('selectedDate');
    this.filmData = navParams.get('filmData');
    console.log(this.filmData);
  }

  pay() {

    var date = new Date();
    // 2.9
    var dateNow = date.toDateString() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    console.log(dateNow);

    var ref1 = Math.floor((Math.random() * 1000000) + 10000);
    var ref2 = Math.floor((Math.random() * 100000) + 10000);
    var mRef = ref1.toString() + ref2.toString();

    firebase
      .database()
      .ref('/userProfile')
      .child(this.isLoggedIn)
      .child('tickets')
      .push({
        amount: "R95.00",
        date: dateNow,
        reference: mRef,
        name: this.filmData.name,
        picUrl: this.filmData.picUrl,
        openingDate: this.filmData.openingDate,
        category2: this.filmData.category2,
        description: this.filmData.description
      }).then(data =>{
        let alert = this.alertCtrl.create({
          enableBackdropDismiss: false,
          subTitle: "Ticked Successfully booked",
          buttons: [{
            text: 'ok',
            handler: () => {

              this.localNotifications.schedule({
                title: "Movie",
                text: "Your movie is ready",
                at: this.selectedDate,
                sound: null,
                data: {
                  amount: "R95.00",
                  date: dateNow,
                  reference: mRef,
                  name: this.filmData.name,
                  picUrl: this.filmData.picUrl,
                  openingDate: this.filmData.openingDate,
                  category2: this.filmData.category2,
                  description: this.filmData.description
                }
              });
              this.navCtrl.setRoot('HomePage');
            }
          }]
        });
        alert.present();
      });

  }

  ionViewDidLoad() {
    this.so.getUserdata(this.isLoggedIn).subscribe(data => {
      console.log(data);
      this.userInfo = data;
      this.name = this.userInfo.name;
      this.number = this.userInfo.number;
      this.email = this.userInfo.email;
    })
    console.log('ionViewDidLoad PaymentPage');
  }

}
