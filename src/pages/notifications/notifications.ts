import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AutocompleteComponent } from '../../components/autocomplete/autocomplete';

declare var google;


@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
 address;
 autocompleteItems;
 autocomplete;
 service = new google.maps.places.AutocompleteService();
 
  constructor(private navCtrl: NavController, private modalCtrl: ModalController, private zone: NgZone) {
    this.address = {
      place: ''
    };
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
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


  chooseItem(item: any) {
    this.autocomplete.query = item;
    this.autocompleteItems = [];
  }
  
  
  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query }, function (predictions, status) {
      me.autocompleteItems = []; 
      me.zone.run(function () {
        predictions.forEach(function (prediction) {
          me.autocompleteItems.push(prediction.description);
        });
      });
    });
  }
}