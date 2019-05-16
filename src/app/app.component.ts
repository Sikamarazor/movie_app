import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ThreeDeeTouch, ThreeDeeTouchQuickAction, ThreeDeeTouchForceTouch } from '@ionic-native/three-dee-touch';
// import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'HomePage';

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen
    , private localNotifications: LocalNotifications, private alertCtrl: AlertController, private threeDeeTouch: ThreeDeeTouch) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

      this.localNotifications.on("click", (notification, state) => {
      console.log(notification.data);
      var parsifiedObj = JSON.parse(notification.data);
      console.log(parsifiedObj);
      console.log(state);
      let alert = this.alertCtrl.create({
        title: "Notification Clicked",
        subTitle: "You just clicked the scheduled notification",
        buttons: [{
          text: 'ok',
          handler: () => {
            let alert = this.alertCtrl.create({
              enableBackdropDismiss: false,
              subTitle: parsifiedObj.movieName,
              buttons: [{
                text: 'ok',
                handler: () => {
                  this.nav.setRoot('SeemoviePage');
                }
              }]
            });
            alert.present();
          }
        }]
      });
      alert.present();
    });

      if (this.platform.is('android')) {
        this.threeDeeTouch.isAvailable().then(isAvailable => console.log('3D Touch available? ' + isAvailable));

        this.threeDeeTouch.watchForceTouches()
          .subscribe(
            (data: ThreeDeeTouchForceTouch) => {
              console.log('Force touch %' + data.force);
              console.log('Force touch timestamp: ' + data.timestamp);
              console.log('Force touch x: ' + data.x);
              console.log('Force touch y: ' + data.y);
            }
          );

        let actions: Array<ThreeDeeTouchQuickAction> = [
          {
            type: 'search',
            title: 'Search',
            iconType: 'Search'
          }
        ];

        this.threeDeeTouch.configureQuickActions(actions);

        this.threeDeeTouch.onHomeIconPressed().subscribe(
          (payload) => {
            // returns an object that is the button you presed
            console.log('Pressed the ${payload.title} button')
            console.log(payload.type)

          }
        )
      }

      // this.platform.registerBackButtonAction();
      this.splashScreen.hide();
    });
  }
  register() {
    this.nav.setRoot('RegisterPage');
  }

  gotoTcikets() {
    this.nav.setRoot('MyticketsPage');
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
