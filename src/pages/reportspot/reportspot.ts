import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import { ParkingSpotProvider } from '../../providers/parking-spot/parking-spot';
import { SessionService } from '../../providers/session/session';

declare var google;

@IonicPage()
@Component({
  selector: 'page-reportspot',
  templateUrl: 'reportspot.html',
})
export class ReportspotPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  busy: Promise <any>;
  spot: Object = {
    address: String,
    lat: Number,
    lng: Number,
    userid: Number
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    private alertController: AlertController,
    private parkingSpot: ParkingSpotProvider,
    private session: SessionService) {}

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
    console.log('userid', this.session.user);
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
      draggable:true
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
          this.spot.address = results[0].formatted_address
          this.spot.lat = marker.position.lat();
          this.spot.lng = marker.position.lng();
          this.spot.userid = this.session.user._id;
        } 
      }
    }.bind(this));
  }

  publishSpot() {
    this.parkingSpot.createSpot(this.spot).subscribe((res) => {
          console.log('spot created', res);
    });
    let alert = this.alertController.create({
      title: 'Report free spot',
      subTitle: 'You have sucessfully reported a free spot at: ' + this.spot["address"],
      buttons: ['Thanks for sharing']
    });
    alert.present();
  }
}
