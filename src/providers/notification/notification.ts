import { Injectable, Inject  } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Rx';
import { SessionService } from '../../providers/session/session';
import { EnvVariables } from '../../app/environment-variables/environment-variables.token';


@Injectable()
export class NotificationProvider {
  
  constructor(public http: Http, 
      private session: SessionService,
      @Inject(EnvVariables) public envVariables) {
  }

  createNotification(address) {
    var userAddress = {
      address: address,
      userid: this.session.user['_id']
      
    }
  
    return this.http.post(`${this.envVariables.apiEndpoint}/api/notifications`, userAddress, this.requestOptions())
      .map((res) => res.json())
      .catch(this.handleError);
  }

  deleteNotification() {
    return this.http.delete(`${this.envVariables.apiEndpoint}/api/notifications/${this.session.user['_id']}`, this.requestOptions())
      .map((res) => res.json())
      .catch(this.handleError);
  }

  getNotification() {
    return this.http.get(`${this.envVariables.apiEndpoint}/api/notifications/${this.session.user['_id']}`, this.requestOptions())
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
