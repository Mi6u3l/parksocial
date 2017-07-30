import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import {AlertController} from 'ionic-angular';

declare var google;

@IonicPage()
@Component({
  selector: 'page-reportspot',
  templateUrl: 'reportspot.html',
})
export class ReportspotPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  busy: Promise<any>;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  public geolocation: Geolocation, 
  private nativeGeocoder: NativeGeocoder,
  private alertController: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportspotPage');
    this.loadMap()
  }

   loadMap(){
    let lat, long;
    this.busy = this.geolocation.getCurrentPosition().then((position) => {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      
    
     /*  this.nativeGeocoder.reverseGeocode(lat, long)
      .then((result: NativeGeocoderReverseResult) => {
        let message = 'The address is ' + result.street + ' in ' + result.countryCode;
        let alert = this.alertController.create({
        title: 'Example',
        subTitle: message,
        buttons: ['OK']
      });
        alert.present();

      }).catch((error: any) => { 
        let message = error;
        let alert = this.alertController.create({
        title: 'Example',
        subTitle: message,
        buttons: ['OK']
      });
       alert.present();
    });*/
    
    }, (err) => {
      console.log(err);
    });

   }

   addMarker(){
 
  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });
 
  let content = "<h4>Information!</h4>";          
 
  
 
  }
}

