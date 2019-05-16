import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, LoadingController } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
import firebase from 'firebase';
import { PopoverComponent } from '../../components/popover/popover';
import { ServicesOperatonsProvider } from '../../providers/services-operatons/services-operatons';
import * as _ from 'lodash';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public user = {} as User;
  loginStatus: any;
  movies: any;
  searchTerm: string = '';
  length: any;
  cat2: any;
  catname: any;
  availMovies: any;
  availability: any;
  allMovies: any;
  hidelogin: any;
  userInfo: any;
  uid: any;
  userPic: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private afAuth: AngularFireAuth
    , public popoverController: PopoverController, public so: ServicesOperatonsProvider, public loadingCtrl: LoadingController) {
    var isLoggedIn = localStorage.getItem('muid');
    this.uid = isLoggedIn;
    this.hidelogin = false;
    this.length = "123";
    if(!isLoggedIn) {
      this.loginStatus = 'Not logged in';
      this.hidelogin = false;
    } else {
      this.loginStatus = 'Logged in';
      this.hidelogin = true;
    }

    // this.so.getMovie();

    this.cat2 = [{
      category2: 'All'
    },{
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

    this.availability = [{
      released: 'All'
    },{
      released: 'Available'
    }, {
      released: 'Upcoming'
    }
    ]
  }

  logout() {
    localStorage.removeItem('muid');
    let alert = this.alertCtrl.create({
      enableBackdropDismiss: false,
      subTitle: "Successfully logged out",
      buttons: [{
        text: 'ok',
        handler: () => {
          this.loginStatus = 'Not logged in';
          this.hidelogin = false;
        }
      }]
    });
    alert.present();
  }
  selMovie(y) {
    this.catname = y;
    console.log(y);
    if(this.catname == 'All') {
      this.movies = this.availMovies;
    } else {
      this.movies = _.filter(this.availMovies, (x) => {
        return x.category2 === this.catname;
      });
      if (this.movies.length == 0) {
        this.length = null;
      } else {
        this.length = "123";
      }
    }
  }

  selDate(y) {

    console.log(y);
    if (y == 'All') {
      this.movies = this.allMovies;
    } else if (y == 'Available'){
      this.movies = _.filter(this.allMovies, (x) => {
        console.log(x);
        return x.category === 'available';
      });
      if (this.movies.length == 0) {
        this.length = null;
      } else {
        this.length = "123";
      }
    } else if (y == 'Upcoming') {
      this.movies = _.filter(this.allMovies, (x) => {
        console.log(x);
        return x.category === 'upcoming';
      });
      if (this.movies.length == 0) {
        this.length = null;
      } else {
        this.length = "123";
      }
    }

  }

  gotoView(x) {
    this.navCtrl.push('ViewMoviePage', {
      filmData: x
    });
  }

  async openPopover(ev: any) {
    const popover = await this.popoverController.create('PopoverfuncPage');
    popover.onDidDismiss(data => {
      console.log(data);
      if (data == 'addMovies') {
        this.navCtrl.setRoot('AddmoviesPage');
      } else if(data == 'upcoming') {
        this.navCtrl.push('UpcomingmoviesPage');
      } else if (data == 'view') {
        this.navCtrl.push('ViewmoviesPage');
      }
    });
    return await popover.present();
  }

  openModal(user: User) {
    let alert = this.alertCtrl.create({
      subTitle: "Sign in",
      inputs: [
        {
          name: 'Username',
          placeholder: 'Username',
          type: 'text'
        }, {
          name: 'Password',
          placeholder: 'Password',
          type: 'password'
        }],
      buttons: [{
        text: 'Cancel',
        handler: () => {

        }
      }, {
          text: 'Sign In',
          handler: (data) => {
            let loading = this.loadingCtrl.create({
              spinner: 'crescent',
              content: 'Loading, please wait...'
            });

            loading.present();

            this.afAuth.auth.signInWithEmailAndPassword((data.Username.toLowerCase()).trim(), data.Password).then(result => {
              if (result) {
                console.log(result);
                localStorage.setItem('muid',result.user.uid);
                this.so.getUserdata(result.user.uid).subscribe(data => {
                  console.log(data);
                  this.userInfo = data;
                  if (!this.userInfo) {

                  } else {
                    this.userPic = this.userInfo.userPic;
                    if (!this.userPic || this.userPic == null) {
                      this.hidelogin == false;
                    }
                  }
                });
                let alert = this.alertCtrl.create({
                  enableBackdropDismiss: false,
                  subTitle: "Successfully logged in",
                  buttons: [{
                    text: 'ok',
                    handler: () => {
                      loading.dismiss();
                        this.loginStatus = 'Logged in';
                        this.hidelogin = true;
                    }
                  }]
                });
                alert.present();
               }
              }).catch(error => {
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
        }]
    });
    alert.present();
  }
  setFilteredItems() {
    this.length = "123";
    console.log(this.searchTerm);
    this.movies = this.so.filterItems(this.searchTerm);
    console.log(this.movies);
    if(this.movies == null) {
      console.log('Zulllll');
    } else {
      console.log('Nulllll');
      if (this.movies.length == 0) {
        this.length = null;
      }
    }
  }

  ionViewDidLoad() {

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Loading, please wait...'
    });

    loading.present();

    this.so.getMovies().subscribe((data) => {
      this.allMovies = data;
      console.log(data);
      this.movies = _.filter(data, (x) => {
        console.log(x);
        return x.category === 'available';
      });
      console.log(this.movies);
      if (this.movies == null) {
        loading.dismiss();
      }
      else {
        loading.dismiss();
        this.availMovies = this.movies;
        // this.setFilteredItems();
      }
    }, (err) => {
      loading.dismiss();
      console.log("Error : ", err);
        var errorMessage: string = err;
        console.log(errorMessage);
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

    this.so.getUserdata(this.uid).subscribe(data =>{
      console.log(data);
      this.userInfo = data;
      if(!this.userInfo) {

      } else {
        this.userPic = this.userInfo.userPic;
        if (!this.userPic || this.userPic == null) {
          this.hidelogin == false;
        }
      }
    }, (err) => {
      console.log("Error : ", err);
        var errorMessage: string = err;
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
    console.log('ionViewDidLoad HomePage');
  }

}
