import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController  } from 'ionic-angular';
import * as moment from 'moment';

/**
 * Generated class for the ViewMoviePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-movie',
  templateUrl: 'view-movie.html',
})
export class ViewMoviePage {
  filmData: any;
  formatedDate: any;
  selectedDate: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController
    , public loadingCtrl: LoadingController, private modalCtrl: ModalController) {
    this.filmData = navParams.get('filmData');
    console.log(this.filmData);
  }

  gotoConformPrice() {
    this.navCtrl.push('ConfirmPricePage',{
      filmData: this.filmData,
      formatedDate: this.formatedDate,
      selectedDate: this.selectedDate
    });
  }

  selectdate() {
    let modal = this.modalCtrl.create('SelectdatePage');
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        console.log(data);
        let selectedDate = new Date(data.startTime);
        this.selectedDate = selectedDate;

        this.formatedDate = moment(selectedDate).format('MMM DD, YYYY HH:mm:ss').toString();
        console.log(this.formatedDate);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewMoviePage');
  }

}
