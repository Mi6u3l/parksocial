import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routing';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';


import { UserSignupPageModule } from '../pages/user-signup/user-signup.module';
import { UserLoginPageModule } from '../pages/user-login/user-login.module';
import { ReportspotPageModule } from '../pages/reportspot/reportspot.module';
import { ParkingspotListPageModule } from '../pages/parkingspot-list/parkingspot-list.module';
import { ParkingspotDetailPageModule } from '../pages/parkingspot-detail/parkingspot-detail.module';
import { ParkingspotMyPageModule } from '../pages/parkingspot-my/parkingspot-my.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { NotificationsPageModule } from '../pages/notifications/notifications.module';

import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SessionService } from '../providers/session/session';

import {BusyModule} from 'angular2-busy';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ParkingSpotProvider } from '../providers/parking-spot/parking-spot';
import { ImagePicker } from '@ionic-native/image-picker';
import { SentryErrorhandlerProvider } from '../providers/sentry-errorhandler/sentry-errorhandler';
import { Camera } from '@ionic-native/camera';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { NotificationProvider } from '../providers/notification/notification';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    IonicModule.forRoot(MyApp),
    HttpModule,
    BusyModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ReportspotPageModule,
    UserLoginPageModule,
    UserSignupPageModule,
    ParkingspotListPageModule,
    ParkingspotDetailPageModule,
    ParkingspotMyPageModule,
    SettingsPageModule,
    NotificationsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SessionService,
    NativeGeocoder,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ParkingSpotProvider,
    ImagePicker,
    SentryErrorhandlerProvider,
    {provide: ErrorHandler, useClass: SentryErrorhandlerProvider},
    Camera,
    LaunchNavigator,
    NotificationProvider
    
  ],	
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppModule {}
