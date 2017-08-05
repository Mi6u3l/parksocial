import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';
import { ReportspotPage } from '../pages/reportspot/reportspot';
import { ParkingspotListPage } from '../pages/parkingspot-list/parkingspot-list';
import { ParkingspotMyPage } from '../pages/parkingspot-my/parkingspot-my';
import { SettingsPage } from '../pages/settings/settings';
import { NotificationsPage } from '../pages/notifications/notifications';

import { UserLoginPage } from '../pages/user-login/user-login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { SessionService } from '../providers/session/session';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = UserLoginPage;
  pages: Array<{title: string, component: any}>;
  currentUserImageUrl: any;
  renderImage: boolean;
   
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public session: SessionService
  ) {
    this.initializeApp();

    
    // set our app's pages
    this.pages = [
      { title: 'Available Parking Spots', component: ParkingspotListPage },
      { title: 'Report Parking Spot', component: ReportspotPage },
      { title: 'My Parking Spot', component: ParkingspotMyPage },
      { title: 'My Notifications', component: NotificationsPage },
      { title: 'Settings', component: SettingsPage },
      
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

  menuOpened() {
    this.currentUserImageUrl = this.session.user['picture'];
    this.renderImage = true;
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  
}
