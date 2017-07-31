import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserSignupPage } from '../user-signup/user-signup'
import { SessionService } from '../../providers/session/session';
import { ParkingspotListPage } from '../parkingspot-list/parkingspot-list';

@IonicPage()
@Component({
  selector: 'page-user-login',
  templateUrl: 'user-login.html',
})
export class UserLoginPage {

  user: Object = {
    username: '',
    password: '',
  }

  error = null;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private session: SessionService
) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserLoginPage');
  }


  login() {
    this.session.login(this.user).subscribe(
      (data) => {
        this.navCtrl.push(ParkingspotListPage);
      },
      (err) => {
        this.error = err;
      });
  }

  signupPage() {
    this.navCtrl.push(UserSignupPage);
  }

}
