import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParkingspotDetailPage } from './parkingspot-detail';

@NgModule({
  declarations: [
    ParkingspotDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ParkingspotDetailPage),
  ],
})
export class ParkingspotDetailPageModule {}
