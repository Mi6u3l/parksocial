import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationsPage } from './notifications';
import { AutocompleteComponent } from '../../components/autocomplete/autocomplete';

@NgModule({
  declarations: [
    NotificationsPage,
    AutocompleteComponent
  ],
  imports: [
    IonicPageModule.forChild(NotificationsPage),
  ],
})
export class NotificationsPageModule {}
