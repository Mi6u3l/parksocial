import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserSignupPage } from '../user-signup/user-signup'
import { SessionService } from '../../providers/session/session';
import { ParkingspotListPage } from '../parkingspot-list/parkingspot-list';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-user-login',
  templateUrl: 'user-login.html',
})
export class UserLoginPage {
  login: FormGroup;
  user: Object = {
    username: '',
    password: '',
  }

  error = null;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private session: SessionService
) {
     this.login = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserLoginPage');
  }


  doLogin() {
    this.user['username'] = this.login.controls.username.value;
    this.user['password'] = this.login.controls.password.value;
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
