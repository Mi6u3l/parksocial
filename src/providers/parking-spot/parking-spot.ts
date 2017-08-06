import { Injectable, Inject  } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Rx';
import { SessionService } from '../../providers/session/session';
import { EnvVariables } from '../../app/environment-variables/environment-variables.token';

@Injectable()
export class ParkingSpotProvider {
  
 constructor(public http: Http, 
      private session: SessionService,
      @Inject(EnvVariables) public envVariables) {
  }

createSpot(spot) {
    return this.http.post(`${this.envVariables.apiEndpoint}/api/parkingspots`, spot, this.requestOptions())
      .map((res) => res.json())
      .catch(this.handleError);
  }



 takeSpot(user, parkingspotId, valid) {
     valid ? user.valid = true : user.valid = false; 
     return this.http.put(`${this.envVariables.apiEndpoint}/api/parkingspots/${parkingspotId}`, user, this.requestOptions())
      .map((res) => res.json())
      .catch(this.handleError);
  }

  freeSpot(user, parkingspotId) {
    console.log('parkingspotid', parkingspotId);
     return this.http.put(`${this.envVariables.apiEndpoint}/api/parkingspot/${parkingspotId}`, user,  this.requestOptions())
      .map((res) => res.json())
      .catch(this.handleError);
  }

  getMyParkingSpot(userid) {
    return this.http.get(`${this.envVariables.apiEndpoint}/api/parkingspot/${userid}`, this.requestOptions())
      .map((res) => res.json())
      .catch(this.handleError);
  }


 getList() {
    return this.http.get(`${this.envVariables.apiEndpoint}/api/parkingspots`, this.requestOptions())
      .map((res) => res.json())
      .catch(this.handleError);
  }


 getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
   }

  deg2rad(deg) {
    return deg * (Math.PI/180)
   }

 handleError(e) {
    return Observable.throw(e.json().message);
  }

  

 private requestOptions(): RequestOptions {
    let headers = new Headers({ 'Authorization': `JWT ${this.session.token}` });
    return new RequestOptions({ headers: headers });
  }
}
