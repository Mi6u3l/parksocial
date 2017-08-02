import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionService } from '../../providers/session/session';
import { UserLoginPage } from '../user-login/user-login';
import { ImagePicker } from '@ionic-native/image-picker';
import { AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import Raven from 'raven-js';


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
    password: '',
    picture: ''
  }

  userPictureURI: any;
  captureDataUrl: string;
  error = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private session: SessionService,
    private imagePicker: ImagePicker,
    private alertController: AlertController,
    private camera: Camera) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSignupPage');
  }

  signup() {
    this.userPictureUpload().then(() => {
      Raven.captureMessage(this.user["picture"], { level: 'info' });
      this.session.signup(this.user).subscribe(
        (data) => {
         
        },
        (err) => {
          this.error = err;
        });
    });
  }

    userPictureUpload() {
      let downloadURL;
      let storageRef = firebase.storage().ref();
      // Create a timestamp as filename
      const filename = Math.floor(Date.now() / 1000);
      // Create a reference to 'images/todays-date.jpg'
      const imageRef = storageRef.child(`images/${filename}.jpg`);
      return imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
          this.user["picture"] = snapshot.downloadURL;
      });
    }
  
    capture() {
     const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  loginPage() {
    this.navCtrl.push(UserLoginPage);
  }
}
