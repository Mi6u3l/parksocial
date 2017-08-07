import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, CanActivate } from '@angular/router';
import { EnvVariables } from '../../app/environment-variables/environment-variables.token';

@Injectable()
export class SessionService implements CanActivate {
 

  public user = {};
  public token = '';
  public isAuthenticated = false;
  public distance = 5;

  constructor(
    private http: Http,
    private router: Router,
    @Inject(EnvVariables) public envVariables)
   { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  canActivate(): Observable<boolean> | boolean {
    let token = localStorage.getItem('token');

    if (token) {
      let headers = new Headers({ 'Authorization': `JWT ${token}` });
      let options = new RequestOptions({ headers: headers });

      return this.http.get(`${this.envVariables.apiEndpoint}/ping`, options)
        .map((data) => {
          if (data) {
            this.isAuthenticated = true;
            this.token = token;
            return true;
          }
          return false;
        })
        .catch(this.handleError);
    }
    else {
      this.logout();
      this.router.navigate(['/login']);
      return false;
    }
  }

  fblogin(email, username, picture) {
    let user = {
      firstname: username,
      lastname: username,
      username: username,
      picture: picture,
      email: email,
      facebook: true
    }
    return this.http.post(`${this.envVariables.apiEndpoint}/signup`, user)
      .map(res => {
        let json = res.json();
        return json;
      }).catch(this.handleError);
  }

  login(user, socialLogin) {
    return this.http.post(`${this.envVariables.apiEndpoint}/login`, user)
      .map(res => {
        let json = res.json();
        let token = json.token;
        let user = json.user;

        if (token) {
          this.token = token;
          this.user = {
            _id: user._id,
            username: user.username,
            picture: user.picture,
            facebook: socialLogin
          }
          this.isAuthenticated = true;
          localStorage.setItem('token', this.token);
        }
        
        return this.isAuthenticated;

      }).catch(this.handleError);
  }

  signup(user) {
    return this.http.post(`${this.envVariables.apiEndpoint}/signup`, user)
      .map(res => {
        let json = res.json();
        console.log(json);
        return json;
      }).catch(this.handleError);
  }
  

  logout() {
    this.token = '';
    this.user = {}
    this.isAuthenticated = false;
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }
}