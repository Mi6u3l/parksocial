import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routing';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { UserLoginPage } from '../pages/user-login/user-login';
import { UserSignupPage } from '../pages/user-signup/user-signup';
import { ReportspotPage } from '../pages/reportspot/reportspot';

import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SessionService } from '../providers/session/session';

import {BusyModule} from 'angular2-busy';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    UserLoginPage,
    UserSignupPage,
    ReportspotPage
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    IonicModule.forRoot(MyApp),
    HttpModule,
    BusyModule,
    BrowserAnimationsModule,
    NoopAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    UserLoginPage,
    UserSignupPage,
    ReportspotPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SessionService,
    NativeGeocoder,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    
  ]
})
export class AppModule {}
