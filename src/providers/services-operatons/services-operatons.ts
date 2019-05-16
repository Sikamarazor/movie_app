import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject, QueryFn } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';
// import { map } from 'rxjs-compat/operators';
/*
  Generated class for the ServicesOperatonsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesOperatonsProvider {
  moivesData: Observable<any>;
  movieInfoRef: AngularFireObject<any>;
  userDataRef: AngularFireObject<any>;
  userData: Observable<any>;
  userTicketsRef: AngularFireObject<any>;
  userTickets: Observable<any>;
  storeRef: AngularFireObject<any>;
  snapShot: any;
  moviesDat: any;

  constructor(public http: HttpClient, private afd: AngularFireDatabase) {
    console.log('Hello ServicesOperatonsProvider Provider');
  }
  private extractData(res: Response) {
    const body = res;
    return body || {};
  }
  getMovies() {
    this.moivesData = this.afd.list('/movies').valueChanges().map((arr) => { return arr.reverse(); });
    this.getMovie();
    return this.moivesData;
  }
  getMovie() {
    this.afd.list('/movies').valueChanges().subscribe(res => {
      this.moviesDat = res;
      console.log(this.moviesDat);
    });
  }
  getMovieUid(name) {
    this.movieInfoRef = this.afd.object('/userProfile/movies');
    const messageInfo = this.movieInfoRef.query.orderByChild('name').equalTo(name).once('child_added', (snapshot) => {
      console.log(snapshot);
    });
    return messageInfo;
  }

  getUserdata(uid) {
    this.userDataRef = this.afd.object('/userProfile/' + uid);
    this.userData = this.userDataRef.valueChanges();
    return this.userData;
  }

  getTickets(uid) {
    this.userTickets = this.afd.list('/userProfile/' + uid + '/tickets').valueChanges();
    return this.userTickets;
  }

  getUserUid(snapshotKey, file) {
    console.log(file);
    this.storeRef = this.afd.object('/userProfile');

    console.log(snapshotKey);

    const storageRef = firebase.storage().ref('/userProfile');
    console.log(storageRef);
    console.log(file);
    const uploadLogo = storageRef.child(snapshotKey).child('logo').child(file.name);
    console.log(uploadLogo);

    const uploadTaskLg = uploadLogo.put(file).then(data => {
      console.log(data);

      const storages = firebase.storage();
      const gsReference = storages.refFromURL('gs://cinemapro-5191b.appspot.com/userProfile/' + snapshotKey + '/logo/' + file.name);
      gsReference.getDownloadURL().then((url) => {
        console.log(url);
        const storRef = this.afd.object('/userProfile/' + snapshotKey);
        storRef.update({
          userPic: url
        });
      });
    });
    return this.snapShot;
  }

  getStoreUid(snapshotKey, file) {
    console.log(file);
    this.storeRef = this.afd.object('/movies');

    console.log(snapshotKey);

    const storageRef = firebase.storage().ref('/movies');
    console.log(storageRef);
    console.log(file);
    const uploadLogo = storageRef.child(snapshotKey).child('logo').child(file.name);
    console.log(uploadLogo);

    const uploadTaskLg = uploadLogo.put(file).then(data => {
      console.log('Im in');
      console.log(data);

      const storages = firebase.storage();
      const gsReference = storages.refFromURL('gs://cinemapro-5191b.appspot.com/movies/' + snapshotKey + '/logo/' + file.name);
      gsReference.getDownloadURL().then((url) => {
        console.log(url);
        const storRef = this.afd.object('/movies/' + snapshotKey);
        storRef.update({
          picUrl: url
        });
      });
    });
    return this.snapShot;
  }

  filterItems(searchTerm) {

    console.log(searchTerm);
    console.log(this.moviesDat);
    if (this.moviesDat == undefined) {

    } else {

      var movies = _.filter(this.moviesDat, (x) => {
        console.log(x);
        return x.category === 'available';
      });
      return movies.filter((movie) => {
        console.log(movie);
        if (movie.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return movie.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        }
      });
    }

  }

}
