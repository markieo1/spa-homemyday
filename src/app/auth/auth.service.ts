import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { HttpHelper } from '../shared/helpers/http.helper';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IUserToken } from '../shared/interfaces/iusertoken.interface';

@Injectable()
export class AuthService {
  private loggedInEmitter: BehaviorSubject<boolean>;

  constructor(protected http: Http, protected authHttp: AuthHttp) {
    this.loggedInEmitter = new BehaviorSubject(this.isLoggedIn());
  }

  /**
   * Checks if the user is logged in
   */
  isLoggedIn(): boolean {
    return tokenNotExpired();
  }

  /**
   * returns a new BehaviorSubject
   */
  loggedIn(): Observable<boolean> {
    return this.loggedInEmitter;
  }

  /**
   * Get the user info of the currently logged in user.
   * @returns The user info of the currently logged in user, as an instance of IUserToken.
   */
  public getUserInfo(): IUserToken {
    if (!this.isLoggedIn()) {
      return null;
    }

    const token = localStorage.getItem('token');
    const helper = new JwtHelper();
    const tokenObj = helper.decodeToken(token) as IUserToken;

    return tokenObj;
  }

  /**
   * Registers the user with the API
   * @param email The email of the user
   * @param password The password
   * @param confirmPassword The confirm password
   */
  public register(
    email: string,
    password: string,
    confirmPassword: string
  ): Observable<any> {
    if (!email || !password || !confirmPassword) {
      return Observable.throw(new Error('Invalid data supplied!'));
    }

    // Check if the passwords are equal
    if (password !== confirmPassword) {
      return Observable.throw(new Error('Passwords do not match!'));
    }

    return this.http
      .post(
        `${environment.apiUrl}/authentication/register`,
        {
          email,
          password
        },
        HttpHelper.getRequestOptions()
      )
      .map(r => r.status === 201);
  }

  /**
   * logs the user in with the API
   * @param email The email of the user
   * @param password The password
   * @param otpToken The otp token
   */
  public login(
    email: string,
    password: string,
    otpToken: string
  ): Observable<boolean> {
    return this.http
      .post(`${environment.apiUrl}/authentication/login`, {
        email,
        password,
        token: otpToken
      })
      .map(response => {
        const responseToken = response.json().token;
        if (responseToken) {
          localStorage.setItem('token', responseToken);
          return true;
        } else {
          return false;
        }
      })
      .do(loggedIn => this.loggedInEmitter.next(loggedIn));
  }

  /**
   * Changes the user's password.
   * @param currentPassword The user's current password.
   * @param newPassword The user's new desired password.
   * @returns An Observable<boolean> indicating if the request was successful.
   */
  public changePassword(currentPassword, newPassword): Observable<boolean> {
    return this.authHttp
      .post(`${environment.apiUrl}/authentication/changepassword`, {
        oldPassword: currentPassword,
        newPassword: newPassword
      })
      .map(response => {
        return response.ok;
      });
  }

  /**
   * Removed user token and logout user.
   */
  logout() {
    localStorage.removeItem('token');
    this.loggedInEmitter.next(false);
  }
}
