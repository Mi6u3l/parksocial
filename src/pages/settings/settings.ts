import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Range } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionService } from '../../providers/session/session';
/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  rangeForm: any;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  private session: SessionService) {
    console.log('distance', this.session.distance);
    // let distance = this.session.distance === undefined ? 5 : this.session.distance;
     this.rangeForm = new FormGroup({
      single: new FormControl(this.session.distance),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  rangeChange(range: Range) {
    console.log(`range, change, ratio: ${range.ratio}, value: ${range.value}`);
    this.session.distance = range.value;
  }

}
