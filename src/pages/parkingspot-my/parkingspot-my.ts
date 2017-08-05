import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ParkingSpotProvider } from '../../providers/parking-spot/parking-spot';
import { SessionService } from '../../providers/session/session';
import { AlertController } from 'ionic-angular';
import { ParkingspotListPage } from '../parkingspot-list/parkingspot-list';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
/**
 * Generated class for the ParkingspotMyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parkingspot-my',
  templateUrl: 'parkingspot-my.html',
})
export class ParkingspotMyPage {
  selectedSpot: { address: string, latitude: number, longitude: number };
  staticMapUrl:string;
  datetime: string;
  
  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  private parkingSpot: ParkingSpotProvider,
  private session: SessionService,
  private alertController: AlertController,
  private launchnavigator: LaunchNavigator) {
  
  }

  ionViewDidLoad() {
     this.parkingSpot.getMyParkingSpot(this.session.user['_id']).subscribe((parkingSpot) => {
       if (parkingSpot.length > 0) {
         this.selectedSpot = parkingSpot[0];
         this.datetime = new Date(this.selectedSpot['updated_at']).toString();
         this.staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${this.selectedSpot['latitude']},${this.selectedSpot['longitude']}&markers=${this.selectedSpot['latitude']},${this.selectedSpot['longitude']}&zoom=17&scale=1&size=600x300&maptype=roadmap&format=png&visual_refresh=true`;
       }
    });  
  }

  freeMySpot() {
    console.log(this.selectedSpot);
     this.parkingSpot.freeSpot(this.session.user, this.selectedSpot['_id']).subscribe((res) => {    
      let alert = this.alertController.create({
      title: 'Free My Spot',
      subTitle: 'You have sucessfully freed up your spot at: ' + this.selectedSpot['address'],
      buttons: [{ text: 'Thank you', handler: () => this.redirect() }]
    });
    alert.present();  
    
  });
}


  navigateToSpot() {
      this.launchnavigator.navigate([this.selectedSpot['latitude'], this.selectedSpot['longitude']]);
 }
  redirect() {
    this.navCtrl.push(ParkingspotListPage);
  }

}
