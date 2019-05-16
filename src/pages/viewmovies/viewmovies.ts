import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesOperatonsProvider } from '../../providers/services-operatons/services-operatons';
import * as _ from 'lodash';

/**
 * Generated class for the ViewmoviesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewmovies',
  templateUrl: 'viewmovies.html',
})
export class ViewmoviesPage {
  movies: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public so: ServicesOperatonsProvider) {
  }

  viewMovie(x) {
    this.navCtrl.push('SeemoviePage', {
      filmData: x
    })
  }

  ionViewDidLoad() {
    this.so.getMovies().subscribe((data) => {
      this.movies = _.filter(data, (x) => {
        console.log(x);
        return x.category === 'available';
      });
    }, (err) => {
      console.log("Error : ", err)
    });
    console.log('ionViewDidLoad ViewmoviesPage');
  }

}
