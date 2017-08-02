import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ParkingSpotProvider } from '../../providers/parking-spot/parking-spot';
import { ParkingspotDetailPage } from '../parkingspot-detail/parkingspot-detail';
import { LazyLoadImageDirective } from 'ng2-lazyload-image';
import Raven from 'raven-js';

@IonicPage()
@Component({
  selector: 'page-parkingspot-list',
  templateUrl: 'parkingspot-list.html'
})

export class ParkingspotListPage {
  spots: Array<any>;


  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  private parkingSpot: ParkingSpotProvider) {
  }

  ionViewDidLoad() {
      this.parkingSpot.getList()
      .subscribe((spots) => {
        this.spots = spots;
      });      
  }


  spotTapped(event, spot) {
    this.navCtrl.push(ParkingspotDetailPage, {
      spot: spot
    });
  }

}
