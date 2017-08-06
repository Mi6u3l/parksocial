import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';

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
  constructor(private navCtrl: NavController, private modalCtrl: ModalController, private zone: NgZone, private notification: NotificationProvider) {
    this.address = {
      place: ''
    };
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
    this.notification.getNotification().subscribe((res) => {
      if (res.length > 0) {
        this.autocomplete.query = res[0].address;
      }
    });
  }

  chooseItem(item: any) {
    this.autocomplete.query = item;
    this.autocompleteItems = [];
    this.notification.deleteNotification().subscribe((res) => {
      this.notification.createNotification(this.autocomplete.query).subscribe((res) => {
      });
    });
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      this.notification.deleteNotification().subscribe((res) => {
      });
      return;
    }
    let me = this;
    this.service.getPlacePredictions({
      input: this.autocomplete.query
    }, function (predictions, status) {
      me.autocompleteItems = [];
      me.zone.run(function () {
        if (predictions) {
          predictions.forEach(function (prediction) {
            me.autocompleteItems.push(prediction.description);
          });
        }
      });
    });
  }
}
