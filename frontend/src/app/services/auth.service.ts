import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { Observable } from "rxjs";
import {tokenNotExpired } from 'angular2-jwt';
import { HttpClient,HttpHeaders,HttpResponse } from '@angular/common/http'
@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) {
      // this.isDev = true;  // Change to false before deployment
      }

  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/register', user, {headers: headers})
      .pipe(map((res:HttpResponse<JSON>) => res));
  }

  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/auth', user, {headers: headers})
      .pipe(map((res:HttpResponse<JSON>) => res));
  }
  // }
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getProfile() {
    this.loadToken();
    let headers = new HttpHeaders({'Authorization':this.authToken,'Content-Type':'application/json'});

    // headers.append('Authorization', this.authToken);
    // headers.append('Content-Type', 'application/json');
    console.log(headers);
    return this.http.get('users/profile', {headers: headers})
      .pipe(map((res:HttpResponse<JSON>) => res));
  }
  

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}