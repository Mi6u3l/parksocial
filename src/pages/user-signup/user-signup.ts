import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionService } from '../../providers/session/session';
import { UserLoginPage } from '../user-login/user-login';

/**
 * Generated class for the UserSignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-signup',
  templateUrl: 'user-signup.html',
})
export class UserSignupPage {

    user: Object = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: ''
  }

  error = null;
  
  constructor(
   public navCtrl: NavController, 
   public navParams: NavParams,
   private session: SessionService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSignupPage');
  }

  signup() { 
    this.session.signup(this.user).subscribe(
      (data) => {
      },
      (err) => {
        this.error = err;
      });
  }

  loginPage() {
    this.navCtrl.push(UserLoginPage);
  }
}
