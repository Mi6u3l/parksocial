import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { AlertController } from 'ionic-angular';

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

   loadMap() {
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
    
    }, (err) => {
      console.log(err);
    });
    let message;
    let _controller = this.alertController;
     var geocoder = new google.maps.Geocoder;
      geocoder.geocode({ 'location': { lat: 38.7106912, lng: -9.243368 } }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                console.log('address', results[0].formatted_address)
                message = results[0].formatted_address;
                   let alert = _controller.create({
                  title: 'Example',
                  subTitle: message,
                  buttons: ['OK']
                });
        alert.present();
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }

      
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

