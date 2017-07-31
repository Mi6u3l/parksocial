import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParkingspotListPage } from './parkingspot-list';

@NgModule({
  declarations: [
    ParkingspotListPage,
  ],
  imports: [
    IonicPageModule.forChild(ParkingspotListPage),
  ],
})
export class ParkingspotListPageModule {}
