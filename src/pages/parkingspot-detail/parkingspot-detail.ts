import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-parkingspot-detail',
  templateUrl: 'parkingspot-detail.html',
})
export class ParkingspotDetailPage {
    selectedSpot: object;
    staticMapUrl:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedSpot = navParams.get('spot');
  }

  ionViewDidLoad() {
    this.staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${this.selectedSpot['parkingSpot']['latitude']},${this.selectedSpot['parkingSpot']['longitude']}&markers=${this.selectedSpot['parkingSpot']['latitude']},${this.selectedSpot['parkingSpot']['longitude']}&zoom=17&scale=1&size=600x300&maptype=roadmap&format=png&visual_refresh=true`;
  }

}
