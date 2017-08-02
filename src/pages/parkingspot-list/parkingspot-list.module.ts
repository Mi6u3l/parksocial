import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParkingspotListPage } from './parkingspot-list';
import { ImageLoaderComponent } from '../../components/image-loader/image-loader';

@NgModule({
  declarations: [
    ParkingspotListPage,
    ImageLoaderComponent
  ],
  imports: [
    IonicPageModule.forChild(ParkingspotListPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ParkingspotListPageModule {}
