import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ParkingSpotProvider } from '../../providers/parking-spot/parking-spot';
import { ParkingspotDetailPage } from '../parkingspot-detail/parkingspot-detail';
import { Geolocation } from '@ionic-native/geolocation';
import { SessionService } from '../../providers/session/session';


@IonicPage()
@Component({
  selector: 'page-parkingspot-list',
  templateUrl: 'parkingspot-list.html',
})

export class ParkingspotListPage {
  spots: Array<any>;
  canRender: Boolean = false;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  private parkingSpot: ParkingSpotProvider,
  private geolocation: Geolocation,
  private session: SessionService) {
  }

  ionViewDidLoad() {
    this.getParkingSpotsList();

    this.session.getNewParkingSpots().subscribe((data) => {
        console.log('time to fech list again');
        this.getParkingSpotsList();
    });
  }

  getParkingSpotsList() {
      this.parkingSpot.getList()
      .subscribe((_spots) => {
       return this.geolocation.getCurrentPosition().then((position) => {
          _spots.forEach((spot) => {
                  spot['parkingSpot']['distance'] = this.parkingSpot.getDistanceFromLatLonInKm(
                  position.coords.latitude,
                  position.coords.longitude,
                  spot['parkingSpot']['latitude'],
                  spot['parkingSpot']['longitude']).toFixed(1)
          })     
      }).then(() => {
          this.spots = _spots.filter((spot) => {
              return spot['parkingSpot']['distance'] <= this.session.distance;
          });
          this.canRender = true;
      });
    });
  }
    

  spotTapped(event, spot) {
    this.navCtrl.push(ParkingspotDetailPage, {
      spot: spot
    });
  }

}