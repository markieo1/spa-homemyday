import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpHelper } from '../shared/helpers/http.helper';
import { Login } from './login/login.model';

@Injectable()
export class AuthService {

    private user: Login;

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
            .map(r => r.json());
    }


    login(email: string, password: string) {
        return this.http.post(`${environment.apiUrl}/login`, {email: email, password: password})
        .map(user => {
            if (user && this.user.token) {
                console.log("test log in auth service");
                localStorage.setItem('currentUser', JSON.stringify(user));
            } 
            return user;
        });
    }

    logout() {
        localStorage.removeItem('token');
    }    
}

