import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { SyncAsync } from '@angular/compiler/src/util';

import { ServicesOperatonsProvider } from '../../providers/services-operatons/services-operatons';

/**
 * Generated class for the AddmoviesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addmovies',
  templateUrl: 'addmovies.html',
})
export class AddmoviesPage {
  cat: any;
  cat2: any;
  mname: any;
  catname: any;
  rating: any;
  openingDate: any;
  length: any;
  file: any;
  cattype: any;
  description: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public so: ServicesOperatonsProvider) {
    this.cat = [{
      category: 'upcoming'
    }, {
        category: 'available'
      }
    ]

    this.cat2 = [{
      category2: 'Comedy'
    }, {
      category2: 'Action'
      }, {
        category2: 'Adventure'
      }, {
        category2: 'Animation'
      }, {
        category2: 'Horror'
      }, {
        category2: 'Mystery'
      }, {
        category2: 'Drama'
      }, {
        category2: 'Romance'
      }
    ]
  }

  addMovie() {
    firebase
      .database()
      .ref('/movies')
      .push({
        name: this.mname,
        category: this.catname,
        parentalRating: this.rating,
        openingDate: this.openingDate,
        length: this.length,
        category2: this.cattype,
        description: this.description
      }).then(data =>{
        console.log(data);
        this.so.getStoreUid(data.key, this.file);
        // this.so.getMovieUid(this.mname);
      });
  }
  logoUpload(event: any) {
    this.file = event.target.files[0];
  }
  selMovie(x) {
    this.catname = x;
  }
  selectCat(x) {
    console.log(x);
    this.cattype = x;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddmoviesPage');
  }

}
