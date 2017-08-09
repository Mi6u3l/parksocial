import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
 
import { Facebook } from 'ionic-native';
 
@Injectable()
export class FacebookService {
 APP_ID: number = 107369209959301
 
 constructor() {
     
 }
 
 init() {
    Facebook.browserInit(this.APP_ID, "v2.8");
 }
}