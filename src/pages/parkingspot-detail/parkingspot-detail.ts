import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ParkingSpotProvider } from '../../providers/parking-spot/parking-spot';
import { AlertController } from 'ionic-angular';
import { SessionService } from '../../providers/session/session';
import { ParkingspotListPage } from '../parkingspot-list/parkingspot-list';


@IonicPage()
@Component({
  selector: 'page-parkingspot-detail',
  templateUrl: 'parkingspot-detail.html',
})
export class ParkingspotDetailPage {
    selectedSpot: object;
    staticMapUrl:string;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  private parkingSpot: ParkingSpotProvider,
  private alertController: AlertController,
  private session: SessionService) {
    this.selectedSpot = navParams.get('spot');
  }

  ionViewDidLoad() {
    this.staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${this.selectedSpot['parkingSpot']['latitude']},${this.selectedSpot['parkingSpot']['longitude']}&markers=${this.selectedSpot['parkingSpot']['latitude']},${this.selectedSpot['parkingSpot']['longitude']}&zoom=17&scale=1&size=600x300&maptype=roadmap&format=png&visual_refresh=true`;
  }

  takeSpot() {
    this.parkingSpot.takeSpot(this.session.user, this.selectedSpot['parkingSpot']['_id']).subscribe((res) => {
          console.log('spot taken', res);
    });
    let alert = this.alertController.create({
      title: 'Take Spot',
      subTitle: 'You have sucessfully taken a free spot at: ' + this.selectedSpot['parkingSpot']['address'],
       buttons: [{ text: 'Good Stuff', handler: () => this.redirect() }]
    });
    alert.present();
    
  }

  redirect() {
    this.navCtrl.push(ParkingspotListPage);
  }

}
