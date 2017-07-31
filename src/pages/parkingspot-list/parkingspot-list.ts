import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ParkingSpotProvider } from '../../providers/parking-spot/parking-spot';

@IonicPage()
@Component({
  selector: 'page-parkingspot-list',
  templateUrl: 'parkingspot-list.html',
})
export class ParkingspotListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkingspotListPage');
  }

}
