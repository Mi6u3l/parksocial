import { Component, NgZone } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { AlertController } from 'ionic-angular';

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
  constructor(private zone: NgZone, 
  private notification: NotificationProvider,
  private alertController: AlertController) {
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
    console.log('here');
    this.autocomplete.query = item;
    this.autocompleteItems = [];
    this.notification.deleteNotification().subscribe((res) => {
      console.log('here2');
      this.notification.createNotification(this.autocomplete.query).subscribe((res) => {
        let alert = this.alertController.create({
        title: 'New notification',
        subTitle: 'You have sucessfully setup a notification at ' + item,
        buttons: ['Cool!']
        });
        alert.present();
      });
    });
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      this.notification.deleteNotification().subscribe((res) => {
        this.notification.createNotification(this.autocomplete.query).subscribe((res) => {
        let alert = this.alertController.create({
        title: 'New notification',
        subTitle: 'You have deleted the existing notification',
        buttons: ['OK']
        });
        alert.present();
      });
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
