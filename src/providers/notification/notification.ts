import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Rx';
import { SessionService } from '../../providers/session/session';


@Injectable()
export class NotificationProvider {
    BASE_URL: string = 'http://localhost:3000'; //'https://parksocial.herokuapp.com'; 

  constructor(public http: Http, 
      private session: SessionService) {
      console.log('Hello NotificationProvider Provider');
  }

  createNotification(address) {
    var userAddress = {
      address: address,
      userid: this.session.user['_id']
      
    }
  
    return this.http.post(`${this.BASE_URL}/api/notifications`, userAddress, this.requestOptions())
      .map((res) => res.json())
      .catch(this.handleError);
  }

  deleteNotification() {
    console.log('deleting for', this.session.user['_id'])
    return this.http.delete(`${this.BASE_URL}/api/notifications/${this.session.user['_id']}`, this.requestOptions())
      .map((res) => res.json())
      .catch(this.handleError);
  }

  getNotification() {
    return this.http.get(`${this.BASE_URL}/api/notifications/${this.session.user['_id']}`, this.requestOptions())
      .map((res) => res.json())
      .catch(this.handleError);
  }


   handleError(e) {
    return Observable.throw(e.json().message);
  }

 private requestOptions(): RequestOptions {
    let headers = new Headers({ 'Authorization': `JWT ${this.session.token}` });
    return new RequestOptions({ headers: headers });
  }

}
