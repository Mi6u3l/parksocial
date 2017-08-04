import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';
import { ReportspotPage } from '../pages/reportspot/reportspot';
import { ParkingspotListPage } from '../pages/parkingspot-list/parkingspot-list';
import { ParkingspotMyPage } from '../pages/parkingspot-my/parkingspot-my';

import { UserLoginPage } from '../pages/user-login/user-login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = UserLoginPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Available Parking Spots', component: ParkingspotListPage },
      { title: 'Report Parking Spot', component: ReportspotPage },
      { title: 'My Parking Spot', component: ParkingspotMyPage }
    ];

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      const firebaseConfig = {
        apiKey: "AIzaSyDMwJxhxyZsDg9y7rnpyMXRVCp731RF3ZU",
        authDomain: "parksocial-175216.firebaseapp.com",
        databaseURL: "https://parksocial-175216.firebaseio.com",
        projectId: "parksocial-175216",
        storageBucket: "parksocial-175216.appspot.com",
        messagingSenderId: "672473039736"

      };

      firebase.initializeApp(firebaseConfig);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
