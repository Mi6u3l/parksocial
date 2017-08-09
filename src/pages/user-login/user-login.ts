import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { UserSignupPage } from '../user-signup/user-signup'
import { SessionService } from '../../providers/session/session';
import { ParkingspotListPage } from '../parkingspot-list/parkingspot-list';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { FacebookService } from '../../providers/facebook/facebook';
import { Facebook } from 'ionic-native';

@IonicPage()
@Component({
  selector: 'page-user-login',
  templateUrl: 'user-login.html',
})
export class UserLoginPage {
  login: FormGroup;
  loginIn: boolean = false;
  user: Object = {
    username: '',
    password: '',
  }

  error = null;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private session: SessionService,
    public platform: Platform,
    public facebookService: FacebookService

) {
     this.login = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
     this.platform.ready().then(() => {
      
        this.facebookService.init();
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserLoginPage');
  }


  doLogin() {
    this.loginIn = true;
    this.user['username'] = this.login.controls.username.value;
    this.user['password'] = this.login.controls.password.value;
    this.session.login(this.user, false).subscribe(
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


  doFacebookLogin() {
   this.loginIn = true;
   let permissions = new Array<string>();
   permissions = ["public_profile"];
    Facebook.login(permissions).then((response) => {
     let userId = response.authResponse.userID;
     let params = new Array<string>();
 
     Facebook.api("/me?fields=name,email", params)
     .then((profile) => {
       profile.picture = "https://graph.facebook.com/" + userId + "/picture?type=small";       
       this.session.fblogin('miguel.bgomes@gmail.com', profile.name, profile.picture).subscribe((data) => {
        let user = {
          username: profile.name,
          facebook: true
        }
        this.session.login(user, true).subscribe((data) => {  
            this.navCtrl.push(ParkingspotListPage);
          },
          (err) => {
            console.log(err);
          });
      },
      (err) => {
        this.error = err;
      });
     })
   }, (error) => {
     alert(error);
     console.log(error);
   });
  }
}
