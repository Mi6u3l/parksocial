import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParkingspotHeaderPage } from './parkingspot-header';

@NgModule({
  declarations: [
    ParkingspotHeaderPage,
  ],
  imports: [
    IonicPageModule.forChild(ParkingspotHeaderPage),
  ],
})
export class ParkingspotHeaderPageModule {}
