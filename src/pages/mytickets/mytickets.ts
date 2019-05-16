import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import firebase from 'firebase';
import { ServicesOperatonsProvider } from '../../providers/services-operatons/services-operatons';

/**
 * Generated class for the MyticketsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mytickets',
  templateUrl: 'mytickets.html',
})
export class MyticketsPage {
  tickets: any;
  userUid: any;
  length: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public so: ServicesOperatonsProvider) {
    this.userUid = localStorage.getItem('muid');
    this.length = "123";
  }

  viewMovie(x) {
    this.navCtrl.push('SeemoviePage',{
      filmData: x
    })
  }

  ionViewDidLoad() {
    this.so.getTickets(this.userUid).subscribe(data => {
      this.tickets = data;
      console.log(this.tickets);
      if(this.tickets == null) {
        this.length = null
      } else {
        this.length = "123";
      }
    })
    console.log('ionViewDidLoad MyticketsPage');
  }

}
