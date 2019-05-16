import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverfuncPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popoverfunc',
  templateUrl: 'popoverfunc.html',
})
export class PopoverfuncPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  gotoUpcoming() {
    this.viewCtrl.dismiss('upcoming');
    // this.navCtrl.push('UpcomingmoviesPage');
  }

  gotoViewMovies() {
    this.viewCtrl.dismiss('view');
    // this.navCtrl.push('ViewmoviesPage');
  }
  gotoAdd() {
   this.viewCtrl.dismiss('addMovies');
   // this.navCtrl.push('AddmoviesPage');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverfuncPage');
  }

}
