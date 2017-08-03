import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParkingspotMyPage } from './parkingspot-my';

@NgModule({
  declarations: [
    ParkingspotMyPage,
  ],
  imports: [
    IonicPageModule.forChild(ParkingspotMyPage),
  ],
})
export class ParkingspotMyPageModule {}
