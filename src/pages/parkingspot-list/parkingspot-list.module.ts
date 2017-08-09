import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParkingspotListPage } from './parkingspot-list';
import { ImageLoaderComponent } from '../../components/image-loader/image-loader';
import { LoadingModalComponent } from '../../components/loading-modal/loading-modal';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ParkingspotListPage,
    ImageLoaderComponent,
    LoadingModalComponent  
  ],
  imports: [
    IonicPageModule.forChild(ParkingspotListPage),
    PipesModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ParkingspotListPageModule {}
