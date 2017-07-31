import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Rx';
import { SessionService } from '../../providers/session/session';

@Injectable()
export class ParkingSpotProvider {
  BASE_URL: string = 'http://localhost:3000';

  constructor(public http: Http, 
      private session: SessionService) {
    console.log('Hello ParkingSpotProvider Provider');
  }


createSpot(spot) {
    console.log(this.session.user);
    return this.http.post(`${this.BASE_URL}/api/parkingspots`, spot, this.requestOptions())
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
