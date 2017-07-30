import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
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
  busy: Promise < any >;
  address: string;
  lat: number;
  lng: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    private alertController: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportspotPage');
    this.loadMap()
  }

  loadMap() {
    this.busy = this.geolocation.getCurrentPosition().then((position) => {
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
  }

  addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
    let geocoder = new google.maps.Geocoder;
    geocoder.geocode({
      'location': {
        lat: marker.position.lat(),
        lng: marker.position.lng()
      }
    }, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          this.address = results[0].formatted_address
          this.lat = marker.position.lat();
          this.lng = marker.position.lng();
        } 
      }
    }.bind(this));
  }

  publishSpot() {
    let alert = this.alertController.create({
      title: 'Report free spot',
      subTitle: 'You have sucessfully reported a free spot at: ' + this.address,
      buttons: ['OK']
    });
    console.log(this.lat, this.lng);
    alert.present();
  }
}
