import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AutocompleteComponent } from '../../components/autocomplete/autocomplete';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
 address;
 
  constructor(private navCtrl: NavController, private modalCtrl: ModalController) {
    this.address = {
      place: ''
    };
  }
  
  showAddressModal () {
    let modal = this.modalCtrl.create(AutocompleteComponent);
    let me = this;
    modal.onDidDismiss(data => {
      this.address.place = data;
    });
    modal.present();
  }
}