import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpHelper } from '../shared/helpers/http.helper';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor(protected http: Http) {

  }

  loggedIn() {
    return tokenNotExpired();
  }

  /**
    * Registers the user with the API
    * @param email The email of the user
    * @param password The password
    * @param confirmPassword The confirm password
    */
  public register(email: string, password: string, confirmPassword: string) {
    if (!email || !password || !confirmPassword) {
      return Observable.throw(new Error('Invalid data supplied!'));
    }

    // Check if the passwords are equal
    if (password !== confirmPassword) {
      return Observable.throw(new Error('Passwords do not match!'));
    }

    return this.http.post(`${environment.apiUrl}/authentication/register`, {
      email,
      password
    }, HttpHelper.getRequestOptions())
      .map(r => r.status === 201);
  }
}
