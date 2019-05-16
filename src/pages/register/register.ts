import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { ServicesOperatonsProvider } from '../../providers/services-operatons/services-operatons';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  email: string;
  password: string;
  file: any;
  name: any;
  number: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public so: ServicesOperatonsProvider
    , public loadingCtrl: LoadingController) {
  }

  register() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Loading, please wait...'
    });

    loading.present();

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.email.toLowerCase().trim(), this.password).then(newUser => {

        firebase
          .database()
          .ref('/userProfile')
          .child(newUser.user.uid)
          .set({
            name: this.name,
            email: this.email,
            number: this.number
          });
          loading.dismiss();
          if(!this.file) {
            let alert = this.alertCtrl.create({
              enableBackdropDismiss: false,
              subTitle: "Successfully registered",
              buttons: [{
                text: 'ok',
                handler: () => {
                  this.email = "";
                  this.password = "";
                  this.name = "";
                  this.number = "";
                }
              }]
            });
            alert.present();
          } else {
            this.so.getUserUid(newUser.user.uid, this.file);
            let alert = this.alertCtrl.create({
              enableBackdropDismiss: false,
              subTitle: "Successfully registered",
              buttons: [{
                text: 'ok',
                handler: () => {
                  this.email = "";
                  this.password = "";
                  this.name = "";
                  this.number = "";
                }
              }]
            });
            alert.present();
          }
      }, (error) => {
        console.log(error);

          var errorMessage: string = error.message;
          let errorAlert = this.alertCtrl.create({
            message: errorMessage,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });

          errorAlert.present();
      });
  }
  logoUpload(event: any) {
    this.file = event.target.files[0];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
