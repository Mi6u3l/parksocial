import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ParkingSpotProvider } from '../../providers/parking-spot/parking-spot';
import { ParkingspotDetailPage } from '../parkingspot-detail/parkingspot-detail';
import { LazyLoadImageDirective } from 'ng2-lazyload-image';


@IonicPage()
@Component({
  selector: 'page-parkingspot-list',
  templateUrl: 'parkingspot-list.html'
})

export class ParkingspotListPage {
  spots: Array<any>;
  defaultImage = 'https://www.placecage.com/1000/1000';
  image = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
  offset = 100;

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
