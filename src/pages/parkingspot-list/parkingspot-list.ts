import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ParkingSpotProvider } from '../../providers/parking-spot/parking-spot';
import { ParkingspotDetailPage } from '../parkingspot-detail/parkingspot-detail';
import { LazyLoadImageDirective } from 'ng2-lazyload-image';
import Raven from 'raven-js';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-parkingspot-list',
  templateUrl: 'parkingspot-list.html'
})

export class ParkingspotListPage {
  spots: Array<any>;
  canRender: Boolean = false;


  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  private parkingSpot: ParkingSpotProvider,
  private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
      this.parkingSpot.getList()
      .subscribe((spots) => {
       return this.geolocation.getCurrentPosition().then((position) => {
          console.log(position);
          spots.forEach((spot) => {
            let distance = this.parkingSpot.getDistanceFromLatLonInKm(
              position.coords.latitude,
              position.coords.longitude,
              spot['parkingSpot']['latitude'],
              spot['parkingSpot']['longitude'])
              spot['parkingSpot']['distance'] = distance.toFixed(1);
              return spots;
          });
          this.canRender = true;
        }).then(() => {
          this.spots = spots.sort((a, b) => {
              return a['parkingSpot']['distance'] > b['parkingSpot']['distance'];
          });
        });   
     });   
  }

  spotTapped(event, spot) {
    this.navCtrl.push(ParkingspotDetailPage, {
      spot: spot
    });
  }

}
